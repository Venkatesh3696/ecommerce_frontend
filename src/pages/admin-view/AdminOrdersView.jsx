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
import { fetchAllOrdersForAdmin } from "@/store/admin/orders-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminOrdersView = () => {
  const navigate = useNavigate();
  const { ordersList } = useSelector((state) => state.adminOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrdersForAdmin());
  }, [dispatch]);

  console.log(ordersList);
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
            {ordersList.map((order, index) => {
              return (
                <TableRow key={index}>
                  <TableCell> {order._id} </TableCell>
                  <TableCell>{order.orderDate.split("T")[0]} </TableCell>
                  <TableCell>{order.orderStatus} </TableCell>
                  <TableCell>{order.orderPrice} </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        navigate(`/admin/orders/${order._id}`);
                      }}
                    >
                      View Details
                    </Button>
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

export default AdminOrdersView;
