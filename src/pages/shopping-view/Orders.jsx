import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllOrdersForShoppingUser } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingOrders = () => {
  const { orders } = useSelector((state) => state.shoppingOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrdersForShoppingUser());
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              console.log(order);
              return (
                <TableRow key={index}>
                  <TableCell> {order._id} </TableCell>
                  <TableCell>{order.orderDate.split("T")[0]} </TableCell>
                  <TableCell>{order.orderStatus} </TableCell>
                  <TableCell>{order.orderPrice} </TableCell>
                  <TableCell>
                    <Button>View Details</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
