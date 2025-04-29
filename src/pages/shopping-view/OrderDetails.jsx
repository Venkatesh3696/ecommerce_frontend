import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import api from "@/config/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderid } = useParams();
  const [orderData, setOrderData] = useState({});

  const { user } = useSelector((state) => state.auth);

  console.log(orderData);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/api/shopping/orders/${orderid}`);
      setOrderData(data.orders);
    };
    fetchData();
  }, [orderid]);

  return (
    <div className="p-6 grid gap-4">
      <div className=" grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className=" grid gap-4 ">
          <h1 className="font-medium mb-0">Order Details</h1>
          <Card className="p-4">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderData?._id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderData?.orderDate?.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>₹ {orderData?.orderPrice}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>{orderData?.paymentMethod}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderData?.paymentStatus}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 ${
                    orderData?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderData?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderData?.orderStatus}
                </Badge>
              </Label>
            </div>
          </Card>
        </div>
        <div className="grid gap-4 ">
          <h1 className="font-medium mb-0">Shipping Info</h1>
          <Card className="p-4">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Address </p>
              <Label>{orderData?.addressInfo?.address}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">City</p>
              <Label>{orderData?.addressInfo?.city}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Pincode</p>
              <Label>{orderData?.addressInfo?.pincode}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Phone</p>
              <Label>{orderData?.addressInfo?.phone}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Notes</p>
              <Label>{orderData?.addressInfo?.notes}</Label>
            </div>
          </Card>
        </div>
      </div>
      <div className="">
        <h1 className="font-medium">Order Items</h1>
        <Card className="p-4">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Phone</p>
            <Label>{orderData?.addressInfo?.phone}</Label>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
