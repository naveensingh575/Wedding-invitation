import React, { useState } from 'react';
import { Sparkles, Eye, X } from 'lucide-react';

export default function GallerySection({ customCouplePhoto, t }) {
  const [activeLightbox, setActiveLightbox] = useState(null);

  const initialDoodles = [
    {
      id: 'groom_haldi',
      title: 'Groom Naveen Haldi & Ban',
      subtitle: 'Turmeric Ubtan & Traditional Rituals',
      src: '/assets/doodles/groom_haldi.jpg',
      tag: '16 Nov • Groom Haldi',
    },
    {
      id: 'groom_mehendi',
      title: 'Groom Mehendi & Mahila Sangeet',
      subtitle: 'Groom Side Dholak Beats & Lok Geet',
      src: '/assets/doodles/groomMahendi.png',
      tag: '17 Nov • Groom Sangeet',
    },
    {
      id: 'bride_haldi',
      title: 'Bride Manisha Haldi Ceremony',
      subtitle: 'Turmeric Ubtan & Traditional Rituals',
      src: '/assets/doodles/haldi.jpg',
      tag: '19 Nov • Bride Haldi',
    },
    {
      id: 'bride_mehendi',
      title: 'Bride Manisha Mehendi Art',
      subtitle: 'Bridal Henna & Wedding Festivities',
      src: '/assets/doodles/bride_mahendi.png',
      tag: '19 Nov • Bride Mehendi',
    },
  ];

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>{t.gallery?.badge || "AI Doodles & Memory Gallery"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {t.gallery?.heading || "AI Doodle & Wedding Gallery"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
          Custom Haryanvi AI Doodles & Couple Portraits for Naveen & Manisha (#Navisha)
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialDoodles.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightbox(item)}
            className="group relative rounded-3xl overflow-hidden glass-wedding-card border border-[var(--border-gold)] hover:border-[var(--accent-gold)] transition-all duration-300 shadow-lg cursor-pointer aspect-square flex flex-col justify-end bg-black/5"
          >
            <img
              src={item.src}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

            {/* Tag Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 border border-[var(--border-gold)] text-[10px] font-bold text-[var(--accent-primary)] backdrop-blur-md z-10 shadow-sm">
              {item.tag}
            </div>

            {/* Hover Eye Icon */}
            <div className="absolute top-3 right-3 p-2 rounded-full bg-[var(--bg-elevated)] text-[var(--accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm">
              <Eye className="w-4 h-4" />
            </div>

            {/* Content Title Overlay */}
            <div className="relative p-4 z-10 text-white">
              <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-white/80 font-sans truncate">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full glass-wedding-card rounded-3xl p-4 border border-[var(--border-gold)] shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--accent-gold)] hover:text-white transition-all z-20 shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2">
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="px-3 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] text-xs font-bold border border-[var(--badge-border)]">
                {activeLightbox.tag}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-2">
                {activeLightbox.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                {activeLightbox.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
