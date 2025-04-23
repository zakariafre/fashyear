import React, { Children } from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HeroSection from './pages/HomePage/HeroSection';
import Navbar from './components/Navbar';
import Noise from './components/Noise';
import CategorySection from './pages/HomePage/CategorySection';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Search from './components/Search';
import Shop from './pages/ShopPage/Shop';
import ProductData from '../ProductsDB.json'
import ProductPage from './pages/ProductPage/ProductPage';
import NewArrival from './pages/HomePage/NewArrival';
import Wishlist from './pages/WishlistPage/Wishlist';
import CartSideBar from './components/CartSideBar';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import LogIn from './pages/Log-in/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Checkout from './pages/CheckOut/Checkout';
import Profile from './pages/ProfilePage/Profile';
import AdminDashboard from './pages/AdminPage/AdminDashboard';
import AdminProducts from './pages/AdminPage/AdminProducts';
import AdminOrders from './pages/AdminPage/AdminOrders';
import AdminUsers from './pages/AdminPage/AdminUsers';
import AdminSettings from './pages/AdminPage/AdminSettings';

const App = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent
            isOpen={isOpen}
            setIsOpen={setIsOpen}

            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}

            isWishlistOpen={isWishlistOpen}
            setIsWishlistOpen={setIsWishlistOpen}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

// Protected Route component for admin routes
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Main layout with Navbar and Footer
const MainLayout = ({ children, isOpen, setIsOpen, isSearchOpen, setIsSearchOpen }) => {
  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {children}
      <Footer />
    </>
  );
};

// Auth layout without Navbar and Footer
const AuthLayout = ({ children }) => {
  return children;
};

// Checkout layout with only minimal header
const CheckoutLayout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen">
      {children}
    </div>
  );
};

// Admin layout
const AdminLayout = ({ children }) => {
  return (
    <div className="bg-[#121212] min-h-screen">
      {children}
    </div>
  );
};



const ProfileLayout = ({ children, isOpen, setIsOpen, isSearchOpen, setIsSearchOpen }) => {
  return (
    <div className="min-h-screen w-full bg-[#121212] text-white">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {children}
      <Footer />
    </div>
  );
};

const AppContent = ({ isOpen, setIsOpen, isSearchOpen, setIsSearchOpen, isWishlistOpen, setIsWishlistOpen }) => {
  const { isCartOpen } = useCart();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isCheckoutPage = location.pathname === '/checkout';
  const isProfilePage = location.pathname === '/profile';
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isSearchOpen, isCartOpen]);

  // If we're on the checkout page, render the checkout layout
  if (isCheckoutPage) {
    return (
      <>
        <Noise patternSize={400} patternAlpha={5} />
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </>
    );
  }

  // If we're on an auth page, only render the auth routes
  if (isAuthPage) {
    return (
      <>
        <Noise patternSize={400} patternAlpha={5} />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </>
    );
  }

  // If we're on an admin page, render the admin layout
  if (isAdminPage) {
    return (
      <>
        <Noise patternSize={400} patternAlpha={5} />
        <Routes>
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/settings" element={
            <AdminRoute>
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            </AdminRoute>
          } />
        </Routes>
      </>
    );
  }

  // Otherwise render the main app with all decorations
  return (
    <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative">
      <Noise patternSize={400} patternAlpha={10} />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

      <CartSideBar />

      <div className='flex flex-col items-center min-h-screen gap-[10rem] md:gap-[3rem]'>
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} products={ProductData} />

        <Routes>
          {/* Auth routes without Navbar and Footer */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Checkout route */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Main routes with Navbar and Footer */}
          <Route path="/" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <div className="flex flex-col min-h-screen gap-[3rem] md:gap-[4rem]">
                <HeroSection />
                <CategorySection />
                <NewArrival />
              </div>
            </MainLayout>
          } />

          <Route path="/shop" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <Shop />
            </MainLayout>
          } />

          <Route path="/product/:id" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <ProductPage />
            </MainLayout>
          } />

          <Route path="/wishlist" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <Wishlist />
            </MainLayout>
          } />

          <Route path="/profile" element={
            <ProfileLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <Profile />
            </ProfileLayout>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default App;




