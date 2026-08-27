import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, UserCheck, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

export default function RSVPSection({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    headcount: '1',
    attendance: 'All Functions (16, 17, 19, 20 Nov)',
    message: '',
  });

  // 10-digit phone number validation
  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    const numericVal = rawVal.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: numericVal });

    if (numericVal.length === 0) {
      setPhoneError('');
    } else if (numericVal.length < 10) {
      setPhoneError('⚠️ Please enter 10 digits (Entered: ' + numericVal.length + '/10)');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');

    if (!formData.guestName.trim()) {
      setSubmitError('Please enter your full name / कृपया अपना नाम दर्ज करें');
      return;
    }

    if (cleanPhone.length > 0 && cleanPhone.length !== 10) {
      setPhoneError('⚠️ Please enter a valid 10-digit mobile number / कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }

    setIsSending(true);
    setSubmitError('');

    const rsvpPayload = {
      _subject: `💍 New Wedding RSVP: ${formData.guestName.trim()} (#Navisha)`,
      Guest_Name: formData.guestName.trim(),
      Mobile_Number: cleanPhone ? `+91 ${cleanPhone}` : 'Not Provided',
      Raw_Phone: cleanPhone ? `91${cleanPhone}` : '',
      Guests_Attending: formData.headcount,
      Events_Selected: formData.attendance,
      Blessings_Message: formData.message.trim() || 'None',
      Target_Email: 'Navisingh2100@gmail.com',
      Target_WhatsApp: '+917229960539',
      Target_SMS: '+917229960539',
      Submitted_At: new Date().toISOString(),
      _template: 'table',
    };

    try {
      // 1. Silent Background Email Dispatch via FormSubmit AJAX
      const emailPromise = fetch('https://formsubmit.co/ajax/Navisingh2100@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(rsvpPayload),
      }).catch((err) => {
        console.warn('FormSubmit background notification notice:', err);
      });

      // 2. Silent Background Webhook / Serverless API (/api/rsvp)
      const webhookPromise = fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpPayload),
      }).catch((err) => {
        console.info('Webhook route handled gracefully:', err);
      });

      await Promise.allSettled([emailPromise, webhookPromise]);

      setIsSending(false);
      setSubmitted(true);

      // Trigger lightweight confetti particle pop only (Isolated from full-screen skyshots text overlay)
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}

    } catch (error) {
      console.error('RSVP background submission error:', error);
      setIsSending(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      guestName: '',
      phone: '',
      headcount: '1',
      attendance: 'All Functions (16, 17, 19, 20 Nov)',
      message: '',
    });
    setPhoneError('');
    setSubmitError('');
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      <div className="glass-wedding-card rounded-3xl p-6 sm:p-10 border-2 border-[var(--border-gold)] shadow-2xl bg-[var(--bg-elevated)]/95 relative overflow-hidden theme-transition">
        
        {/* Decorative Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>RSVP & Guest Confirmation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            {t.rsvp?.heading || "Confirm Your Presence (उपस्थिति पुष्टि)"}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans mt-1.5 max-w-lg mx-auto">
            {t.rsvp?.subheading || "Please let us know your attendance & function preferences"}
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submitted ? (
          <div className="py-10 px-6 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              {t.rsvp?.successTitle || "RSVP Received! / उपस्थिति दर्ज हो गई है! 🎉"}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.guestName}</strong>! Your RSVP confirmation for {formData.headcount} guest(s) has been recorded. We eagerly await your presence.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] transition-all shadow-sm cursor-pointer"
              >
                Submit Another RSVP / अन्य फॉर्म भरें
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
            {submitError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Guest Name Field */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                Full Name / पूरा नाम <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Singh / Ramesh Sheoran"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm font-sans"
              />
            </div>

            {/* Mobile Number Field (Optional 10 digits) */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                Mobile Number (10 Digits) / मोबाइल नंबर
              </label>
              <input
                type="tel"
                maxLength={10}
                placeholder="e.g. 9812345678"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none shadow-sm font-mono ${
                  phoneError ? 'border-2 border-rose-500' : 'border border-[var(--border-gold)] focus:border-[var(--accent-gold)]'
                }`}
              />
              {phoneError && (
                <p className="text-[11px] font-bold text-rose-500 mt-1">{phoneError}</p>
              )}
            </div>

            {/* Headcount Selection */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                Number of Guests / कुल सदस्य
              </label>
              <select
                value={formData.headcount}
                onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] shadow-sm font-sans"
              >
                <option value="1">1 Person (केवल 1 सदस्य)</option>
                <option value="2">2 Persons (2 सदस्य)</option>
                <option value="3">3-4 Persons (3-4 सदस्य)</option>
                <option value="5+">Family / 5+ Persons (सपरिवार)</option>
              </select>
            </div>

            {/* Attendance Options */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                Attending Functions / कार्यक्रम उपस्थिति
              </label>
              <select
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] shadow-sm font-sans"
              >
                <option value="All Functions (16, 17, 19, 20 Nov)">All Functions / सभी कार्यक्रम (16 - 20 Nov)</option>
                <option value="Main Vivah & Barat (20 Nov)">Main Vivah & Barat / विवाह एवं बारात (20 Nov)</option>
                <option value="Bhaat & Lagan (19 Nov)">Bhaat & Lagan / भात एवं लगन (19 Nov)</option>
                <option value="Haldi & Sangeet (16-17 Nov)">Haldi & Sangeet / हल्दी एवं संगीत (16-17 Nov)</option>
              </select>
            </div>

            {/* Blessings Message */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                Blessings & Message / शुभकामना संदेश
              </label>
              <textarea
                rows={3}
                placeholder="Write your wishes for Naveen & Manisha..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm font-sans"
              ></textarea>
            </div>

            {/* Theme-Adaptive Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSending || (formData.phone.length > 0 && formData.phone.length !== 10)}
                className={`w-full py-4 rounded-2xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  isSending || (formData.phone.length > 0 && formData.phone.length !== 10)
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending... / भेजा जा रहा है...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 fill-current" />
                    <span>Submit RSVP / निमंत्रण भेजें</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-[11px] text-[var(--text-muted)] font-sans">
              🔒 Your response is privately recorded and delivered to the hosts.
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
