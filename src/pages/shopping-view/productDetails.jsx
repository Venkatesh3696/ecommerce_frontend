import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/config/api";

const ProductDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    const userId = user?.id;
    dispatch(addToCart({ userId, productId: product._id, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems());
          toast({ title: "item added to cart" });
        }
      }
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/shopping/products/${id}`);
        console.log(response);
        setProduct(response.data.data);
      } catch (error) {
        toast({ title: "Failed to fetch product details" });
        console.log("error while fetching "), error;
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8 sm:p-12 ">
      <div className=" relative overflow-hidden rounded-lg">
        <img
          src={product?.image}
          alt={product?.title}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div>
        <div className="col-span-6 sm:col-span-12">
          <h1 className="text-3xl font-bold text-foreground">
            {product?.title}
          </h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {product?.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`text-3xl font-bold text-muted-foreground  ${
              product?.salePrice > 0 ? "line-through" : ""
            }`}
          >
            $ {product?.price}
          </p>

          {product?.salePrice > 0 && (
            <p className="text-3xl font-bold ">$ {product?.salePrice}</p>
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
    </div>
  );
};

export default ProductDetails;
