import React, { useState } from 'react';
import { Sparkles, Clock, MapPin, CalendarPlus, ExternalLink } from 'lucide-react';

export default function ProgramSchedule({ t, sideData }) {
  const [flippedCards, setFlippedCards] = useState({});

  const activeData = sideData || t.groom || t;
  const events = activeData.events || t.events || [];
  const lineages = activeData.lineages || t.lineages || [];

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isBride = !!activeData.isBride;

  // Google Calendar Templates
  const calendarLinks = {
    0: isBride
      ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ban+%26+Haldi+-+Manisha+%28%23Navisha%29&dates=20261117T043000Z/20261117T123000Z&details=Haldi+Ceremony+for+Manisha.&location=Arya+Nagar%2C+Badhra"
      : "https://calendar.google.com/calendar/render?action=TEMPLATE&text=1st+Ban+%26+Haldi+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261116T043000Z/20261116T123000Z&details=Haldi+Ceremony+for+Naveen+%26+Manisha.+Invitation+from+Luhach+%26+Sheoran+Family.&location=Badhra%2C+Charkhi+Dadri",
    1: isBride
      ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehendi+Utsav+-+Manisha+%28%23Navisha%29&dates=20261118T103000Z/20261118T173000Z&details=Mehendi+Utsav.+Sheoran+Family.&location=Arya+Nagar%2C+Badhra"
      : "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehendi+%26+Sangeet+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261117T103000Z/20261117T173000Z&details=Mehendi+%26+Mahila+Sangeet.+Luhach+%26+Sheoran+Family.&location=Badhra%2C+Charkhi+Dadri",
    2: isBride
      ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bhaat+%26+Mandap+Pujan+-+Manisha+%28%23Navisha%29&dates=20261120T053000Z/20261120T173000Z&details=Bhaat+Feast+and+Mandap+Pujan+Ceremony+for+Manisha.&location=Arya+Nagar%2C+Badhra"
      : "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bhaat+%26+Shubh+Lagan+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261119T053000Z/20261119T173000Z&details=Bhaat+Feast+and+Shubh+Lagan+Patrika+Ceremony+for+Naveen+%26+Manisha.&location=Charkhi+Dadri",
    3: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Barat+%26+Shubh+Vivah+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261120T093000Z/20261120T223000Z&details=Ghurchhari%2C+Barat%2C+Varmala+and+Sacred+Pheras+for+Naveen+%26+Manisha.&location=Arya+Nagar%2C+Charkhi+Dadri%2C+Haryana",
  };

  return (
    <section id="program" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>Vivah Karyakram & Heritage</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {t.nav?.schedule || "Program Schedule"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
          {activeData.heroSubheading}
        </p>
      </div>

      {/* Symmetrical 2x2 Timeline 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => {
          const isFlipped = !!flippedCards[index];
          const lineage = lineages[index] || null;

          return (
            <div
              key={index}
              className="relative min-h-0 sm:min-h-[580px] perspective-1000 group"
            >
              <div
                className={`w-full h-full duration-700 transform-style-3d relative ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ============================================================
                    FRONT SIDE: EVENT CARD
                ============================================================ */}
                <div className="w-full h-full backface-hidden glass-wedding-card rounded-3xl p-6 sm:p-7 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between overflow-hidden bg-[var(--bg-elevated)]/95">
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    
                    {/* Top Row: Date on Left Corner, Day on Right Corner */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-gold)] w-full">
                      <span className="px-3.5 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-xs font-extrabold shadow-sm font-sans tracking-wide shrink-0">
                        🗓️ {event.date}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--badge-border)] text-xs font-extrabold font-sans shadow-sm shrink-0 ml-auto text-right">
                        {event.day}
                      </span>
                    </div>

                    {/* Middle Row: Unclipped Full Doodle Artwork & Event Info */}
                    <div className="my-4 flex flex-col sm:flex-row items-center gap-5">
                      {/* Responsive Full Image Container (No Mobile Clipping) */}
                      <div className="w-full sm:w-36 h-auto sm:h-36 rounded-2xl overflow-hidden border-2 border-[var(--border-gold)] shadow-md bg-black/10 shrink-0 relative group">
                        <img
                          src={event.doodle}
                          alt={event.title}
                          className="w-full h-auto sm:h-full object-contain sm:object-cover hover:scale-105 transition-transform duration-500 rounded-2xl max-h-none"
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                      </div>

                      {/* Titles & Highlights */}
                      <div className="flex-1 text-left w-full sm:w-auto">
                        <div className="inline-block px-2.5 py-0.5 rounded-md bg-[var(--badge-bg)] text-[10px] font-bold text-[var(--accent-primary)] border border-[var(--badge-border)] mb-1.5">
                          {event.highlight}
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] font-sans mt-2 line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Time & Venue Details */}
                    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-gold)] text-xs text-[var(--text-secondary)] space-y-1.5 font-sans">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                        <span className="font-semibold text-[var(--text-primary)]">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Action Bar: 1-Tap Google Calendar & Origin Story Flip */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-gold)] flex items-center justify-between gap-3">
                      <a
                        href={calendarLinks[index] || calendarLinks[3]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>Add to Calendar</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>

                      <button
                        onClick={() => toggleFlip(index)}
                        className="py-2.5 px-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1 transition-all"
                      >
                        <span>Origin Story</span>
                        <span>📖</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* ============================================================
                    BACK SIDE: 3D CULTURAL LINEAGE & ORIGIN STORY CARD
                ============================================================ */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-wedding-card rounded-3xl p-6 sm:p-7 border-2 border-[var(--accent-gold)] shadow-2xl flex flex-col justify-between overflow-hidden bg-[var(--bg-card)] text-left">
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-gold)]">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">📜</span>
                        <span className="font-serif text-sm font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                          {t.lineageHeader || "Cultural Heritage & Origin"}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    {lineage ? (
                      <div className="my-4 space-y-3">
                        <div className="p-3 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)]">
                          <span className="text-[10px] uppercase font-bold text-[var(--accent-primary)] tracking-wider block">
                            Cultural Roots:
                          </span>
                          <span className="text-xs font-serif font-bold text-[var(--text-primary)]">
                            {lineage.origin}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-[var(--text-primary)] block mb-1">
                            Vedic & Folk Story:
                          </span>
                          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                            {lineage.story}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-gold)] text-[11px] text-[var(--text-primary)] italic">
                          <span className="font-bold not-italic text-[var(--accent-gold)]">Spiritual Essence: </span>
                          "{lineage.significance}"
                        </div>
                      </div>
                    ) : (
                      <div className="my-6 text-center text-xs text-[var(--text-muted)]">
                        Haryanvi Vedic Rituals & Traditions
                      </div>
                    )}

                    {/* Back Button to Flip Front */}
                    <button
                      onClick={() => toggleFlip(index)}
                      className="w-full py-3 px-4 rounded-2xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
                    >
                      <span>← {t.backBtn || "Back to Program Details"}</span>
                    </button>

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
