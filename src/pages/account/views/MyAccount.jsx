import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import WarningPopup from '../../../components/WarningPopup';
import callingCodes from '../../../data/calling-codes.json';
import emailjs from '@emailjs/browser';

export default function MyAccount() {
  const { user, setUser } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailInput, setEmailInput] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const [callingCode, setCallingCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [saveCard, setSaveCard] = useState(true);
  const [warning, setWarning] = useState('');
  const [warningType, setWarningType] = useState('error');

  const API_URL = process.env.REACT_APP_API_URL_GUEST;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Pre-fill state from user context
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmailInput(user.email || '');

      if (user.phone) {
        const match = callingCodes.find((c) => user.phone.startsWith(c.code));
        if (match) {
          setCallingCode(match.code);
          setPhoneNumber(user.phone.replace(match.code, '').trim());
        } else {
          setPhoneNumber(user.phone);
        }
      }
    }
  }, [user]);

  const handleNameSave = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setWarning('Names should not contain numbers or special characters.');
      setWarningType('error');
      return;
    }

    try {
      const token = localStorage.getItem('tikangToken');
      const res = await fetch(`${API_URL}/update-name`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ first_name: firstName.trim(), last_name: lastName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const refreshed = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = await refreshed.json();
      if (updated?.user) setUser(updated.user);

      setEditingName(false);
      setWarning('Name updated successfully!');
      setWarningType('success');
    } catch (err) {
      setWarning(err.message || 'Failed to update name.');
      setWarningType('error');
    }
  };

  const sendVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  
    const templateParams = {
      email: emailInput,        // Email input in your form
      passcode: code,           // This matches your emailjs template variable
    };
  
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setCodeSent(true);
        setWarning('Verification code sent!');
        setWarningType('success');
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setWarning('Failed to send verification email.');
        setWarningType('error');
      });
  };

  const handleEmailUpdate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setWarning('Please enter a valid email address.');
      setWarningType('error');
      return;
    }

    if (user?.email_verify === 'no' && verificationCode !== generatedCode) {
        setWarning('Invalid verification code.');
        setWarningType('error');
        return;
      }

    try {
      const token = localStorage.getItem('tikangToken');
      const res = await fetch(`${API_URL}/update-email`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const refreshed = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await refreshed.json();
      if (updated?.user) setUser(updated.user);

      setEditingEmail(false);
      setCodeSent(false);
      setVerificationCode('');
      setGeneratedCode('');
      setWarning('Email updated successfully!');
      setWarningType('success');
    } catch (err) {
      setWarning(err.message || 'Failed to update email.');
      setWarningType('error');
    }
  };

  const handlePhoneUpdate = async () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      setWarning('Phone number must be exactly 10 digits.');
      setWarningType('error');
      return;
    }

    if (!callingCode) {
      setWarning('Please select a country calling code.');
      setWarningType('error');
      return;
    }

    const fullPhone = `${callingCode}${phoneNumber}`;
    try {
      const token = localStorage.getItem('tikangToken');
      const res = await fetch(`${API_URL}/update-phone`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const refreshed = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await refreshed.json();
      if (updated?.user) setUser(updated.user);

      setEditingPhone(false);
      setWarning('Phone number updated successfully!');
      setWarningType('success');
    } catch (err) {
      setWarning(err.message || 'Failed to update phone number.');
      setWarningType('error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {warning && (
        <WarningPopup message={warning} type={warningType} onClose={() => setWarning('')} />
      )}

      <h1 className="text-2xl font-semibold text-gray-800">User details</h1>

      {/* Name Card */}
      <div className={`rounded-lg shadow ${editingName ? 'bg-white p-6' : 'bg-gradient-to-r from-blue-400 to-blue-200 p-5 text-white'} transition-all`}>
        {editingName ? (
          <form className="space-y-4" onSubmit={handleNameSave}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button type="button" onClick={() => setEditingName(false)} className="text-blue-500 hover:underline">Cancel</button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded">Save</button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium uppercase">Name</p>
              <p className="text-lg font-bold">{user?.full_name}</p>
            </div>
            <button onClick={() => setEditingName(true)} className="text-white hover:underline text-sm font-medium">Edit</button>
          </div>
        )}
      </div>

      {/* Email */}
      <div className="bg-white rounded-lg shadow p-5">
        <p className="text-sm font-medium text-gray-500">Email</p>
        {editingEmail ? (
          <div className="space-y-3">
            <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
            {user?.email_verify === 'no' && (
              <>
                {!codeSent ? (
                  <button onClick={sendVerificationCode} className="text-sm text-blue-600 hover:underline font-medium">Send Code</button>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                  </div>
                )}
              </>
            )}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditingEmail(false)} className="text-blue-500 hover:underline">Cancel</button>
              <button onClick={handleEmailUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-gray-800">{user?.email}</span>
            <div className="flex gap-2 items-center">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${user?.email_verify === 'yes' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{user?.email_verify === 'yes' ? 'VERIFIED' : 'UNVERIFIED'}</span>
              <button onClick={() => setEditingEmail(true)} className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
            </div>
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="bg-white rounded-lg shadow p-5">
        <p className="text-sm font-medium text-gray-500 mb-2">Phone number</p>
        {editingPhone ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calling Code</label>
              <select value={callingCode} onChange={(e) => setCallingCode(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">-- Select Country Code --</option>
                {callingCodes.map((entry) => (
                  <option key={entry.code} value={entry.code}>
                    {entry.label} ({entry.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <input type="tel" value={phoneNumber} onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 10) setPhoneNumber(val);
              }} className="w-full border border-gray-300 rounded px-3 py-2" maxLength={10} inputMode="numeric" />
            </div>
            <div className="flex gap-4 pt-1">
              <button type="button" onClick={() => setEditingPhone(false)} className="text-blue-500 hover:underline">Cancel</button>
              <button type="button" onClick={handlePhoneUpdate} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded">Continue</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{user?.phone || '—'}</p>
            <button onClick={() => setEditingPhone(true)} className="text-blue-600 hover:underline text-sm font-medium">{user?.phone ? 'Edit' : 'Add'}</button>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="bg-white rounded-lg shadow p-5 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">Password</p>
          <p className="text-gray-700">••••••••••••</p>
        </div>
        <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
      </div>

      {/* Save Card */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment methods</h2>
        <div className="bg-white rounded-lg shadow p-5 flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700">Save my credit card information <span className="text-gray-400 text-xs ml-1">ⓘ</span></p>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={saveCard} onChange={() => setSaveCard(!saveCard)} />
            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${saveCard ? 'bg-blue-500' : ''}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${saveCard ? 'translate-x-5' : ''}`}></div>
            </div>
            <span className="ml-2 text-sm text-gray-700 font-semibold">{saveCard ? 'YES' : 'NO'}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
