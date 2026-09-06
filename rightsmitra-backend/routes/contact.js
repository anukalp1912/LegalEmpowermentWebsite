const store = require('../lib/store');

// POST /api/contact { name, email, phone, issue, message }
function submitContact(req, res, body) {
  const { name, email, phone, issue, message } = body;
  if (!name || !email || !issue || !message) {
    return res.status(400).json({ error: 'name, email, issue and message are required' });
  }

  const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  store.insert('contact_messages', {
    id, name, email, phone: phone || null, issue, message, created_at: new Date().toISOString(),
  });

  // TODO: wire up a real email/notification provider here if desired.
  console.log(`[Contact] New message from ${name} <${email}>: ${issue}`);

  res.status(201).json({ success: true, id, message: 'Your message has been received. We will get back to you within 24 hours.' });
}

module.exports = { submitContact };
