import React, { useState } from 'react';
import { Heart, MessageSquare, Send } from 'lucide-react';

export default function WishesWall({ t }) {
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: "Ch. Rajendra Luhach & Family",
      relation: "Family Elder",
      message: "नवीन बेटे और मनीषा बहू को विवाह की ढेर सारी शुभकामनाएं एवं हार्दिक आशीर्वाद!",
      date: "Aug 2026",
    },
    {
      id: 2,
      name: "Col. S. K. Sheoran",
      relation: "Well Wisher",
      message: "Heartiest congratulations to Hon. Capt. Satyavir Singh & family! Best wishes to Naveen & Manisha for a blissful married life.",
      date: "Aug 2026",
    },
    {
      id: 3,
      name: "Amit & Vikas Luhach",
      relation: "Friends & Brothers",
      message: "भाई नवीन के ब्याह का घणा चाव सै! 20 नवंबर को आर्य नगर दादरी में बारात की धूम मचेगी!",
      date: "Aug 2026",
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newName.trim(),
      relation: newRelation.trim() || "Relative / Friend",
      message: newMessage.trim(),
      date: "Just Now",
    };

    setWishes([newEntry, ...wishes]);
    setNewName('');
    setNewRelation('');
    setNewMessage('');
  };

  return (
    <section id="wishes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>{t.wishes?.badge || "Blessings & Wishes Wall"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {t.wishes?.heading || "Guestbook & Blessings"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto mt-2 font-sans">
          {t.wishes?.subheading || "Leave your warm wishes and blessings for Groom Naveen & Bride Manisha"}
        </p>
      </div>

      {/* Form & List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Wish Input Form */}
        <div className="lg:col-span-5 glass-wedding-card rounded-3xl p-6 border border-[var(--border-gold)] shadow-xl">
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>{t.wishes?.formTitle || "Send Your Blessings"}</span>
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-5 font-sans">
            {t.wishes?.formDesc || "Your heartfelt message will appear on the wedding wall"}
          </p>

          <form onSubmit={handleAddWish} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                {t.wishes?.nameLabel || "Your Name *"}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                {t.wishes?.relationLabel || "Relationship / Village"}
              </label>
              <input
                type="text"
                placeholder="e.g. Friend / Charkhi Dadri"
                value={newRelation}
                onChange={(e) => setNewRelation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                {t.wishes?.messageLabel || "Your Message / Wishes *"}
              </label>
              <textarea
                rows="3"
                required
                placeholder="Write your wishes here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.wishes?.postBtn || "Post Blessing"}</span>
            </button>
          </form>
        </div>

        {/* Wishes List Feed */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="glass-wedding-card rounded-2xl p-5 border border-[var(--border-gold)] shadow-sm hover:border-[var(--accent-gold)] transition-all animate-fadeIn"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                    {wish.name}
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] font-medium border border-[var(--badge-border)] inline-block mt-0.5">
                    {wish.relation}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-sans">
                  {wish.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans mt-3 leading-relaxed">
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
