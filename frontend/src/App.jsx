import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // ✅ This will work now
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Sell from './pages/Sell';
import MyAds from './pages/MyAds';
import Account from './pages/Account';
import Chat from './pages/Chat';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Wallet from './pages/Wallet';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // ✅ Using the hook here
  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppLayout = () => {
  const location = useLocation();
  const authPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!authPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
        <Route path="/myads" element={<ProtectedRoute><MyAds /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="/chat/:sellerId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      </Routes>
      {!authPage && <BottomNav />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;