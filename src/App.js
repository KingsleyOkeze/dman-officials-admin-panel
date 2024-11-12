import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import OrdersPage from './pages/order-pages/OrdersPage';
import CustomersPage from './pages/customer-pages/CustomersPage';
import CouponCodePage from './pages/coupon-pages/CouponCodePage';
import OrderDetailsPage from './pages/order-pages/OrderDetailsPage';
import ProductPage from './pages/product-pages/ProductPage';
import EditProductPage from './pages/product-pages/EditProductPage';
import AddCouponPage from './pages/coupon-pages/AddCouponPage';
import EditCouponPage from './pages/coupon-pages/EditCouponPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<OrdersPage />}/>
          <Route path="order-page" element={<OrdersPage />} />
          <Route path="order-details-page" element={<OrderDetailsPage />} />
          <Route path="product-page" element={<ProductPage />} />
          <Route path="edit-product-page" element={<EditProductPage />} />
          <Route path="customers-page" element={<CustomersPage />} />
          <Route path="coupon-code-page" element={<CouponCodePage />} />
          <Route path="edit-coupon-code-page" element={<EditCouponPage />} />
          <Route path="add-coupon-code-page" element={<AddCouponPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
