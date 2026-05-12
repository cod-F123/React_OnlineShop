import React, { useState } from "react";
import Tabs from "../components/Tabs";
import OrdersSection from "../components/OrderSection";
import AddressesSection from "../components/AddressesSection";
import ProfileSection from "../components/ProfileSection";
import SupportSection from "../components/SupportSection";

function Dashboard() {
  const [tab, setTab] = useState("orders");

  const tabs = [
    { key: "orders", label: "سفارش‌های من" },
    { key: "addresses", label: "آدرس‌ها" },
    { key: "profile", label: "اطلاعات من" },
    { key: "support", label: "پشتیبانی" },
  ];

  return (
    <div className={"p-6 max-w-4xl mx-auto min-h-screen"}>
      <div className={"flex items-center  justify-between mb-4"}>
        <h1 className={"text-2xl font-bold"}>داشبورد</h1>
      </div>

      <Tabs tabs={tabs} activeKey={tab} onChange={setTab} />

      <div className={"mt-4 bg-white rounded-xl overflow-hidden shadow p-6"}>
        {tab === "orders" && <OrdersSection />}
        {tab === "addresses" && <AddressesSection />}
        {tab === "profile" && <ProfileSection />}
        {tab === "support" && <SupportSection />}
      </div>
    </div>
  );
}

export default Dashboard;