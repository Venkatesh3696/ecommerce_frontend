import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const userId = user?.id;
    dispatch(
      addToCart({ userId, productId: productDetails._id, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems());
        toast({ title: "item added to cart" });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTitle className="sr-only">null</DialogTitle>
      <DialogContent
        description={productDetails?.title || "Product details"}
        className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
      >
        <div className=" relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div className="col-span-6 sm:col-span-12">
            <h1 className="text-3xl font-bold text-foreground">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-muted-foreground  ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              $ {productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 && (
              <p className="text-3xl font-bold ">
                $ {productDetails?.salePrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-0.5 mt-2">
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <p>(4.5)</p>
          </div>
          <div className="mt-8 mb-2">
            <Button className="w-full" onClick={() => handleAddToCart()}>
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-y-auto mt-2">
            <h2 className="text-xl font-bold mb-4">Reviews </h2>
            <div className="flex mb-4 p-3">
              <Input placeholder="Write a Review.." />
              <Button className="ml-3">Submit</Button>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>PV</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3>Pentakota Venkatesh</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This Is Awesome!</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>PV</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3>Pentakota Venkatesh</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This Is Awesome!</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>PV</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3>Pentakota Venkatesh</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This Is Awesome!</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>PV</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3>Pentakota Venkatesh</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This Is Awesome!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
