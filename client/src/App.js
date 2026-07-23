import './index.css';
import './auth.css';
import './landing-theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CakeBuilder from './pages/CakeBuilder';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/CustomerDashboard';
import BakerDashboard from './pages/BakerDashboard';
import AIGenerator from './pages/AIGenerator';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import BakerPricing from './pages/BakerPricing';
import OrderChat from './pages/OrderChat';
import BakerOrderChat from './pages/BakerOrderChat';
import ChatList from './pages/ChatList';
import SavedDesigns from './pages/SavedDesigns';
import Profile from './pages/Profile';
import BakerProducts from './pages/BakerProducts';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/builder" element={<ProtectedRoute role="customer"><CakeBuilder /></ProtectedRoute>} />
        <Route path="/dashboard/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/baker" element={<ProtectedRoute role="baker"><BakerDashboard /></ProtectedRoute>} />
        <Route path="/ai-generator" element={<ProtectedRoute role="customer"><AIGenerator /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute role="customer"><Checkout /></ProtectedRoute>} />
        <Route path="/order-tracking" element={<ProtectedRoute role="customer"><OrderTracking /></ProtectedRoute>} />
        <Route path="/baker/pricing" element={<ProtectedRoute role="baker"><BakerPricing /></ProtectedRoute>} />
        <Route path="/baker/products" element={<ProtectedRoute role="baker"><BakerProducts /></ProtectedRoute>} />
        <Route path="/chat/:orderId" element={<ProtectedRoute role="customer"><OrderChat /></ProtectedRoute>} />
        <Route path="/baker/chat/:orderId" element={<ProtectedRoute role="baker"><BakerOrderChat /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute role="customer"><ChatList /></ProtectedRoute>} />
        <Route path="/saved-designs" element={<ProtectedRoute role="customer"><SavedDesigns /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
