import React from "react";

export function Tabs({ tabs, activeKey, onChange }) {
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
    </div>
  );
}

export default Tabs;
