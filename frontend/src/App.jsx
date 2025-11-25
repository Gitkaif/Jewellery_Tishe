// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/Admin/AddProduct';
import AddCategory from './pages/Admin/AddCategory';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route 
                path="/admin/add-product" 
                element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/admin/add-category"
                element={
                  <ProtectedRoute>
                    <AddCategory />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;