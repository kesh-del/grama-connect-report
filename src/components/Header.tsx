
import { MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GramaConnect</h1>
              <p className="text-sm text-gray-500">Rural Infrastructure Platform</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#dashboard" className="text-green-600 font-medium">Dashboard</a>
            <a href="#report" className="text-gray-700 hover:text-green-600 transition-colors">Report Issue</a>
            <a href="#success" className="text-gray-700 hover:text-green-600 transition-colors">Success Stories</a>
            <a href="#resources" className="text-gray-700 hover:text-green-600 transition-colors">Resources</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
