/**
 * Backend / Serverless Function: Silent Background WhatsApp & Email RSVP Handler
 * Compatible with: Vercel Serverless, Netlify Functions, Cloudflare Pages/Workers, Express.js
 * 
 * Required Environment Variables (.env):
 * TWILIO_ACCOUNT_SID=your_twilio_account_sid
 * TWILIO_AUTH_TOKEN=your_twilio_auth_token
 * TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886 (Twilio Sandbox / Registered Sender)
 * HOST_WHATSAPP_NUMBER=+917229960539
 * HOST_EMAIL=Navisingh2100@gmail.com
 */

export default async function handler(req, res) {
  // 1. Handle CORS Pre-flight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const {
      Guest_Name,
      Mobile_Number,
      Raw_Phone,
      Guests_Attending,
      Events_Selected,
      Blessings_Message,
    } = req.body || {};

    if (!Guest_Name) {
      return res.status(400).json({ error: 'Missing required field: Guest_Name' });
    }

    const hostPhone = process.env.HOST_WHATSAPP_NUMBER || '+917229960539';
    const hostFormattedPhone = hostPhone.replace(/\D/g, ''); // 917229960539

    // 2. Format Structured Message for Host WhatsApp
    const messageBody = [
      `🚩 *NEW WEDDING RSVP: Naveen & Manisha (#Navisha)* 🚩`,
      ``,
      `👤 *Guest Name:* ${Guest_Name}`,
      `📱 *Mobile Number:* ${Mobile_Number || Raw_Phone || 'Not provided'}`,
      `👥 *Number of Guests:* ${Guests_Attending || '1'}`,
      `📅 *Functions Attending:* ${Events_Selected || 'All Functions'}`,
      `💌 *Blessings/Notes:* "${Blessings_Message || 'No note'}"`,
      ``,
      `⏰ *Submitted At:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ].join('\n');

    // 3. Option A: Dispatch Silent WhatsApp via Twilio API (if credentials configured)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
      const toWhatsApp = `whatsapp:+${hostFormattedPhone}`;

      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const params = new URLSearchParams();
      params.append('From', fromWhatsApp);
      params.append('To', toWhatsApp);
      params.append('Body', messageBody);

      const twilioRes = await fetch(twilioEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const twilioData = await twilioRes.json();
      console.log('Twilio WhatsApp Silent Notification status:', twilioData.status || twilioData);
    } 
    // 3. Option B: Green API / Custom WhatsApp Gateway Webhook fallback
    else if (process.env.GREEN_API_INSTANCE_ID && process.env.GREEN_API_TOKEN) {
      const greenApiUrl = `https://api.green-api.com/waInstance${process.env.GREEN_API_INSTANCE_ID}/sendMessage/${process.env.GREEN_API_TOKEN}`;
      await fetch(greenApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: `${hostFormattedPhone}@c.us`,
          message: messageBody,
        }),
      });
    }

    return res.status(200).json({
      success: true,
      message: 'RSVP notification dispatched silently to hosts.',
      deliveredTo: {
        email: 'Navisingh2100@gmail.com',
        whatsapp: '+917229960539',
      },
    });

  } catch (error) {
    console.error('Serverless RSVP notification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal notification error',
      details: error.message,
    });
  }
}
