import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source, ref } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const refLine = ref ? ref : 'Direct (no referral)';

  try {
    // Send the guide to the person
    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: email,
      replyTo: 'contact@alekscoach.com',
      subject: 'Your Beat the Pusher guide',
      html: `
        <p>Here is your guide on how to take apart a pusher.</p>
        <p><a href="https://alekscoach.com/email/beat-the-pusher.pdf">Download it here</a></p>
        <p>If you ever want a proper look at your game, I do a free 5 minute breakdown of your stroke. Just send footage at alekscoach.com/freeanalysis.</p>
        <p>Good luck, and enjoy your tennis.</p>
        <p>Aleks</p>
      `,
    });

    // Notify yourself so you can see PDF leads coming in
    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: 'alexpandov07@gmail.com',
      subject: `New PDF lead: ${email}${ref ? ` [via ${ref}]` : ''}`,
      html: `
        <h2>New Beat the Pusher lead</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source || 'exit_intent'}</p>
        <p><strong>Referred by:</strong> ${refLine}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Lead magnet error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}