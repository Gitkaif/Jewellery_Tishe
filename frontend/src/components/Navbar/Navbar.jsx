// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UserProfile from '../UserProfile/UserProfile';
import useCategories from '../../hooks/useCategories';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const visibleCategories = categories.filter((category) => category.isActive !== false);

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
            <Link to="/" className="text-2xl font-bold text-pink-600">Tishe</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
                >
                  {category.name}
                </Link>
              ))}
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
                <>
                  <Link
                    to="/admin/add-product"
                    className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/admin/add-category"
                    className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
                  >
                    Add Category
                  </Link>
                </>
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
                  <>
                    <Link
                      to="/admin/add-product"
                      className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Product
                    </Link>
                    <Link
                      to="/admin/add-category"
                      className="text-gray-700 hover:bg-pink-50 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Category
                    </Link>
                  </>
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