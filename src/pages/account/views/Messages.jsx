import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [groupedMessages, setGroupedMessages] = useState({});

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL_MESSAGE}/${user.user_id}/conversations`);
        const data = await res.json();

        // Group messages by the other participant (admin/owner/guest)
        const grouped = data.reduce((acc, msg) => {
          const otherUserId = msg.other_user_id;
          if (!acc[otherUserId]) {
            acc[otherUserId] = {
              name: msg.other_user_name,
              role: msg.other_user_type,
              messages: []
            };
          }
          acc[otherUserId].messages.push(msg);
          return acc;
        }, {});

        setGroupedMessages(grouped);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };

    fetchMessages();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>
      {Object.entries(groupedMessages).length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        Object.entries(groupedMessages).map(([userId, convo]) => (
          <div key={userId} className="mb-6 p-4 border rounded-lg bg-white shadow">
            <h3 className="text-lg font-bold mb-2">
              {convo.name} <span className="text-sm text-gray-500">({convo.role})</span>
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {convo.messages.map((msg) => (
                <div
                  key={msg.message_id}
                  className={`p-2 rounded-md ${
                    msg.sender_id === user.user_id ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
                  }`}
                >
                  <p>{msg.content}</p>
                  <small className="text-gray-500 text-xs block mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
