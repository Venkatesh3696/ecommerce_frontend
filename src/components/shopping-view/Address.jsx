import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "@/hooks/use-toast";
import { setAddress } from "@/store/auth-slice";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  // const selectedAddress = useSelector(
  //   (state) => state.auth.address.selectedAddress
  // );

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleManageAddress = (e) => {
    e.preventDefault();
    if (addressList && addressList.length >= 3 && currentEditingId === null) {
      toast({
        title: "You can only have 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditingId === null
      ? dispatch(
          addNewAddress({
            formData,
            userId: user?.id,
          })
        ).then((data) => {
          console.log(data);
          if (data.payload.success) {
            dispatch(fetchAllAddresses());
            setFormData(initialAddressFormData);
            toast({
              title: "Address Added Successfully",
            });
          }
        })
      : dispatch(editAddress({ formData, id: currentEditingId })).then(
          (data) => {
            if (data.type === "/addresses/editAddress/fulfilled") {
              dispatch(fetchAllAddresses());
              setFormData(initialAddressFormData);
              toast({
                title: "Address Updated Successfully",
              });
            }
          }
        );
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(deleteAddress(getCurrentAddress._id)).then((data) => {
      console.log(data);
      if (data?.type === "/addresses/deleteAddress/fulfilled") {
        dispatch(fetchAllAddresses());
        toast({
          title: "Address Deleted Successfully",
        });
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditingId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  const handleSelectAddress = (getCurrentAddress) => {
    dispatch(setAddress(getCurrentAddress));
  };

  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  return (
    <Card className="p-4">
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem, i) => (
              <AddressCard
                key={i}
                addressInfo={addressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                currentEditingId={currentEditingId}
                handleSelectAddress={handleSelectAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditingId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditingId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
