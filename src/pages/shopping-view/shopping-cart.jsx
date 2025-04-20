import { fetchCartItems } from "@/store/shop/cart-slice";
import { Button } from "../../components/ui/button";
import UserCartItemsContent from "../../components/shopping-view/cart-items-content";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((acc, curr) => acc + curr.salePrice * curr.quantity, 0)
      : 0;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems({ userId: user.id }));
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col  p-4 w-full">
      <div className="mt-8 space-y-4">
        <h1 className="text-xl ">Your cart</h1>
        {cartItems && cartItems?.length > 0 ? (
          cartItems?.map((item, i) => (
            <UserCartItemsContent key={`item-${i}`} cartItem={item} />
          ))
        ) : (
          <p>No products in Cart! </p>
        )}
      </div>

      <div className="mt-8 space-y-4 ">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total :</span>
          <span className="font-bold">$ {totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => navigate("/shop/checkout")}
        className="w-60 mt-5 self-end"
      >
        Checkout
      </Button>
    </div>
  );
}

export default ShoppingCart;
