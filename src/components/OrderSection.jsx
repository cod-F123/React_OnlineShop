import OrderItem from "./OrderItem";

function OrdersSection() {
  const orders = [
    { id: "#1001", date: "2026-04-30", total: "$49.99", status: "در حال پردازش" },
    { id: "#1000", date: "2026-03-20", total: "$19.99", status: "تحویل داده شده" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">سفارش‌های من</h2>
      <ul className="space-y-3">
        {orders.map((o) => (
          <OrderItem key={o.id} order={o} />
        ))}
      </ul>
      {orders.length === 0 && <p className="text-gray-600 mt-3">شما هنوز سفارشی ثبت نکرده‌اید.</p>}
    </div>
  );
};

export default OrdersSection;