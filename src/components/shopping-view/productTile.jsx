import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { filterOptions } from "@/config";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  const renderCategoryName = () => {
    return filterOptions.category.find((each) => each.id === product?.category)
      ?.label;
  };

  const renderBrandName = () => {
    return filterOptions.brand.find((each) => each.id === product?.brand)
      ?.label;
  };

  return (
    <Card className="w-full max-w-sm mx-auto ">
      <div
        onClick={() => handleGetProductDetails(product._id)}
        className="cursor-pointer"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg "
          />
          <Badge className="absolute top-2 left-2">Sale</Badge>
        </div>

        <CardContent className="p-4 ">
          <CardHeader>
            <CardTitle className="sr-only">Card Title</CardTitle>
          </CardHeader>
          <h2 className="text-lg font-bold mb-2">{product?.title}</h2>
          <div className="w-full flex justify-between">
            <span className="text-sm text-muted-foreground">
              {renderCategoryName()}
            </span>
            <span className="text-sm text-muted-foreground">
              {renderBrandName()}
            </span>
          </div>
          <div className="w-full flex justify-between">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through " : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className=" text-lg font-semibold text-primary">
                {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            handleAddToCart(product._id);
          }}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
