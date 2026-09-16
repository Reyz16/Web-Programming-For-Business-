import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Sparkles, Droplets, Wind, ShieldCheck, Clock } from 'lucide-react';

export const ThreeDLaundryMachine: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [cycle, setCycle] = useState<'quick' | 'eco' | 'silk' | 'steam'>('quick');
  const [drumRotation, setDrumRotation] = useState(0);
  const [waterLevel, setWaterLevel] = useState(48); // %
  const [timerSeconds, setTimerSeconds] = useState(42);

  // Animated spin drum
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setDrumRotation((prev) => (prev + (cycle === 'quick' ? 8 : 4)) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isRunning, cycle]);

  // Countdown simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => (prev > 1 ? prev - 1 : 60));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000 select-none" id="hero-3d-machine-container">
      {/* Outer 3D Chassis */}
      <div 
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F4F5F7] to-[#E2E6EB] p-6 rounded-3xl border border-stone-300/80 shadow-2xl transition-transform duration-500 hover:rotate-y-3"
        style={{
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -4px 6px rgba(0, 0, 0, 0.05)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Machine Brand & Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-200/90 pb-4 mb-5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-serif text-sm font-semibold tracking-wide text-slate-800">
              pickuplaundry <span className="text-blue-600 font-sans text-xs">V9-PRO</span>
            </span>
          </div>

          {/* LED Digital Display */}
          <div className="bg-slate-900 text-cyan-400 font-mono px-3 py-1 rounded-md text-xs tracking-wider flex items-center gap-2 shadow-inner border border-slate-700">
            <Clock className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</span>
            <span className="text-[10px] text-cyan-300/70 uppercase">{cycle}</span>
          </div>
        </div>

        {/* The 3D Porthole Door (Glass Window) */}
        <div className="relative flex items-center justify-center my-2">
          {/* Chrome Door Ring (Metallic Outer Bezel) */}
          <div 
            className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2.5 bg-gradient-to-tr from-slate-400 via-stone-100 to-slate-300 shadow-xl border-2 border-stone-300/60 flex items-center justify-center relative"
            style={{
              boxShadow: '0 15px 30px rgba(0,0,0,0.15), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -4px 6px rgba(0,0,0,0.2)',
            }}
          >
            {/* Dark Inner Drum Chamber */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0A0F1D] overflow-hidden relative flex items-center justify-center border-4 border-slate-800">
              {/* Water Wave Effect */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-500/25 backdrop-blur-[1px] transition-all duration-700"
                style={{ height: `${waterLevel}%` }}
              >
                {/* Bubble Particles */}
                {isRunning && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <span className="absolute bottom-1 left-1/4 w-2 h-2 rounded-full bg-white/70 animate-bounce duration-1000" />
                    <span className="absolute bottom-3 left-1/2 w-3 h-3 rounded-full bg-cyan-200/60 animate-ping duration-700" />
                    <span className="absolute bottom-2 right-1/4 w-2.5 h-2.5 rounded-full bg-white/50 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Stainless Steel Drum Perforations & Spinning Clothes */}
              <div 
                className="w-40 h-40 rounded-full border border-dashed border-slate-600/50 flex items-center justify-center relative transition-transform"
                style={{
                  transform: `rotate(${drumRotation}deg)`,
                  transition: isRunning ? 'none' : 'transform 0.5s ease-out'
                }}
              >
                {/* Simulated colorful garments inside the drum */}
                <div className="absolute w-12 h-10 rounded-lg bg-blue-500/90 shadow-md transform -translate-x-4 -translate-y-3 rotate-12" />
                <div className="absolute w-10 h-12 rounded-lg bg-amber-400/90 shadow-md transform translate-x-5 -translate-y-2 -rotate-45" />
                <div className="absolute w-14 h-9 rounded-lg bg-rose-400/90 shadow-md transform translate-x-1 translate-y-5 rotate-35" />
                <div className="absolute w-11 h-11 rounded-lg bg-emerald-400/90 shadow-md transform -translate-x-5 translate-y-3 -rotate-12" />

                {/* Center Drum Hub */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-500 via-stone-200 to-slate-400 shadow-md border border-slate-700 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-slate-900" />
                </div>
              </div>

              {/* Glass Reflection Arc (Curved Specular Glare) */}
              <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            </div>

            {/* Porthole Handle */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-r from-stone-300 to-stone-400 rounded-r-md shadow-md border border-stone-400 cursor-pointer" />
          </div>
        </div>

        {/* Machine Control Panel & Buttons */}
        <div className="mt-5 pt-3 border-t border-stone-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Pilihan Mode Cuci Otomatis
            </span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              id="btn-toggle-drum"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
            >
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
              {isRunning ? 'Pause Mesin' : 'Mulai Cuci'}
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { key: 'quick', label: 'Quick 15m', icon: Clock },
              { key: 'eco', label: 'Eco Wash', icon: Droplets },
              { key: 'silk', label: 'Delicates', icon: Wind },
              { key: 'steam', label: 'Steam 60°', icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              const active = cycle === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setCycle(item.key as any);
                    if (item.key === 'quick') setWaterLevel(45);
                    if (item.key === 'eco') setWaterLevel(60);
                    if (item.key === 'silk') setWaterLevel(50);
                    if (item.key === 'steam') setWaterLevel(70);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-[11px] font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mb-1 ${active ? 'text-white' : 'text-stone-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating 3D Badge 1: Nearest Partner */}
      <div 
        className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200/90 shadow-xl flex items-center space-x-3 transition-transform hover:scale-105 duration-300"
        style={{
          boxShadow: '0 12px 25px -4px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.02)',
          transform: 'translateZ(30px)',
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Mitra Terverifikasi</div>
          <div className="text-xs font-semibold text-stone-900">Klinik Wangi Express (0.8 km)</div>
          <div className="text-[11px] text-stone-500">Rating 4.9 ★ (3,800+ Pesanan)</div>
        </div>
      </div>

      {/* Floating 3D Badge 2: Dispatch Courier Ready */}
      <div 
        className="absolute -bottom-4 -right-4 sm:-right-6 bg-slate-900 text-white p-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-slate-700 transition-transform hover:scale-105 duration-300"
        style={{
          boxShadow: '0 12px 25px -4px rgba(15,23,42,0.3)',
          transform: 'translateZ(40px)',
        }}
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Driver Siap Jemput</div>
          <div className="text-xs font-semibold">Tiba dalam 15-20 Menit</div>
          <div className="text-[10px] text-slate-400">Timbang digital langsung di depan Anda</div>
        </div>
      </div>
    </div>
  );
};
