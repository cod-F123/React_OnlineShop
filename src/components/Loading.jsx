import React from 'react';

function Loading(){
    return (
        <div className="flex items-center justify-center p-6">
            <div className="relative w-28 h-28 flex flex-col items-center">
                <svg className="w-28 h-28" viewBox="0 0 120 120" aria-hidden="true">
                    <defs>
                        <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                        <linearGradient id="g2" x1="100%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>

                    <g transform="translate(60,60)">
                        <circle cx="0" cy="0" r="44" stroke="#edf2f7" strokeWidth="8" fill="none" />

                        <circle className="ring ring-1" cx="0" cy="0" r="44" stroke="url(#g1)" strokeWidth="8" strokeLinecap="round" strokeDasharray="138 200" fill="none" />
                        <circle className="ring ring-2" cx="0" cy="0" r="30" stroke="url(#g2)" strokeWidth="6" strokeLinecap="round" strokeDasharray="94 160" fill="none" />

                        <circle className="center-dot" cx="0" cy="0" r="6" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
                    </g>
                </svg>

                <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-gray-700">در حال بارگذاری...</div>
                    <div className="text-xs text-gray-400 mt-1">لطفاً شکیبا باشید</div>
                </div>

                <style>{`
                    .ring-1{ transform-origin: 60px 60px; animation: spin1 1.6s linear infinite; }
                    .ring-2{ transform-origin: 60px 60px; animation: spin2 2.2s linear infinite; }
                    .center-dot{ animation: pulse 1.6s ease-in-out infinite; }

                    @keyframes spin1{ from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
                    @keyframes spin2{ from{ transform: rotate(360deg) } to{ transform: rotate(0deg) } }
                    @keyframes pulse{ 0%{ transform: scale(1); opacity:1 } 50%{ transform: scale(1.35); opacity:0.9 } 100%{ transform: scale(1); opacity:1 } }

                    /* subtle dash movement */
                    .ring-1{ stroke-dashoffset: 0; animation: dash1 1.6s linear infinite, spin1 1.6s linear infinite; }
                    .ring-2{ stroke-dashoffset: 0; animation: dash2 2.2s linear infinite, spin2 2.2s linear infinite; }

                    @keyframes dash1{ 0%{ stroke-dashoffset: 0 } 50%{ stroke-dashoffset: -60 } 100%{ stroke-dashoffset: -120 } }
                    @keyframes dash2{ 0%{ stroke-dashoffset: 0 } 50%{ stroke-dashoffset: 40 } 100%{ stroke-dashoffset: 80 } }
                `}</style>
            </div>
        </div>
    )
};

export default Loading;