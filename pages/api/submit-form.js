const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { first_name, email, stroke, footage_link, notes } = req.body;

  if (!first_name || !email || !stroke || !footage_link) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: 'alexpandov07@gmail.com',
      subject: `New footage submission: ${stroke} from ${first_name}`,
      html: `
        <h2>New footage submission</h2>
        <p><strong>Name:</strong> ${first_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Stroke:</strong> ${stroke}</p>
        <p><strong>Footage link:</strong> <a href="${footage_link}">${footage_link}</a></p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      `,
    });

    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: email,
      replyTo: 'contact@alekscoach.com',
      subject: 'Footage received. Your analysis is being built.',
      html: `
        <p>Hey ${first_name},</p>
        
        <p>Footage received. Thanks for sending it over.</p>
        
        <p>Here is what happens now:</p>
        
        <ol>
          <li>I will watch your footage personally.</li>
          <li>I will record a 5-minute voiceover breakdown with visuals and a mechanical diagnosis of your chosen stroke.</li>
          <li>You will receive the video plus a short written plan at this email address, usually within 24 to 48 hours.</li>
        </ol>
        
        <p>No automation on my end. Every analysis is done by me.</p>
        
        <p>If you have anything else you want me to look at on the footage, just reply to this email.</p>
        
        <p>Good luck, and enjoy your tennis.</p>
        
        <p>Aleks<br>
        <a href="https://alekscoach.com">alekscoach.com</a></p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};