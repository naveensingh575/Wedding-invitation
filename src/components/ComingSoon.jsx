import React from 'react';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden bg-gradient-to-b from-[#3b0712] via-[#1a0307] to-[#0d0104] text-[#fce7f3]">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Auspicious Badge */}
      <header className="w-full max-w-2xl text-center z-10 pt-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold tracking-widest shadow-lg">
          <span>✨</span>
          <span>॥ श्री गणेशाय नमः ॥</span>
          <span>✨</span>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="w-full max-w-xl my-auto py-8 z-10">
        <div className="bg-[#2b0811]/75 backdrop-blur-md rounded-3xl p-6 sm:p-10 text-center relative border border-amber-500/30 shadow-2xl overflow-hidden">
          
          {/* Top Decorative Ring */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 p-0.5 shadow-xl">
            <div className="w-full h-full rounded-full bg-amber-950 flex items-center justify-center text-2xl sm:text-3xl">
              💍
            </div>
          </div>

          {/* Couple Names & Hashtag */}
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Naveen <span className="text-rose-500 font-sans">❤️</span> Manisha
          </h1>
          <div className="inline-block px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-bold tracking-widest mb-6">
            #Navisha
          </div>

          {/* Divider */}
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6 opacity-60" />

          {/* Maintenance / Coming Soon Badge */}
          <div className="space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest animate-pulse">
              ⏳ Temporary Maintenance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-tight">
              Digital Invitation Opening Soon!
            </h2>
            <p className="text-base sm:text-lg text-rose-200/90 leading-relaxed pt-1 font-serif">
              पावन विवाह आमंत्रण वेब पोर्टल शीघ्र ही उपलब्ध होगा।
            </p>
            <p className="text-xs sm:text-sm text-amber-200/70 font-sans leading-relaxed max-w-md mx-auto">
              We are currently updating our wedding ceremony details & schedule. Please check back shortly!
            </p>
          </div>

          {/* Wedding Date & Location Badge */}
          <div className="mt-8 pt-6 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/20 text-amber-200">
              <div className="text-rose-400 font-bold text-[11px] uppercase tracking-wider mb-0.5">🗓️ Date</div>
              <div className="font-bold text-white">20 November 2026</div>
            </div>
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/20 text-amber-200">
              <div className="text-rose-400 font-bold text-[11px] uppercase tracking-wider mb-0.5">📍 Location</div>
              <div className="font-bold text-white">Badhra, Charkhi Dadri (HR)</div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-xl text-center z-10 space-y-2 pb-4">
        <p className="text-xs text-amber-200/80 font-sans">
          <span className="font-bold text-amber-300">Compliments:</span> Capt. Satyavir Singh & Luhach Family | Shri Jagvir Singh Sheoran & Sheoran Family
        </p>
        <p className="text-[11px] text-amber-400/50 font-mono tracking-wider">
          https://naveenwedsmanisha.online/
        </p>
      </footer>

    </div>
  );
}
