import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { User, Mail, Edit2, X, Loader2, Check, AlertCircle } from "lucide-react";
import api from "../service/api";
import useAuth from "../hooks/AuthHook";
import useAlert from "../hooks/AlertHook";

const easing = [0.22, 1, 0.36, 1];

export default function ProfileSection() {
  const { user, setUser } = useAuth();
  const { setMessage, setTypeAlert } = useAlert();
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState(user?.full_name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "نام و نام خانوادگی الزامی است";
    }
    if (!email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "فرمت ایمیل نامعتبر است";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const res = await api.put("/accounts/api/v1/user/", { full_name: name, email });

      setUser((prev) => {
        const updatedUser = { ...prev, email: res.data.email, full_name: res.data.full_name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });

      setTypeAlert("success");
      setMessage("اطلاعات شما با موفقیت بروزرسانی شد");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setTypeAlert("error");
      setMessage(error.response?.data?.detail || "عملیات با خطا مواجه شد");
    } finally {
      setIsSaving(false);
    }
  }, [name, email, validateForm, setUser, setMessage, setTypeAlert]);

  const handleCancel = useCallback(() => {
    setName(user?.full_name ?? "");
    setEmail(user?.email ?? "");
    setErrors({});
    setIsEditing(false);
  }, [user]);

  const handleEdit = useCallback(() => {
    setErrors({});
    setIsEditing(true);
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return "؟";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Loading state
  if (!user) {
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
            <h2 className="text-lg font-bold text-slate-900">پروفایل من</h2>
            <p className="mt-1 text-sm text-slate-500">مدیریت اطلاعات حساب کاربری</p>
          </div>
          <div className="h-10 w-32 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easing }}
          className="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </motion.div>
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">پروفایل من</h2>
          <p className="mt-1 text-sm text-slate-500">مدیریت اطلاعات حساب کاربری</p>
        </div>
        {!isEditing && (
          <motion.button
            onClick={handleEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 shrink-0"
            aria-label="ویرایش پروفایل"
          >
            <Edit2 size={18} aria-hidden="true" />
            ویرایش پروفایل
          </motion.button>
        )}
      </div>

      {/* Profile Card */}
      <motion.div
        key={isEditing ? "edit" : "view"}
        initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.3, ease: easing }}
        className="rounded-3xl border border-slate-200 bg-white overflow-hidden"
      >
        {!isEditing ? (
          /* ==================== VIEW MODE ==================== */
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="size-24 sm:size-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)]">
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {getInitials(user.full_name)}
                  </span>
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-0 left-0 size-5 rounded-full bg-emerald-500 border-3 border-white" aria-label="آنلاین" />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0 text-center sm:text-start">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">{user.full_name || "بدون نام"}</h3>
                <p className="mt-1.5 text-sm text-slate-500">شناسه کاربری: <span className="font-mono text-slate-700" dir="ltr">#{user.id}</span></p>
              </div>

              {/* Edit Button in View Mode */}
              <div className="sm:ml-auto flex-shrink-0">
                <motion.button
                  onClick={handleEdit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Edit2 size={18} aria-hidden="true" />
                  ویرایش
                </motion.button>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />

            {/* Email Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-slate-50/50">
              <div className="flex items-center gap-3 shrink-0">
                <span className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-600">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">ایمیل</p>
                  <p className="text-sm font-medium text-slate-900 truncate max-w-xs sm:max-w-md" dir="ltr">{user.email || "ثبت نشده"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ==================== EDIT MODE ==================== */
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Avatar (non-editable, just for display) */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="size-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)]">
                  <span className="text-2xl font-bold text-white">
                    {getInitials(name)}
                  </span>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="full_name" className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <User size={17} aria-hidden="true" className="text-slate-400" />
                نام و نام خانوادگی <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="مثال: علی احمدی"
                className={`w-full h-11 rounded-xl border px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  errors.name
                    ? "border-rose-300 bg-rose-50 focus:border-rose-500"
                    : "border-slate-200 bg-white focus:border-indigo-500"
                }`}
                dir="rtl"
                autoFocus
                required
                disabled={isSaving}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="flex items-center gap-1.5 text-sm text-rose-600" role="alert">
                  <AlertCircle size={14} aria-hidden="true" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <Mail size={17} aria-hidden="true" className="text-slate-400" />
                ایمیل <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="مثال: ali@example.com"
                className={`w-full h-11 rounded-xl border px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dir-ltr ${
                  errors.email
                    ? "border-rose-300 bg-rose-50 focus:border-rose-500"
                    : "border-slate-200 bg-white focus:border-indigo-500"
                }`}
                dir="ltr"
                required
                disabled={isSaving}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="flex items-center gap-1.5 text-sm text-rose-600" role="alert">
                  <AlertCircle size={14} aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-200">
              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} aria-hidden="true" className="animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Check size={16} aria-hidden="true" />
                    ذخیره تغییرات
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={16} aria-hidden="true" />
                لغو
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}