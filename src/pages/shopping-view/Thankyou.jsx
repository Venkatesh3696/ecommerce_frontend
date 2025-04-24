const ThankYou = () => (
  <div className="text-center p-10">
    <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
    <p className="mt-4 text-lg">
      Thank you for your purchase. Your order has been placed successfully.
    </p>
    <a href="/shop/orders" className="mt-4 inline-block text-blue-500">
      View your order details
    </a>
  </div>
);

export default ThankYou;
