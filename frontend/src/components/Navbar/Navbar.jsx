// src/components/Navbar/Navbar.jsx
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UserProfile from '../UserProfile/UserProfile';
import useCategories from '../../hooks/useCategories';
import logo from '../../assets/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const visibleCategories = categories.filter((category) => category.isActive !== false);
  const categoryTimeoutRef = useRef(null);

  const handleCategoryEnter = () => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setIsCategoryHovered(true);
  };

  const handleCategoryLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setIsCategoryHovered(false);
    }, 150);
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Tishe logo" className="h-12 w-12 rounded-full object-cover border border-pink-100" />
            
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 transition">
              Home
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 transition">
              About
            </Link>
            <div
              className="relative"
              onMouseEnter={handleCategoryEnter}
              onMouseLeave={handleCategoryLeave}
            >
              <button
                type="button"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 transition"
              >
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform ${isCategoryHovered ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryHovered && visibleCategories.length > 0 && (
                <div
                  className="absolute top-full right-0 mt-3 w-[520px] grid grid-cols-2 gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50"
                  onMouseEnter={handleCategoryEnter}
                  onMouseLeave={handleCategoryLeave}
                >
                  {visibleCategories.map((category) => (
                    <button
                      key={category.id}
                      className="flex items-start justify-between p-3 rounded-xl border border-transparent hover:border-pink-100 hover:bg-pink-50 transition text-left"
                      onClick={() => {
                        setIsCategoryHovered(false);
                        navigate(`/category/${category.slug}`);
                      }}
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{category.name}</p>
                        {category.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                        )}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 transition">
              Contact
            </Link>
            {currentUser ? (
              <UserProfile />
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-pink-600 px-3 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full transition"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block text-gray-700 hover:bg-pink-50 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3">
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="block text-gray-700 hover:bg-pink-50 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {currentUser ? (
              <div className="border-t border-gray-100 pt-3">
                <UserProfile />
              </div>
            ) : (
              <div className="flex space-x-2 pt-3">
                <Link
                  to="/login"
                  className="flex-1 text-center text-gray-700 border border-gray-200 rounded-full py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center text-white bg-pink-600 rounded-full py-2 text-sm font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;