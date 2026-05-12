function ProfileSection() {
  // placeholder form (non-functional) for user info
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">اطلاعات من</h2>
      <div className="flex flex-col gap-3 max-w-md">
        <label className="flex flex-col text-sm">
          نام:
          <input className="mt-2 p-2 border-gray-300 focus:outline-gray-400  border rounded" type="text" dir="rtl" defaultValue="کاربر نمونه" />
        </label>
        <label className="flex flex-col text-sm">
          ایمیل:
          <input className="mt-2 p-2 border-gray-300 focus:outline-gray-400 border rounded" type="email" defaultValue="user@example.com" />
        </label>
        <div className="flex gap-3">
          <button className="mt-2 cursor-pointer px-3 py-2 bg-sky-600 text-white rounded">بروزرسانی اطلاعات</button>
          {/* <button className="mt-2 w-36 px-3 py-2 border rounded">تغییر رمز عبور</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;