import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product, compact = false }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if the click was on the button or a link
    if (e.target.tagName === 'BUTTON' || e.target.closest('button, a')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    console.log('Added to cart:', product.id);
    // TODO: Add to cart logic here
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer hover:ring-2 hover:ring-pink-500`}
    >
      <div className="h-48 w-full overflow-hidden rounded-md bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-3 flex-grow flex flex-col">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">${product.price?.toFixed(2) || '0.00'}</p>
          <button
            className="py-2 px-4 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
