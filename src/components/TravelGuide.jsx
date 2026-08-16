import React from 'react';
import { Train, Car, Bus, Route, MapPin, Compass } from 'lucide-react';

export default function TravelGuide({ t, sideData }) {
  const activeSide = sideData || t.groom || t;
  const travelInfo = activeSide.travel || t.travel || {};
  const distances = travelInfo.distances || [
    { place: "Satnali Station (STNL)", dist: "10 KM", note: "Closest railway stop" },
    { place: "Loharu Junction (LHU)", dist: "17 KM", note: "Major rail junction" },
    { place: "Charkhi Dadri (CKD)", dist: "40 KM", note: "City connectivity" },
  ];

  return (
    <section id="travel" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Route className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>{travelInfo.badge || "Travel Route Guide"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {travelInfo.heading || "Best Routes to Venue & Locations"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
          {travelInfo.subheading || "Guest travel guidance & key location distances"}
        </p>
      </div>

      {/* Travel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Key Location Distances Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] mb-6 shadow-sm">
              <Compass className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {t.travel?.railwayTitle || "Location Distances"}
            </h3>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
              {distances.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--text-primary)] block">{item.place}</span>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.note}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] font-extrabold font-mono text-xs border border-[var(--badge-border)]">
                    {item.dist}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-6 pt-4 border-t border-[var(--border-gold)]">
            Taxis, auto-rickshaws, and private vehicles connect all surrounding stations smoothly.
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
              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <span className="font-bold text-[var(--accent-primary)] block">Route 1 (Delhi/NCR Highway):</span>
                <p className="text-[11px] text-[var(--text-primary)] mt-1 font-medium">
                  Delhi → Gurugram → Jhajjar → Charkhi Dadri → Badhra / Aryanagar
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                <span className="font-bold text-[var(--accent-primary)] block">Route 2 (Express Expressway):</span>
                <p className="text-[11px] text-[var(--text-primary)] mt-1 font-medium">
                  Gurugram → Satnali / Badhra Highway (Fastest smooth tarmac)
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-6 pt-4 border-t border-[var(--border-gold)]">
            Clean 4-lane highways with ample food stops and fuel stations.
          </p>
        </div>

        {/* By Haryana Roadways Bus Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] mb-6 shadow-sm">
              <Bus className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {t.travel?.busTitle || "By Haryana Roadways Bus"}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans mt-3 leading-relaxed">
              {t.travel?.busDesc || "Frequent direct Haryana Roadways buses available from Delhi, Gurugram, Jhajjar, and Rohtak to Charkhi Dadri & Badhra."}
            </p>

            {/* Desi Pickup Humor Note */}
            <div className="mt-4 p-4 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] shadow-sm">
              <p className="text-xs font-bold text-[var(--accent-primary)] mb-1">
                🌸 {t.travel?.desiDostNote || "Desi Pickup Assistance:"}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] font-sans leading-relaxed">
                "{t.travel?.desiPickupText || "Once you reach the bus stand, give us a call — our family will be there with flower garlands to welcome you!"}"
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-6 pt-4 border-t border-[var(--border-gold)]">
            Continuous bus connectivity from early morning 05:00 AM to 10:00 PM.
          </p>
        </div>

      </div>
    </section>
  );
}
