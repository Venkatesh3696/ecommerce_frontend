import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import shopingProductsReducer from "./shop/products-slice";
import shopingCartReducer from "./shop/cart-slice";
import addressReducer from "./shop/address-slice";
import shoppingOrderReducer from "./shop/order-slice";
import adminOrdersReducer from "./admin/orders-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shoppingProducts: shopingProductsReducer,
    shoppingCart: shopingCartReducer,
    shoppingAddress: addressReducer,
    shoppingOrder: shoppingOrderReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
