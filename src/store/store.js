import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import shopingProductsReducer from "./shop/products-slice";
import shopingCartReducer from "../store/shop/cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shoppingProducts: shopingProductsReducer,
    shoppingCart: shopingCartReducer,
  },
});

export default store;
