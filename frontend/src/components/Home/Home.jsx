import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ProductCard from '../ProductCard/ProductCard';
import useCategories from '../../hooks/useCategories';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productsList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeaturedProducts(productsList);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProductsError('Failed to load products');
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (productsLoading || categoriesLoading) {
    return <div className="text-center py-10">Loading storefront...</div>;
  }

  if (productsError || categoriesError) {
    return (
      <div className="text-center py-10 text-red-500">
        {productsError || categoriesError}
      </div>
    );
  }

  const visibleCategories = categories.filter((category) => category.isActive !== false);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-100 to-purple-100 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Timeless Beauty in Every Piece
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Handcrafted jewelry that tells your unique story. Explore our collection of exquisite pieces designed to make you shine.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/category/all"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-md transition-colors text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-3 px-8 rounded-md transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Elegant Jewelry"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        {visibleCategories.length === 0 ? (
          <p className="text-center text-gray-500">No categories have been added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={
                      category.image ||
                      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=500&q=60'
                    }
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                  {category.description && (
                    <p className="text-white text-center px-4">{category.description}</p>
                  )}
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our handpicked selection of premium jewelry pieces that combine quality craftsmanship with timeless design.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                compact={true}
                product={{
                  ...product,
                  description: product.category
                }}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/category/all"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-bold mb-6">About Tishe</h2>
            <p className="text-gray-700 mb-6">
              At Tishe, we believe that jewelry is more than just an accessory – it's a form of self-expression. Each piece in our collection is carefully selected for its quality, craftsmanship, and timeless appeal.
            </p>
            <p className="text-gray-700 mb-8">
              Our mission is to provide you with beautiful, ethically sourced jewelry that you can feel good about wearing. We work with skilled artisans who share our commitment to quality and sustainability.
            </p>
            <Link
              to="/about"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              Our Story
            </Link>
          </div>
          
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The quality of the jewelry is exceptional. I get compliments every time I wear my new necklace!",
                author: "Sarah M.",
                rating: 5
              },
              {
                quote: "Beautiful pieces and excellent customer service. Will definitely be shopping here again!",
                author: "Michael T.",
                rating: 5
              },
              {
                quote: "I was looking for something unique and found exactly what I wanted at Tishe. Highly recommend!",
                author: "Jennifer K.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Piece?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up for our newsletter and get 15% off your first order!
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-r-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
