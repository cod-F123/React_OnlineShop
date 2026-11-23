import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Loader2, Check, X, Home, Briefcase, Building2 } from "lucide-react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";

const easing = [0.22, 1, 0.36, 1];

const SAMPLE_EMPTY_ADDRESS = { id: "", title: "", address: "", zip_code: "" };

function toEnglishDigits(input) {
  return input
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632));
}

function isDigitsOnly(s) {
  return /^\d+$/.test(s);
}

export default function AddressesSection() {
  const [addresses, setAddresses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editableAddress, setEditableAddress] = useState(SAMPLE_EMPTY_ADDRESS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { setMessage, setTypeAlert } = useAlert();
  const reduceMotion = useReducedMotion();

  const fetchAddresses = useCallback(() => {
    setIsLoading(true);
    api
      .get("/accounts/api/v1/address/")
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((error) => {
        console.error(error);
        setTypeAlert("error");
        setMessage("دریافت اطلاعات با خطا مواجه شد");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setMessage, setTypeAlert]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const validateAddress = (address) => {
    if (!isDigitsOnly(toEnglishDigits(address.zip_code)) || address.zip_code.length < 10) {
      setTypeAlert("error");
      setMessage("فرمت کدپستی نامعتبر است");
      return false;
    }
    if (!address.title?.trim()) {
      setTypeAlert("error");
      setMessage("فیلد عنوان الزامی است");
      return false;
    }
    if (!address.address?.trim()) {
      setTypeAlert("error");
      setMessage("فیلد آدرس الزامی است");
      return false;
    }
    return true;
  };

  const handleOpenCreate = useCallback(() => {
    setEditableAddress(SAMPLE_EMPTY_ADDRESS);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((address) => {
    setEditableAddress({ ...address });
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditableAddress(SAMPLE_EMPTY_ADDRESS);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditableAddress((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmitCreate = useCallback(() => {
    if (!validateAddress(editableAddress)) return;

    setIsSubmitting(true);
    api
      .post("/accounts/api/v1/address/", editableAddress)
      .then((res) => {
        setAddresses((prev) => [...prev, res.data]);
        setTypeAlert("success");
        setMessage("آدرس جدید با موفقیت اضافه شد");
        handleCloseForm();
      })
      .catch((error) => {
        console.error(error);
        setTypeAlert("error");
        setMessage("عملیات با خطا مواجه شد");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [editableAddress, validateAddress, handleCloseForm, setMessage, setTypeAlert]);

  const handleSubmitEdit = useCallback(() => {
    if (!validateAddress(editableAddress)) return;

    setIsSubmitting(true);
    api
      .put(`/accounts/api/v1/address/${editableAddress.id}/`, editableAddress)
      .then((res) => {
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === editableAddress.id ? res.data : addr))
        );
        setTypeAlert("success");
        setMessage("آدرس با موفقیت ویرایش یافت");
        handleCloseForm();
      })
      .catch((error) => {
        console.error(error);
        setTypeAlert("error");
        setMessage("عملیات با خطا مواجه شد");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [editableAddress, validateAddress, handleCloseForm, setMessage, setTypeAlert]);

  const handleDelete = useCallback(
    (addressId) => {
      setDeletingId(addressId);
      api
        .delete(`/accounts/api/v1/address/${addressId}/`)
        .then(() => {
          setAddresses((prev) => prev.filter((item) => item.id !== addressId));
          setTypeAlert("success");
          setMessage("آدرس با موفقیت حذف شد");
        })
        .catch((error) => {
          console.error(error);
          setTypeAlert("error");
          setMessage("عملیات با خطا مواجه شد");
        })
        .finally(() => {
          setDeletingId(null);
        });
    },
    [setMessage, setTypeAlert]
  );

  // Loading State
  if (isLoading) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easing }}
        className="space-y-6"
        aria-busy="true"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">آدرس‌های من</h2>
            <p className="mt-1 text-sm text-slate-500">مدیریت آدرس‌های تحویل سفارش</p>
          </div>
          <div className="h-10 w-28 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easing }}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 mb-3" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 mb-2" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 mb-2" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easing }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">آدرس‌های من</h2>
          <p className="mt-1 text-sm text-slate-500">مدیریت آدرس‌های تحویل سفارش</p>
        </div>
        <motion.button
          onClick={handleOpenCreate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shrink-0"
          aria-label="افزودن آدرس جدید"
        >
          <Plus size={18} aria-hidden="true" />
          افزودن آدرس جدید
        </motion.button>
      </div>

      {/* Addresses Grid / Empty State */}
      {addresses.length === 0 ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-14 text-center"
        >
          <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <MapPin size={28} aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-base font-bold text-slate-900">هنوز آدرسی ثبت نکرده‌اید</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            برای تسریع در ثبت سفارش، اولین آدرس تحویل خود را اضافه کنید.
          </p>
          <motion.button
            onClick={handleOpenCreate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} aria-hidden="true" />
            افزودن اولین آدرس
          </motion.button>
        </motion.div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="لیست آدرس‌ها">
          {addresses.map((address, index) => (
            <AddressCard
              key={address.id}
              address={address}
              index={index}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === address.id}
              reduceMotion={reduceMotion}
            />
          ))}
        </ul>
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
            onClick={handleCloseForm}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easing }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:items-start lg:pt-20"
            role="dialog"
            aria-modal="true"
            aria-labelledby="address-form-title"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: easing }}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_50px_100px_-50px_rgba(15,23,42,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
                <h3
                  id="address-form-title"
                  className="text-base font-bold text-slate-900"
                >
                  {editableAddress.id ? "ویرایش آدرس" : "آدرس جدید"}
                </h3>
                <motion.button
                  onClick={handleCloseForm}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="بستن فرم"
                >
                  <X size={18} aria-hidden="true" />
                </motion.button>
              </div>

              {/* Form Content */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editableAddress.id ? handleSubmitEdit() : handleSubmitCreate();
                }}
                className="p-6 space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="title" className="text-sm font-bold text-slate-900">
                      عنوان <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editableAddress.title}
                      onChange={handleInputChange}
                      placeholder="مثال: خانه، محل کار"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      dir="rtl"
                      autoFocus
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="zip_code" className="text-sm font-bold text-slate-900">
                      کد پستی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      value={editableAddress.zip_code}
                      onChange={handleInputChange}
                      maxLength={10}
                      placeholder="مثال: 1234567890"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dir-ltr"
                      dir="ltr"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="address" className="text-sm font-bold text-slate-900">
                    آدرس کامل <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={editableAddress.address}
                    onChange={handleInputChange}
                    placeholder="آدرس دقیق با واحد، طبقه، خیابان و کوچه..."
                    rows={4}
                    className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition resize-none focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    dir="rtl"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} aria-hidden="true" className="animate-spin" />
                        در حال ذخیره...
                      </>
                    ) : editableAddress.id ? (
                      <>
                        <Check size={16} aria-hidden="true" />
                        ذخیره تغییرات
                      </>
                    ) : (
                      <>
                        <Plus size={16} aria-hidden="true" />
                        افزودن آدرس
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleCloseForm}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={16} aria-hidden="true" />
                    لغو
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ==========================================================================
   AddressCard - Individual address card component
   ========================================================================== */
function AddressCard({ address, index, onEdit, onDelete, isDeleting, reduceMotion }) {
  const titleLower = address.title?.trim().toLowerCase() ?? "";
  const isHome = titleLower.includes("خانه") || titleLower.includes("home");
  const isWork = titleLower.includes("کار") || titleLower.includes("محل کار") || titleLower.includes("work") || titleLower.includes("office");
  const isOffice = titleLower.includes("شرکت") || titleLower.includes("دفتر") || titleLower.includes("company");

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: easing }}
      className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.4)]"
    >
      {/* Header with icon and type badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            {isHome && <Home size={20} aria-hidden="true" />}
            {isWork && <Briefcase size={20} aria-hidden="true" />}
            {isOffice && <Building2 size={20} aria-hidden="true" />}
            {!isHome && !isWork && !isOffice && <MapPin size={20} aria-hidden="true" />}
          </span>
          <div>
            <h3 className="font-bold text-slate-900">{address.title}</h3>
            <p className="text-[11px] text-slate-500">
              {isHome && "آدرس خانگی"}
              {isWork && "آدرس محل کار"}
              {isOffice && "آدرس شرکت/دفتر"}
              {!isHome && !isWork && !isOffice && "آدرس ذخیره شده"}
            </p>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            onClick={() => onEdit(address)}
            disabled={isDeleting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="ویرایش آدرس"
          >
            <Edit2 size={17} aria-hidden="true" />
          </motion.button>
          <motion.button
            onClick={() => onDelete(address.id)}
            disabled={isDeleting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="حذف آدرس"
          >
            {isDeleting ? (
              <Loader2 size={17} aria-hidden="true" className="animate-spin text-rose-500" />
            ) : (
              <Trash2 size={17} aria-hidden="true" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Address Content */}
      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin size={16} aria-hidden="true" className="shrink-0 mt-1 text-slate-400" />
          <p className="text-sm leading-7 text-slate-700 flex-1 min-w-0 break-words">{address.address}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-medium">کد پستی:</span>
          <span className="font-bold text-slate-900 font-mono" dir="ltr">{address.zip_code}</span>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="mt-4 h-0.5 bg-gradient-to-r from-indigo-500/20 to-transparent rounded-full" aria-hidden="true" />
    </motion.li>
  );
}