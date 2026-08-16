import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CalendarPlus, ExternalLink, RotateCcw, BookOpen } from 'lucide-react';

export default function ProgramSchedule({ t }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Direct Google Calendar Links for Each Function
  const calendarLinks = {
    haldi: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=1st+Ban+%26+Haldi+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261116T043000Z/20261116T123000Z&details=Haldi+Ceremony+for+Naveen+Luhach.+Invitation+from+Hon.+Capt.+Satyavir+Singh+%26+Luhach+Family.&location=Vill.+Nandha+Ki+Dhani%2C+Badhra%2C+Charkhi+Dadri",
    mehendi: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehendi+%26+Sangeet+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261117T103000Z/20261117T173000Z&details=Mehendi+%26+Mahila+Sangeet+at+Groom%27s+House.+Hon.+Capt.+Satyavir+Singh+%26+Luhach+Family.&location=Vill.+Nandha+Ki+Dhani%2C+Badhra%2C+Charkhi+Dadri",
    bhaatLagan: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bhaat+%26+Shubh+Lagan+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261119T053000Z/20261119T173000Z&details=Bhaat+Feast+and+Shubh+Lagan+Patrika+Ceremony+for+Naveen+Luhach+%26+Manisha+Sheoran.+Hon.+Capt.+Satyavir+Singh+%26+Luhach+Family.&location=Vill.+Nandha+Ki+Dhani%2C+Badhra%2C+Charkhi+Dadri",
    baratVivah: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Barat+%26+Shubh+Vivah+-+Naveen+%26+Manisha+%28%23Navisha%29&dates=20261120T093000Z/20261120T223000Z&details=Ghurchhari+at+Nandha+ki+Dhani%2C+Barat+to+Arya+Nagar+Charkhi+Dadri%2C+Varmala+and+Sacred+Pheras+for+Naveen+%26+Manisha.&location=Arya+Nagar%2C+Charkhi+Dadri%2C+Haryana",
  };

  const getCalendarUrl = (index) => {
    switch (index) {
      case 0: return calendarLinks.haldi;
      case 1: return calendarLinks.mehendi;
      case 2: return calendarLinks.bhaatLagan;
      case 3: return calendarLinks.baratVivah;
      default: return calendarLinks.baratVivah;
    }
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
          {t.nav.schedule}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
          {t.heroSubheading}
        </p>
      </div>

      {/* Symmetrical 2x2 Timeline 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {t.events.map((event, index) => {
          const isFlipped = !!flippedCards[index];
          const lineage = t.lineages ? t.lineages[index] : null;

          return (
            <div
              key={index}
              className="relative min-h-[580px] perspective-1000 group"
            >
              <div
                className={`w-full h-full duration-700 transform-style-3d relative ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                
                {/* ============================================================
                    FRONT SIDE: Program Event Details & Calendar Button
                ============================================================ */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden glass-wedding-card border border-[var(--border-gold)] shadow-xl flex flex-col justify-between">
                  {/* Top Doodle Frame Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-black/5 flex items-center justify-center p-2 border-b border-[var(--border-gold)]">
                    <img
                      src={event.doodle}
                      alt={event.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-[var(--bg-elevated)]/90 border border-[var(--border-gold)] backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5 shadow-md z-10">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>{event.date}</span>
                    </div>

                    {/* Flip Trigger Button (Top Right) */}
                    <button
                      onClick={() => toggleFlip(index)}
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md bg-[var(--accent-primary)] hover:opacity-90 text-white border-[var(--border-gold)] shadow-md flex items-center space-x-1.5 z-10 transition-all active:scale-95"
                      title={t.flipBtn}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t.flipBtn}</span>
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {event.title}
                      </h3>

                      {/* Highlight Badge */}
                      <div className="my-3 inline-block px-3 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-xs text-[var(--badge-text)] font-semibold">
                        ✨ {event.highlight}
                      </div>

                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed mt-1 font-sans">
                        {event.description}
                      </p>
                    </div>

                    {/* Meta Footer Details & Direct Add to Calendar Button */}
                    <div className="mt-4 pt-4 border-t border-[var(--border-gold)] space-y-2.5 text-xs text-[var(--text-muted)]">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                        <span className="font-medium text-[var(--text-primary)]">{event.time}</span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                        <span className="leading-snug">{event.location}</span>
                      </div>

                      {/* Card Google Calendar Action Button */}
                      <div className="pt-2 flex items-center space-x-2">
                        <a
                          href={getCalendarUrl(index)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-gold)] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm hover:border-[var(--accent-gold)] transition-all"
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                          <span>Add to Calendar</span>
                          <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                        </a>

                        <button
                          onClick={() => toggleFlip(index)}
                          className="py-2.5 px-3 rounded-xl bg-[var(--badge-bg)] hover:bg-[var(--accent-primary)] hover:text-white text-[var(--badge-text)] border border-[var(--badge-border)] font-bold text-xs flex items-center justify-center space-x-1 shadow-sm transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{t.flipBtn.split(' ')[0]}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    BACK SIDE: Multilingual Cultural Lineage & Origin Story
                ============================================================ */}
                <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden rounded-3xl overflow-hidden glass-wedding-card border-2 border-[var(--accent-gold)] shadow-2xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-primary)]">
                  
                  {lineage && (
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-gold)] mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">🪔</span>
                          <span className="text-xs uppercase font-bold text-[var(--accent-primary)] tracking-wider">
                            {t.lineageHeader} • {event.date.split(' ')[0]} {event.date.split(' ')[1]}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleFlip(index)}
                          className="px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-primary)] text-xs font-bold flex items-center space-x-1 shadow-sm hover:bg-[var(--accent-gold)] hover:text-white transition-all"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{t.backBtn}</span>
                        </button>
                      </div>

                      {/* Lineage Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-1">
                        {lineage.title}
                      </h3>
                      
                      <div className="inline-block px-3 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-[11px] font-semibold mb-3">
                        📜 {lineage.origin}
                      </div>

                      {/* Lineage Story Content */}
                      <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm my-2">
                        <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-sans">
                          "{lineage.story}"
                        </p>
                      </div>

                      {/* Cultural Significance */}
                      <div className="mt-3 text-xs text-[var(--text-secondary)] font-sans">
                        <strong className="text-[var(--accent-primary)]">✨ {lineage.significance}</strong>
                      </div>
                    </div>
                  )}

                  {/* Back Footer */}
                  <div className="pt-3 border-t border-[var(--border-gold)] flex items-center justify-between">
                    <span className="font-serif text-xs italic text-[var(--text-muted)]">
                      Luhach Family Heritage • Vill. Nandha ki Dhani
                    </span>
                    <button
                      onClick={() => toggleFlip(index)}
                      className="text-xs font-bold text-[var(--accent-gold)] hover:underline flex items-center space-x-1"
                    >
                      <span>{t.showDetailsBtn}</span>
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
