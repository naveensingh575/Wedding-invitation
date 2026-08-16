import React from 'react';
import { Heart, Share2, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ t, isBrideSide }) {
  const shareText = encodeURIComponent(
    isBrideSide
      ? "You are cordially invited to the Wedding Ceremony of Manisha Sheoran & Naveen Luhach (#Navisha) on 20th Nov 2026 at Arya Nagar, Charkhi Dadri! Invitation from Shri Jagvir Singh Sheoran & Sheoran Family. View digital invitation card & map locations: "
      : "You are cordially invited to the Wedding Ceremony of Naveen Luhach & Manisha Sheoran (#Navisha) on 20th Nov 2026 at Nandha ki Dhani, Badhra, Charkhi Dadri! Invitation from Hon. Capt. Satyavir Singh & Luhach Family. View digital invitation card & map locations: "
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border-gold)] text-[var(--text-secondary)] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden theme-transition">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Inviter & Host Info */}
        <div className="space-y-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            {isBrideSide
              ? "Shri Jagvir Singh Sheoran & Sheoran Family"
              : "Hon. Capt. Satyavir Singh & Luhach Family"}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            {isBrideSide
              ? "Solicit your gracious presence and blessings on the auspicious occasion of the wedding ceremony of our beloved daughter Ku. Manisha Sheoran with Chi. Naveen Luhach."
              : "Solicit your gracious presence and blessings on the auspicious occasion of the wedding ceremony of our beloved son Naveen Luhach with Manisha Sheoran."}
          </p>
          <div className="pt-2 text-xs font-semibold text-[var(--accent-primary)] flex items-center space-x-2">
            <MapPin className="w-4 h-4 shrink-0 text-[var(--accent-gold)]" />
            <span>
              {isBrideSide
                ? "Arya Nagar, Charkhi Dadri City, Distt. Charkhi Dadri (Haryana) — 127306"
                : "Vill. Nandha Ki Dhani, Badhra, Charkhi Dadri (Haryana) — 127308"}
            </span>
          </div>
        </div>

        {/* Key Dates Summary */}
        <div className="space-y-3">
          <h4 className="font-serif text-base font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Important Dates & Ceremonies
          </h4>
          <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-sans">
            {isBrideSide ? (
              <>
                <li>• <strong className="text-[var(--text-primary)]">16 Nov 2026:</strong> Nimantran & Griha Aagaman</li>
                <li>• <strong className="text-[var(--text-primary)]">17 Nov 2026:</strong> Ban & Haldi Ceremony</li>
                <li>• <strong className="text-[var(--text-primary)]">18 Nov 2026:</strong> Mehndi Utsav & Sangeet</li>
                <li>• <strong className="text-[var(--text-primary)]">19 Nov 2026:</strong> Bhaat & Lagan (भात एवं लगन)</li>
                <li>• <strong className="text-[var(--text-primary)]">20 Nov 2026:</strong> Barat Swagat, Jaimala & Vivah</li>
              </>
            ) : (
              <>
                <li>• <strong className="text-[var(--text-primary)]">16 Nov 2026:</strong> 1st Ban & Groom's Haldi Ceremony</li>
                <li>• <strong className="text-[var(--text-primary)]">17 Nov 2026:</strong> Mehendi & Mahila Sangeet</li>
                <li>• <strong className="text-[var(--text-primary)]">19 Nov 2026:</strong> Bhaat & Shubh Lagan</li>
                <li>• <strong className="text-[var(--text-primary)]">20 Nov 2026:</strong> Ghurchhari, Barat & Shubh Vivah</li>
              </>
            )}
          </ul>
        </div>

        {/* Sharing & Contact Actions */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
              Share Digital Card
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-3">
              Send this wedding invitation card to relatives & friends on WhatsApp:
            </p>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start flex items-center space-x-1.5 text-xs text-[var(--accent-gold)] hover:underline font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[var(--border-gold)]/60 text-center text-xs text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
        <p>
          {isBrideSide
            ? "With Best Compliments from Sheoran Family & All Relatives"
            : "With Best Compliments from Luhach Family & All Relatives"}
        </p>
        <p className="flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for Naveen & Manisha (#Navisha)</span>
        </p>
      </div>
    </footer>
  );
}
