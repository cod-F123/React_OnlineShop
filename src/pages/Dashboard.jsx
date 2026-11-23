import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutDashboard, LifeBuoy, MapPin, ShoppingBag, UserRound } from "lucide-react";
import AddressesSection from "../components/AddressesSection";
import ProfileSection from "../components/ProfileSection";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import OrdersList from "../components/dashboard/OrdersList";
import OverviewPanel from "../components/dashboard/OverviewPanel";
import SupportCenter from "../components/dashboard/SupportCenter";
import useAuth from "../hooks/AuthHook";
import useAlert from "../hooks/AlertHook";

const easing = [0.22, 1, 0.36, 1];

function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { setMessage, setTypeAlert } = useAlert();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const tabs = [
    {
      key: "dashboard",
      label: "داشبورد",
      title: "داشبورد",
      subtitle: "نمای کلی سفارش‌ها، آدرس‌ها و حساب کاربری شما",
      icon: LayoutDashboard,
    },
    {
      key: "orders",
      label: "سفارش‌های من",
      title: "سفارش‌های من",
      subtitle: "پیگیری و مشاهده جزئیات سفارش‌های ثبت‌شده",
      icon: ShoppingBag,
    },
    {
      key: "addresses",
      label: "آدرس‌های من",
      title: "آدرس‌های من",
      subtitle: "مدیریت آدرس‌های تحویل سفارش",
      icon: MapPin,
    },
    {
      key: "profile",
      label: "پروفایل من",
      title: "پروفایل من",
      subtitle: "ویرایش نام و ایمیل حساب کاربری",
      icon: UserRound,
    },
    {
      key: "support",
      label: "پشتیبانی",
      title: "پشتیبانی",
      subtitle: "پاسخ سریع، تیکت‌ها و راه‌های ارتباط با تیم پشتیبانی",
      icon: LifeBuoy,
    },
  ];

  const activeTab = tabs.find((item) => item.key === tab) ?? tabs[0];

  const handleSelect = (key) => {
    setTab(key);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    setTypeAlert("info");
    setMessage("از حساب کاربری خود خارج شدید");
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>داشبورد | پرایم شاپ</title>
        <meta name="description" content="داشبورد کاربری شما - سفارش‌ها، آدرس‌ها و اطلاعات حساب." />
        <meta property="og:title" content="داشبورد | پرایم شاپ" />
        <meta property="og:description" content="مدیریت سفارش‌ها، آدرس‌ها و اطلاعات حساب کاربری." />
      </Helmet>

      <main dir="rtl" lang="fa" className="min-h-screen bg-slate-50">
        <div className="mx-auto flex w-full max-w-[110rem] gap-6 lg:px-8 lg:py-8">
          <DashboardSidebar
            items={tabs}
            activeKey={tab}
            user={user}
            isOpen={isSidebarOpen}
            onSelect={handleSelect}
            onClose={() => setIsSidebarOpen(false)}
            onLogout={handleLogout}
          />

          <div className="min-w-0 flex-1">
            <DashboardHeader
              title={activeTab.title}
              subtitle={activeTab.subtitle}
              user={user}
              onOpenSidebar={() => setIsSidebarOpen(true)}
              onSelect={handleSelect}
              onLogout={handleLogout}
            />

            <div className="px-4 py-6 sm:px-6 lg:px-0">
              {tab === "dashboard" ? (
                <OverviewPanel user={user} onNavigate={handleSelect} />
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: easing }}
                    className={
                      tab === "support" || tab === "orders"
                        ? ""
                        : "rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_30px_60px_-50px_rgba(15,23,42,0.6)] sm:p-6"
                    }
                  >
                    {tab === "orders" && <OrdersList />}
                    {tab === "addresses" && <AddressesSection />}
                    {tab === "profile" && <ProfileSection />}
                    {tab === "support" && <SupportCenter />}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
