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
  const { currentUser, isAdmin, logout } = useAuth();
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

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Tishe logo" className="h-20 w-20  object-cover " />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={handleCategoryEnter}
                onMouseLeave={handleCategoryLeave}
              >
                <button
                  type="button"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium flex items-center"
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
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[600px] grid grid-cols-2 gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-2xl z-50"
                    onMouseEnter={handleCategoryEnter}
                    onMouseLeave={handleCategoryLeave}
                  >
                    {visibleCategories.map((category) => (
                      <button
                        key={category.id}
                        className="flex items-start justify-between p-3 rounded-lg border border-transparent hover:border-pink-100 hover:bg-pink-50 transition-all text-left"
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
              <Link
                to="/cart"
                className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
              >
                Cart
              </Link>
              {currentUser ? (
                <UserProfile />
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium flex items-center space-x-1"
                  title="Admin Dashboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9h4V5H3v4zm7 0h4V5h-4v4zm7-4v4h4V5h-4zM3 15h4v-4H3v4zm7 0h4v-4h-4v4zm11-4h-4v4h4v-4zM3 21h4v-4H3v4zm7 0h4v-4h-4v4zm11-4h-4v4h4v-4z"
                    />
                  </svg>
                  <span className="hidden xl:inline">Dashboard</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
            {currentUser ? (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  to="/account"
                  className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Account Settings
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-pink-600 hover:bg-pink-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;