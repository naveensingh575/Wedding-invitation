import React, { useState } from 'react';
import { Sparkles, Upload, Eye, X, Plus } from 'lucide-react';

export default function GallerySection({ customCouplePhoto, t }) {
  const [userPhotos, setUserPhotos] = useState([]);
  const [activeLightbox, setActiveLightbox] = useState(null);

  const initialDoodles = [
    {
      id: 'couple',
      title: 'Naveen & Manisha (#Navisha)',
      subtitle: 'Couple Wedding Portrait Artwork',
      src: customCouplePhoto || '/assets/real_photos/couple_common.jpg',
      tag: 'Couple Portrait',
    },
    {
      id: 'groom_haldi',
      title: 'Groom Naveen Haldi & Ban',
      subtitle: 'Turmeric Ubtan & Traditional Rituals',
      src: '/assets/doodles/groom_haldi.jpg',
      tag: '16 Nov • Haldi',
    },
    {
      id: 'mehendi',
      title: 'Mehendi & Mahila Sangeet',
      subtitle: 'Groom Side Dholak Beats & Lok Geet',
      src: '/assets/doodles/mehendi.svg',
      tag: '17 Nov • Sangeet',
    },
    {
      id: 'lagan',
      title: 'Shubh Lagan Patrika Scroll',
      subtitle: 'Chi. Naveen weds Ku. Manisha',
      src: '/assets/doodles/lagan.svg',
      tag: '19 Nov • Lagan',
    },
  ];

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotos((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            title: file.name.replace(/\.[^/.]+$/, ""),
            subtitle: 'Uploaded Photo',
            src: reader.result,
            tag: 'Memory',
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const allGalleryItems = [...initialDoodles, ...userPhotos];

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
          {t.gallery?.subheading || "Custom Haryanvi AI Doodles & Couple Portraits for Naveen & Manisha (#Navisha). You can also upload your own memories!"}
        </p>
      </div>

      {/* Upload Bar Widget */}
      <div className="mb-10 glass-wedding-card rounded-3xl p-5 sm:p-6 border border-[var(--border-gold)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-gold)]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
              {t.gallery?.shareTitle || "Share Your Photos & Memories"}
            </h4>
            <p className="text-xs text-[var(--text-muted)]">
              {t.gallery?.shareDesc || "Upload couple photos or event memories to preview in the gallery"}
            </p>
          </div>
        </div>

        <label className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white font-bold text-xs cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 shrink-0">
          <Plus className="w-4 h-4" />
          <span>{t.gallery?.uploadBtn || "Upload Photos"}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allGalleryItems.map((item) => (
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

            <div className="w-full aspect-square sm:aspect-video rounded-2xl overflow-hidden border border-[var(--border-gold)] bg-black flex items-center justify-center p-2">
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
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
