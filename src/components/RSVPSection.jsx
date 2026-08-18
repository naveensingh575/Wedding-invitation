import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, UserCheck, AlertCircle, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';

export default function RSVPSection({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');
  const [lastSmsUrl, setLastSmsUrl] = useState('');
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    headcount: '1',
    attendance: 'All Functions (16, 17, 19, 20 Nov)',
    message: '',
  });

  // Strict 10-digit phone number validation
  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    const numericVal = rawVal.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: numericVal });

    if (numericVal.length === 0) {
      setPhoneError('');
    } else if (numericVal.length < 10) {
      setPhoneError('⚠️ Only 10-digit mobile number allowed (Entered: ' + numericVal.length + '/10)');
    } else {
      setPhoneError('');
    }
  };

  const formatRsvpMessage = (cleanPhone) => {
    return `🌸 *Wedding RSVP Confirmation (#Navisha)* 🌸
━━━━━━━━━━━━━━━━━━
👤 *Guest Name:* ${formData.guestName.trim()}
📱 *Phone:* +91 ${cleanPhone}
👥 *Total Guests Attending:* ${formData.headcount}
📅 *Functions:* ${formData.attendance}
💌 *Personal Message / Wishes:* ${formData.message.trim() || 'Heartiest Congratulations & Best Wishes to Naveen & Manisha! 🎉'}
━━━━━━━━━━━━━━━━━━
Sent via https://naveenwedsmanisha.online/`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');

    if (!formData.guestName.trim()) {
      setSubmitError('Please enter your full name');
      return;
    }

    if (cleanPhone.length !== 10) {
      setPhoneError('⚠️ Please enter a valid 10-digit mobile number / कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }

    setIsSending(true);
    setSubmitError('');

    const formattedMsg = formatRsvpMessage(cleanPhone);
    const whatsappUrl = `https://wa.me/917229960539?text=${encodeURIComponent(formattedMsg)}`;
    const smsUrl = `sms:+917229960539?body=${encodeURIComponent(formattedMsg)}`;

    setLastWhatsAppUrl(whatsappUrl);
    setLastSmsUrl(smsUrl);

    const rsvpPayload = {
      _subject: `💍 New Wedding RSVP: ${formData.guestName} (#Navisha)`,
      Guest_Name: formData.guestName,
      Mobile_Number: `+91 ${cleanPhone}`,
      Raw_Phone: `91${cleanPhone}`,
      Guests_Attending: formData.headcount,
      Events_Selected: formData.attendance,
      Blessings_Message: formData.message || 'None',
      Target_WhatsApp: '+917229960539',
      Target_Email: 'Navisingh2100@gmail.com',
      Submitted_At: new Date().toISOString(),
      _template: 'table',
    };

    try {
      // 1. Silent Background Email Dispatch to Navisingh2100@gmail.com via FormSubmit AJAX
      fetch('https://formsubmit.co/ajax/Navisingh2100@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(rsvpPayload),
      }).catch((err) => {
        console.warn('FormSubmit background notification notice:', err);
      });

      // 2. Trigger celebratory festive confetti
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#C9A96E', '#7A8B72', '#C9A6A0', '#DFBF82'],
        });
      } catch (confettiErr) {
        console.log('Confetti effect handled', confettiErr);
      }

      setIsSending(false);
      setSubmitted(true);

      // 3. Open WhatsApp directly with the formatted RSVP message
      window.open(whatsappUrl, '_blank');

    } catch (error) {
      console.error('RSVP submission error:', error);
      setIsSending(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank');
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
              CLEAN & ELEGANT SUCCESS CONFIRMATION STATE WITH WHATSAPP & SMS BUTTONS
          ============================================================ */
          <div className="text-center py-8 space-y-5 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--badge-bg)] border-2 border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[11px] font-bold text-[var(--accent-primary)] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>RSVP Successfully Created</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                Thank You, {formData.guestName}!
              </h3>
            </div>

            <p className="font-hindi text-lg sm:text-xl text-[var(--accent-primary)] font-semibold">
              "आपकी उपस्थिति हमारे लिए अत्यंत हर्ष का विषय होगी"
            </p>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs sm:text-sm text-[var(--text-secondary)] font-sans text-left space-y-1.5 shadow-sm">
              <p>• <strong>Guest:</strong> {formData.guestName} (+91 {formData.phone})</p>
              <p>• <strong>Attending:</strong> {formData.headcount} Guest(s)</p>
              <p>• <strong>Functions:</strong> {formData.attendance}</p>
              {formData.message && <p>• <strong>Blessings:</strong> "{formData.message}"</p>}
            </div>

            {/* Direct 1-Tap WhatsApp & SMS Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              {lastWhatsAppUrl && (
                <a
                  href={lastWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp</span>
                </a>
              )}

              {lastSmsUrl && (
                <a
                  href={lastSmsUrl}
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--text-primary)] font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Send via Direct SMS</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-[var(--border-gold)]/60">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border-gold)] text-[var(--text-secondary)] text-xs font-bold shadow-sm transition-all"
              >
                🔄 Submit Another RSVP
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================
              RSVP SUBMISSION FORM WITH REAL-TIME 10-DIGIT VALIDATION
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
                  Full Name / परिवार का नाम *
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

              {/* Phone / WhatsApp - Strict 10-digit restriction */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Mobile / WhatsApp Number *
                  </label>
                  <span className="text-[10px] text-[var(--accent-gold)] font-bold">
                    {formData.phone.length}/10 Digits
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit Number (e.g. 9876543210)"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none shadow-sm font-mono ${
                      phoneError
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-[var(--border-gold)] focus:border-[var(--accent-gold)]'
                    }`}
                  />
                </div>

                {/* Inline Validation Error Notice */}
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
                  Number of Guests Attending
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
                  Which Events Will You Attend?
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
                Blessings & Message for Couple / परिवार के लिए संदेश
              </label>
              <textarea
                rows="3"
                placeholder="Write your wishes & blessings here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSending || (formData.phone.length > 0 && formData.phone.length !== 10)}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  isSending || (formData.phone.length > 0 && formData.phone.length !== 10)
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:opacity-95 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{isSending ? "Submitting RSVP..." : "Submit RSVP via WhatsApp (+91 7229960539)"}</span>
              </button>
            </div>

            <div className="text-center text-[11px] text-[var(--text-muted)] font-sans">
              🔒 Direct WhatsApp & SMS confirmation sent to +91 7229960539.
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
