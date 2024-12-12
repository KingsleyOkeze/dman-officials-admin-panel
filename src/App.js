import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import OrdersPage from './pages/order-pages/OrdersPage';
import CustomersPage from './pages/customer-pages/CustomersPage';
import CouponCodePage from './pages/coupon-pages/CouponCodePage';
import OrderDetailsPage from './pages/order-pages/OrderDetailsPage';
import ProductPage from './pages/product-pages/ProductPage';
import EditProductPage from './pages/product-pages/EditProductPage';
import AddCouponPage from './pages/coupon-pages/AddCouponPage';
import EditCouponPage from './pages/coupon-pages/EditCouponPage';
import SignUpPage from './pages/auth/SignUpPage';
import SignUpVerification from './pages/auth/SignUpVerification';
import LoginPage from './pages/auth/LoginPage';
import axios from 'axios';
import EmailSentPage from './pages/auth/EmailSentPage';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import HomePage from './pages/HomePage';

function App() {

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  // console.log('your server url', process.env.REACT_APP_BASE_URL);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/admin/sign-up" element={<SignUpPage />} />
          <Route path="/admin/sign-up-email-verification/:token" element={<SignUpVerification/>} />
          <Route path="/admin/email-sent/:userId" element={<EmailSentPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/forget-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
        
        </Route>
        {/* Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/admin/home-page" replace />} /> {/* Redirect to HomePage */}
          <Route element={<Dashboard />}>
            <Route path="home-page" element={<HomePage />} />
            <Route path="order-page" element={<OrdersPage />} />
            <Route path="order-details-page" element={<OrderDetailsPage />} />
            <Route path="product-page" element={<ProductPage />} />
            <Route path="edit-product-page/:productId" element={<EditProductPage />} />
            <Route path="customers-page" element={<CustomersPage />} />
            <Route path="coupon-code-page" element={<CouponCodePage />} />
            <Route path="edit-coupon-code-page/:couponId" element={<EditCouponPage />} />
            <Route path="add-coupon-code-page" element={<AddCouponPage />} />
          </Route>
        </Route>

        {/* Fallback Route for Unknown Paths */}
        <Route path="*" element={<NotFoundPage />} /> {/* This will catch all unknown routes and show the NotFoundPage */}
      </Routes>
    </Router>
  );
}

export default App;
