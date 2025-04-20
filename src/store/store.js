import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import shopingProductsReducer from "./shop/products-slice";
import shopingCartReducer from "./shop/cart-slice";
import addressReducer from "./shop/address-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shoppingProducts: shopingProductsReducer,
    shoppingCart: shopingCartReducer,
    shopAddress: addressReducer,
  },
});

export default store;
