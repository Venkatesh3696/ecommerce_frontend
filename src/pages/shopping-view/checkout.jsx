import Address from "@/components/shopping-view/Address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/config/api";
import { toast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);

  // const { selectedAdderess } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((acc, curr) => acc + curr.salePrice * curr.quantity, 0)
      : 0;

  const cartTotal = totalCartAmount;

  console.log(user);

  const orderData = {
    userId: user.id,
    cartItems: cartItems?.map((item) => ({
      productId: item?.product,
      image: item?.image,
      title: item?.title,
      price: item?.price > 0 ? item.salePrice : item.price,
    })),
    addressInfo: {
      addressId: currentSelectedAddress?._id,
      address: currentSelectedAddress?.address,
      city: currentSelectedAddress?.city,
      pincode: currentSelectedAddress?.pincode,
      phone: currentSelectedAddress?.phone,
      notes: currentSelectedAddress?.notes,
    },
    orderPrice: cartTotal,
  };

  console.log(orderData);

  const proceedToPayment = async (e) => {
    e.preventDefault();

    if (!currentSelectedAddress) {
      toast({
        description: "Please select an address to proceed with the payment.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length < 1) {
      toast({
        description:
          "Your Cart is empty! Please Add atleast one product to Proceed.",
        variant: "destructive",
      });
      return;
    }

    const { data } = await api.post("/api/payments", {
      amount: cartTotal,
    });
    // console.log("payment started by frontend", data);

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Test Store",
      description: "Test Payment",
      theme: { color: "#528FF0" },
      handler: async function (response) {
        try {
          const verification = await api.post("/api/payments/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verification.status === 200) {
            const orderPayload = {
              paymentMethod: "razorpay",
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              paymentStatus: "paid",
              orderStatus: "confirmed",
              ...orderData,
            };

            dispatch(createNewOrder(orderPayload)).then((data) => {
              if (data.status === 200) {
                toast({
                  title: "Order Placed",
                  description: "Payment successful! Thank you for your order.",
                });
              }

              // window.location.href = "/shop/thankyou";
            });
          } else {
            toast({
              description: "Payment verification failed. Please try again.",
              variant: "destructive",
            });
          }
        } catch (err) {
          console.error("Error during verification API call", err);
        }
      },
    };

    console.log("Redirecting to payment gateway...");
    const rzp = new Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div>
          <h2 className="text-lg font-bold pl-4">Your Cart Items</h2>
          {cartItems && cartItems.length > 0
            ? cartItems.map((cartItem, index) => (
                <UserCartItemsContent cartItem={cartItem} key={index} />
              ))
            : null}
          <div className="mt-8 space-y-4 ">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total :</span>
              <span className="font-bold">$ {cartTotal}</span>
            </div>
          </div>
          <Button className="w-full mt-2" onClick={proceedToPayment}>
            Checkout with Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
