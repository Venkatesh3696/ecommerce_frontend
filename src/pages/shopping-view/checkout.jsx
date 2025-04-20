import Address from "@/components/shopping-view/Address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((acc, curr) => acc + curr.salePrice * curr.quantity, 0)
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="account"
          className="h-full w-full object-cover object-center "
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5 ">
        <Address />
        <div>
          <h2 className="text-lg font-bold pl-4">Your Cart Items</h2>
          {cartItems && cartItems.length > 0
            ? cartItems.map((cartItem) => (
                <UserCartItemsContent cartItem={cartItem} key={cartItem._id} />
              ))
            : null}
          <div className="mt-8 space-y-4 ">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total :</span>
              <span className="font-bold">$ {totalCartAmount}</span>
            </div>
          </div>
          <Button className="w-full mt-2">Checkout with Paypal</Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
