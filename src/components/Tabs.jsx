import React from "react";
import useAuth from "../hooks/AuthHook";
import useAlert from "../hooks/AlertHook";
import { useNavigate } from "react-router-dom";

export function Tabs({ tabs, activeKey, onChange }) {

    const {logout} = useAuth();
    const {setMessage, setTypeAlert} = useAlert();
    const navigate = useNavigate();

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={
            "px-4 py-2 rounded-lg cursor-pointer font-semibold text-sky-600 bg-sky-50 hover:translate-y-[-2px] transition-transform " +
            (t.key === activeKey ? "shadow-lg bg-gradient-to-r from-sky-100 to-white translate-y-[-4px]" : "")
          }
        >
          {t.label}
        </button>
      ))}

      <button

        onClick={()=>{logout(); setTypeAlert("info"); setMessage("از حساب کاربری خود خارج شدید");navigate('/')}}

          className={
            "px-4 py-2 rounded-lg cursor-pointer font-semibold text-red-600 bg-red-50 hover:translate-y-[-2px] transition-transform "
          }
        >
          خروج
        </button>
    </div>
  );
}

export default Tabs;
