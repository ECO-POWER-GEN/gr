import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router';
import logoImage from '../../imports/logo_1줄.png';

const NAV_ITEMS = [
  { label: '메인화면', path: '/' },
  { label: '차량소개', path: '/vehicles' },
  { label: '설치사례', path: '/cases' },
  { label: '온라인문의', path: '/inquiry' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <NavLink to="/">
              <img src={logoImage} alt="Eco Power Gen" className="h-12 w-auto" />
            </NavLink>
          </div>

          <nav className="hidden md:flex space-x-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 transition-all font-medium text-sm ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-gray-500 hover:text-black hover:font-semibold'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#8BC34A] text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
