/* backend/utils/smsClient.js
// defensive wrapper around Twilio so missing keys / module won't crash the server.

let twilioClient = null;
let TWILIO_FROM = process.env.TWILIO_FROM_NUMBER || null;

try {
  // only attempt to create client if env vars are present
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    // require inside try so missing module won't crash startup
    // eslint-disable-next-line global-require
    const twilio = require('twilio');
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    TWILIO_FROM = TWILIO_FROM || process.env.TWILIO_FROM_NUMBER || null;
    console.log('smsClient: Twilio client initialized');
  } else {
    console.warn('smsClient: Twilio env vars not set (TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN). SMS disabled.');
  }
} catch (err) {
  console.warn('smsClient: Twilio module not available or failed to initialize:', err?.message || err);
  twilioClient = null;
}

/**
 * sendSms: attempts to send an SMS, but will not throw.
 * - to: string (E.164 recommended, e.g. +911234567890)
 * - body: string
 
const sendSms = async (to, body) => {
  if (!to || !body) {
    console.warn('smsClient.sendSms: missing "to" or "body"');
    return { ok: false, error: 'missing-to-or-body' };
  }

  if (!twilioClient) {
    console.warn(`smsClient: Twilio client not configured. Would have sent to ${to}: ${body}`);
    // Return a shape similar to successful send so callers aren't forced to handle exceptions.
    return { ok: false, error: 'twilio-not-configured' };
  }

  try {
    const msg = await twilioClient.messages.create({
      body,
      from: TWILIO_FROM,
      to,
    });
    // Twilio returns a message object; keep it for debugging
    console.log(`smsClient: message queued to ${to} (sid: ${msg.sid})`);
    return { ok: true, sid: msg.sid, raw: msg };
  } catch (err) {
    console.error('smsClient: send error', err?.message || err);
    return { ok: false, error: err?.message || err };
  }
};

module.exports = { sendSms };

*/