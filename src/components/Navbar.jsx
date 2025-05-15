import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <img src={logo} alt="Nookli Logo" className="h-8" />

      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:underline">Sign In</Link>
        <Link to="/register" className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded">Register Now</Link>
      </div>
    </nav>
  );
};

export default Navbar;
