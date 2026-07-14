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
      </Routes>
    </BrowserRouter>
  );
}

export default App;