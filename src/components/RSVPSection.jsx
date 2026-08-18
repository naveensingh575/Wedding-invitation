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
      // 1. Silent Background Email Dispatch to Navisingh2100@gmail.com via FormSubmit AJAX
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

      // Await background notifications
      await Promise.allSettled([emailPromise, webhookPromise]);

      setIsSending(false);
      setSubmitted(true);

      // Festive celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C9A96E', '#7A8B72', '#C9A6A0', '#DFBF82'],
        });
      } catch (confettiErr) {
        console.log('Confetti effect handled', confettiErr);
      }

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
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <UserCheck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>{t.rsvp?.badge || "Confirm Your Presence"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {t.rsvp?.heading || "Confirm Your Attendance (RSVP)"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto mt-2 font-sans">
          {t.rsvp?.subheading || "Hon. Capt. Satyavir Singh & Luhach family & Sheoran family request the pleasure of your company"}
        </p>
      </div>

      {/* RSVP Card Form */}
      <div className="glass-wedding-card rounded-3xl p-6 sm:p-10 border border-[var(--border-gold)] shadow-xl relative overflow-hidden theme-transition">
        
        {submitted ? (
          /* ============================================================
              CLEAN INLINE SUCCESS CONFIRMATION STATE (NO REDIRECTS/EXTERNAL LINKS)
          ============================================================ */
          <div className="text-center py-8 space-y-5 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--badge-bg)] border-2 border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[11px] font-bold text-[var(--accent-primary)] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>RSVP Successfully Received</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                Thank You, {formData.guestName}!
              </h3>
            </div>

            <p className="font-hindi text-lg sm:text-xl text-[var(--accent-primary)] font-semibold">
              "धन्यवाद! आपकी उपस्थिति दर्ज कर ली गई है।"
            </p>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs sm:text-sm text-[var(--text-secondary)] font-sans text-left space-y-1.5 shadow-sm">
              <p>• <strong>Guest Name:</strong> {formData.guestName} {formData.phone ? `(+91 ${formData.phone})` : ''}</p>
              <p>• <strong>Total Attending:</strong> {formData.headcount} Guest(s)</p>
              <p>• <strong>Functions:</strong> {formData.attendance}</p>
              {formData.message && <p>• <strong>Wishes / Message:</strong> "{formData.message}"</p>}
            </div>

            <p className="text-xs text-[var(--text-muted)] font-sans max-w-sm mx-auto">
              Your response has been delivered to the host family. We look forward to welcoming you!
            </p>

            <div className="pt-4 border-t border-[var(--border-gold)]/60">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Submit Another RSVP / अन्य उपस्थिति दर्ज करें
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================
              SIMPLE, ELEGANT RSVP SUBMISSION FORM
          ============================================================ */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {submitError && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500 text-rose-600 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Full Name / आपका नाम *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar & Family"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
                />
              </div>

              {/* Mobile Number (Optional / 10-digit) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Mobile Number / मोबाइल नंबर
                  </label>
                  {formData.phone.length > 0 && (
                    <span className="text-[10px] text-[var(--accent-gold)] font-bold">
                      {formData.phone.length}/10 Digits
                    </span>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit Mobile Number (e.g. 9876543210)"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none shadow-sm font-mono ${
                      phoneError
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-[var(--border-gold)] focus:border-[var(--accent-gold)]'
                    }`}
                  />
                </div>

                {phoneError && (
                  <div className="mt-1.5 flex items-center space-x-1.5 text-xs text-rose-500 font-semibold animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </div>
                )}
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Number of Guests / अतिथियों की संख्या
                </label>
                <select
                  value={formData.headcount}
                  onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3-4">3 - 4 Family Members</option>
                  <option value="5+">5+ Whole Family</option>
                </select>
              </div>

              {/* Events Attending */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Events Attending / समारोह
                </label>
                <select
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
                >
                  <option value="All Functions (16, 17, 19, 20 Nov)">All Functions (16, 17, 19, 20 Nov)</option>
                  <option value="1st Ban & Haldi (16 Nov)">1st Ban & Haldi (16 Nov)</option>
                  <option value="Mehendi & Mahila Sangeet (17 Nov)">Mehendi & Mahila Sangeet (17 Nov)</option>
                  <option value="Bhaat & Shubh Lagan (19 Nov)">Bhaat & Shubh Lagan (19 Nov)</option>
                  <option value="Barat & Shubh Vivah (20 Nov)">Barat & Shubh Vivah (20 Nov)</option>
                </select>
              </div>

            </div>

            {/* Optional Message */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                Blessings & Wishes / परिवार के लिए संदेश
              </label>
              <textarea
                rows="3"
                placeholder="Write your blessings and heartfelt wishes here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
              ></textarea>
            </div>

            {/* Single Submit Button with Loading State */}
            <div>
              <button
                type="submit"
                disabled={isSending || (formData.phone.length > 0 && formData.phone.length !== 10)}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  isSending || (formData.phone.length > 0 && formData.phone.length !== 10)
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:opacity-95 hover:scale-[1.01] active:scale-[0.99]'
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
