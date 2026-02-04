import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { ToastProvider } from './context/ToastContext';
import { OrderProvider } from './context/OrderContext';
import { QuickViewProvider } from './context/QuickViewContext';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Products = React.lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const Checkout = React.lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const OrderConfirmation = React.lazy(() => import('./pages/OrderConfirmation').then(module => ({ default: module.OrderConfirmation })));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const OurOrchards = React.lazy(() => import('./pages/OurOrchards').then(module => ({ default: module.OurOrchards })));
const AboutUs = React.lazy(() => import('./pages/AboutUs').then(module => ({ default: module.AboutUs })));
const Profile = React.lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const Login = React.lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const SignUp = React.lazy(() => import('./pages/SignUp').then(module => ({ default: module.SignUp })));
const Wishlist = React.lazy(() => import('./pages/Wishlist').then(module => ({ default: module.Wishlist })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const LegalPage = React.lazy(() => import('./pages/LegalPage').then(module => ({ default: module.LegalPage })));
const FAQ = React.lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));

// Admin Lazy Imports
const AdminLogin = React.lazy(() => import('./admin/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminLayout = React.lazy(() => import('./admin/AdminLayout').then(module => ({ default: module.AdminLayout })));
const Dashboard = React.lazy(() => import('./admin/Dashboard').then(module => ({ default: module.Dashboard })));
const Orders = React.lazy(() => import('./admin/Orders').then(module => ({ default: module.Orders })));
const ProductList = React.lazy(() => import('./admin/ProductList').then(module => ({ default: module.ProductList })));
const ReviewManagement = React.lazy(() => import('./admin/ReviewManagement').then(module => ({ default: module.default })));
const InventoryManagement = React.lazy(() => import('./admin/InventoryManagement').then(module => ({ default: module.default })));
const Settings = React.lazy(() => import('./admin/Settings').then(module => ({ default: module.Settings })));

// Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin"></div>
    <p className="mt-4 text-brand-primary font-serif animate-pulse">Loading...</p>
  </div>
);

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <HelmetProvider>
        <ScrollToTop />
        <ScrollToTopButton />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <WishlistProvider>
                <ProductProvider>
                  <OrderProvider>
                    <CartProvider>
                      <QuickViewProvider>
                        <div className="min-h-screen bg-gradient-to-b from-white to-[#ECEBE4] dark:from-[#0B0C10] dark:to-[#1A1D23] font-sans selection:bg-brand-accent selection:text-white relative transition-colors duration-300">
                          {/* Global Decorative background elements */}
                          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                            <div className="absolute top-20 right-20 w-80 h-80 bg-brand-primary dark:bg-brand-accent rounded-full blur-3xl opacity-10 dark:opacity-10"></div>
                            <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-primary dark:bg-brand-accent rounded-full blur-3xl opacity-10 dark:opacity-10"></div>
                          </div>

                          <div className="relative z-10 flex flex-col min-h-screen">
                            <main className="flex-grow">
                              <React.Suspense fallback={<PageLoader />}>
                                <Routes>
                                  {/* Admin Routes */}
                                  <Route path="/admin" element={<AdminLogin />} />
                                  <Route path="/admin/*" element={<AdminLayout />}>
                                    {/* Children will be defined here later */}
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="orders" element={<Orders />} />
                                    <Route path="products" element={<ProductList />} />
                                    <Route path="inventory" element={<InventoryManagement />} />
                                    <Route path="reviews" element={<ReviewManagement />} />
                                    <Route path="settings" element={<Settings />} />
                                  </Route>

                                  {/* Site Routes */}
                                  <Route element={<>
                                    <Navbar
                                      onCartClick={() => setIsCartOpen(true)}
                                      onMenuClick={() => setIsMobileMenuOpen(true)}
                                    />
                                    <MobileMenu
                                      isOpen={isMobileMenuOpen}
                                      onClose={() => setIsMobileMenuOpen(false)}
                                    />
                                    <CartDrawer
                                      isOpen={isCartOpen}
                                      onClose={() => setIsCartOpen(false)}
                                    />
                                    <Outlet />
                                    <Footer />
                                  </>}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                                    <Route path="/product/:id" element={<ProductDetails />} />
                                    <Route path="/our-orchards" element={<OurOrchards />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<SignUp />} />
                                    <Route path="/about" element={<AboutUs />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
                                    <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
                                    <Route path="/shipping-info" element={<LegalPage type="shipping" />} />
                                    <Route path="/faq" element={<FAQ />} />
                                    <Route path="*" element={<NotFound />} />
                                  </Route>
                                </Routes>
                              </React.Suspense>
                            </main>
                          </div>
                        </div>
                      </QuickViewProvider>
                    </CartProvider>
                  </OrderProvider>
                </ProductProvider>
              </WishlistProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Router >
  )
}

export default App
