import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Nookli Logo" className="h-8" />
        </Link>

        {/* Auth Links */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:underline">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
          >
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
