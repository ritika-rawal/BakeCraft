import './index.css';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<CakeBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/baker" element={<BakerDashboard />} />
        <Route path="/ai-generator" element={<AIGenerator />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/baker/pricing" element={<BakerPricing />} />
        <Route path="/baker/products" element={<BakerProducts />} />
        <Route path="/chat/:orderId" element={<OrderChat />} />
        <Route path="/baker/chat/:orderId" element={<BakerOrderChat />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/saved-designs" element={<SavedDesigns />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
