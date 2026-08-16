import React from 'react';
import { Train, Car, Bus, Route, PhoneCall, Smile } from 'lucide-react';

export default function TravelGuide({ t }) {
  return (
    <section id="travel" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Route className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>{t.travel?.badge || "Travel Route Guide"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {t.travel?.heading || "Best Routes to Vill. Nandha ki Dhani, Badhra"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
          {t.travel?.subheading || "Guest travel guidance & closest railway stations"}
        </p>
      </div>

      {/* Travel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Nearest Railway Stations Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] mb-6 shadow-sm">
              <Train className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {t.travel?.railwayTitle || "Nearest Railway Stations"}
            </h3>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
              <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <span className="font-bold text-[var(--text-primary)]">1. Satnali Railway Station (STNL):</span>
                <p className="text-[11px] text-[var(--accent-primary)] font-semibold mt-0.5">~10 KM (Closest train stop to Nandha)</p>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <span className="font-bold text-[var(--text-primary)]">2. Loharu Junction (LHU):</span>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">~17 KM (Major junction connected to Delhi & Jaipur)</p>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <span className="font-bold text-[var(--text-primary)]">3. Charkhi Dadri Station (CKD):</span>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">~40 KM (Direct trains from Delhi Sarai Rohilla)</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-6 pt-4 border-t border-[var(--border-gold)]">
            Cabs & vehicles are readily available from Satnali & Loharu stations to Nandha ki Dhani.
          </p>
        </div>

        {/* By Road Highway Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] mb-6 shadow-sm">
              <Car className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {t.travel?.roadTitle || "By Road Highways (Car & Taxi)"}
            </h3>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
              <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <strong className="text-[var(--accent-primary)] block mb-1">Route 1 (Via Jhajjar):</strong>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Delhi → Gurugram → Jhajjar → Charkhi Dadri → Badhra → Nandha ki Dhani (~135 KM)
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <strong className="text-[var(--accent-gold)] block mb-1">Route 2 (Best Express Highway):</strong>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Gurugram → Satnali / Badhra Highway (Fastest & smoothest road connection)
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-6 pt-4 border-t border-[var(--border-gold)]">
            Smooth 4-lane express highways connecting Gurugram/Delhi NCR to Badhra Tehsil.
          </p>
        </div>

        {/* Haryana Roadways & Desi Welcoming Note Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] mb-6 shadow-sm">
              <Bus className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {t.travel?.busTitle || "By Haryana Roadways Bus"}
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs text-[var(--text-secondary)] font-sans leading-relaxed shadow-sm">
              {t.travel?.busDesc || "Frequent direct Haryana Roadways buses available from Delhi, Gurugram, Jhajjar, and Rohtak to Badhra Bus Stand."}
            </div>

            {/* Funny & Heartwarming Welcome Note */}
            <div className="mt-4 p-4 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-[var(--accent-primary)]">
                <Smile className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{t.travel?.desiDostNote || "नंधा बस स्टैंड पै स्वागत व साधन:"}</span>
              </div>
              <p className="font-hindi text-[13px] text-[var(--text-primary)] leading-snug">
                "{t.travel?.desiPickupText || "नंधा बस स्टैंड पै उतर कै एक फोन घुमा दियो या लिफ्ट माँग लियो — मारे छोरे नंधा स्टैंड पै फूल-माला लेकै थारे स्वागत खातर तय्यार खड़े पावैंगे! 🌸😄"}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-gold)] flex items-center space-x-2 text-xs text-[var(--text-secondary)]">
            <PhoneCall className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
            <span className="font-medium">Call family on arrival for pickup!</span>
          </div>
        </div>

      </div>
    </section>
  );
}
