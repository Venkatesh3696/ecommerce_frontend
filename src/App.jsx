import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/checkAuth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import ShoppingCart from "./pages/shopping-view/shopping-cart";
import ProductDetails from "./pages/shopping-view/productDetails";
import AdminOrdersView from "./pages/admin-view/AdminOrdersView";
import ShoppingOrders from "./pages/shopping-view/Orders";
import AdminOrderDetails from "./pages/admin-view/AdminOrderDetails";
import ThankYou from "./pages/shopping-view/Thankyou";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-full  h-full" />;
  }

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="features" element={<AdminFeatures />} />
        <Route path="orders" element={<AdminOrdersView />} />
        <Route path="orders/:orderId" element={<AdminOrderDetails />} />
      </Route>
      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="account" element={<ShoppingAccount />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="orders" element={<ShoppingOrders />} />
        <Route path="orders" element={<ShoppingOrders />} />
        <Route path="thankyou" element={<ThankYou />} />
      </Route>
      <Route path="/unauth-page" element={<UnAuthPage />} />
      <Route path="/" element={<ShoppingHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
