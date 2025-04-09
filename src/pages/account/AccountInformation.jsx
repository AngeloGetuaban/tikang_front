import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/Navbar';
export default function AccountInformation() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen pt-16">
    <NavBar />
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 border-r">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Account</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            My Account
          </NavLink>
          <NavLink
            to="bookings"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            Bookings
          </NavLink>
          <NavLink
            to="messages"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="tikangcash"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            TikangCash
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            Reviews
          </NavLink>

          <button
            onClick={logout}
            className="text-red-600 hover:underline mt-4 text-left px-4 py-2"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
}
