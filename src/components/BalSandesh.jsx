import React from 'react';
import { Smile } from 'lucide-react';

export default function BalSandesh({ t }) {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="relative group rounded-3xl p-6 sm:p-8 glass-wedding-card border border-[var(--border-gold)] shadow-lg overflow-hidden text-center flex flex-col items-center">
        
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />

        {/* Top Kid Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider mb-4">
          <Smile className="w-4 h-4 text-[var(--accent-gold)]" />
          <span>{t.balSandesh?.badge || "बाल संदेश एवं बाल हठ"}</span>
        </div>

        {/* Quote Message */}
        <div className="my-2 max-w-2xl">
          <p className="font-hindi text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] leading-snug">
            "{t.balSandesh?.quote || "मेले प्यारे मामाजी नवीन के ब्याह में जलूल-जलूल (ज़रूर) आणा!"}"
          </p>
        </div>

        {/* Children Names */}
        <div className="mt-5 pt-4 border-t border-[var(--border-gold)] flex items-center justify-center space-x-3">
          <span className="text-lg">👦</span>
          <span className="font-serif text-base sm:text-lg font-bold text-[var(--accent-primary)]">
            {t.balSandesh?.children || "वेदांत एवं शिवांश"} (Vedant & Shivansh)
          </span>
          <span className="text-lg">🎈</span>
        </div>

      </div>
    </section>
  );
}
