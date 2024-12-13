import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Plus } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Dashboard
          </Link>
          
          {token ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/items/new"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Item
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;