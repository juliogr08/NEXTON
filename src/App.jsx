import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  return (
    <CartProvider>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={
          isAdminAuth 
            ? <Navigate to="/admin" replace /> 
            : <AdminLogin onLogin={() => setIsAdminAuth(true)} />
        } />

        {/* Admin Panel — protected */}
        <Route path="/admin/*" element={
          isAdminAuth 
            ? <AdminLayout onLogout={() => setIsAdminAuth(false)} /> 
            : <Navigate to="/admin/login" replace />
        } />

        {/* Store Front */}
        <Route path="*" element={
          <div className="min-h-screen bg-bgMain flex flex-col">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm} />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
              </Routes>
            </div>

            <Footer />
            <CartDrawer />
          </div>
        } />
      </Routes>
    </CartProvider>
  );
}

export default App;

