import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

export default function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);

  const handleCartItemDelete = () => {
    dispatch(deleteCartItem({ userId: user?.id, productId: cartItem?.product }))
      .then(() => {
        dispatch(fetchCartItems({ userId: user.id }));
        toast({
          title: "Cart item deleted successfully!",
        });
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  };

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem.product,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems());
        toast({
          title: "Cart item updated successfully!",
        });
      }
    });
  };

  return (
    <div className="w-full ">
      <div className="w-full flex items-center space-x-4 p-5">
        <img
          src={cartItem?.image}
          alt={cartItem.title}
          className="w-32 h-32 rounded-sm object-cover bg-cover"
        />
        <div className="flex-1 ">
          <h1 className="font-extrabold text-xl">{cartItem?.brand}</h1>
          <h3 className="font-extrabold">{cartItem?.title} </h3>
          <div className="flex items-center mt-1  ">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
              disabled={cartItem?.quantity === 1}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only ">Decrease</span>
            </Button>
            <span className="p-2 font-semibold">{cartItem?.quantity} </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only ">Increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              (cartItem.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              cartItem?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            className="cursor-pointer mt-1"
            size={20}
            onClick={handleCartItemDelete}
          />
        </div>
      </div>
    </div>
  );
}
