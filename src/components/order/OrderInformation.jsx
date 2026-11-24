import { CreditCard, MapPin, UserRound } from "lucide-react";
import OrderAddressItem from "../OrderAddressItem";

function getRecipient(address) {
  return address?.recipient_name ?? address?.full_name ?? address?.name ?? address?.recipient?.full_name ?? "";
}

export default function OrderInformation({
  order,
  addresses = [],
  selectedAddress,
  onSelectAddress,
  isPending,
}) {
  const orderAddress = order?.address_details ?? order?.address ?? null;
  const selectedSavedAddress = addresses.find((address) => address.id === selectedAddress) ?? null;
  const shippingAddress = orderAddress || selectedSavedAddress;
  const recipient = getRecipient(shippingAddress) || getRecipient(order);
  const paymentMethod = order?.payment_method ?? order?.payment_type ?? order?.method ?? "";

  return (
    <div className="space-y-4">
      <section aria-labelledby="shipping-info-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.55)] sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 id="shipping-info-heading" className="text-sm font-black text-slate-900">آدرس ارسال</h2>
            <p className="mt-1 text-[10px] text-slate-500">نشانی تحویل سفارش</p>
          </div>
        </div>

        {shippingAddress ? (
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-900">{shippingAddress.title || "نشانی ثبت‌شده"}</p>
            {recipient && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <UserRound size={14} aria-hidden="true" className="text-slate-400" />
                {recipient}
              </p>
            )}
            <p className="mt-2 text-xs leading-7 text-slate-600">{shippingAddress.address || "جزئیات نشانی در دسترس نیست."}</p>
            {shippingAddress.zip_code && (
              <p className="mt-2 text-[10px] text-slate-500">
                کد پستی: <span dir="ltr" className="font-bold text-slate-700">{shippingAddress.zip_code}</span>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-xs leading-6 text-slate-500">
            {isPending ? "برای ادامه، یکی از نشانی‌های ذخیره‌شده را انتخاب کنید." : "اطلاعات نشانی ارسال در دسترس نیست."}
          </p>
        )}

        {isPending && addresses.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-3 text-[11px] font-bold text-slate-600">انتخاب نشانی تحویل</p>
            <ul className="space-y-2">
              {addresses.map((address) => (
                <OrderAddressItem
                  key={address.id}
                  address={address}
                  isSelected={selectedAddress == address.id}
                  onClickHandler={onSelectAddress}
                />
              ))}
            </ul>
          </div>
        )}
      </section>

      <section aria-labelledby="payment-info-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.55)] sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <CreditCard size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 id="payment-info-heading" className="text-sm font-black text-slate-900">اطلاعات پرداخت</h2>
            <p className="mt-1 text-[10px] text-slate-500">روش و وضعیت پرداخت سفارش</p>
          </div>
        </div>
        <dl className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-xs">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-500">روش پرداخت</dt>
            <dd className="font-bold text-slate-800">{paymentMethod || "اطلاعات ثبت نشده"}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-500">وضعیت پرداخت</dt>
            <dd className="font-bold text-slate-800">{order?.status === "Pending" ? "در انتظار پرداخت" : "ثبت‌شده"}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
