import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, stroke, goal, level } = req.body;

  // Nothing useful to send? Just acknowledge.
  if (!goal && !level) {
    return res.status(200).json({ success: true });
  }

  // Flag the high-intent ones so they stand out in your inbox
  const isIntensiveLead = goal === 'Tournaments' || goal === 'Moving up a level';
  const flag = isIntensiveLead ? ' ⭐ INTENSIVE LEAD' : '';

  try {
    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: 'alexpandov07@gmail.com',
      subject: `Qualifying info: ${name || email || 'submitter'}${flag}`,
      html: `
        <h2>Qualifying answers${flag}</h2>
        <p><strong>Name:</strong> ${name || '(unknown)'}</p>
        <p><strong>Email:</strong> ${email || '(not captured)'}</p>
        <p><strong>Stroke submitted:</strong> ${stroke || '(unknown)'}</p>
        <p><strong>Playing for:</strong> ${goal || '(skipped)'}</p>
        <p><strong>Level:</strong> ${level || '(skipped)'}</p>
        ${isIntensiveLead ? '<p style="color:#1A5C38;"><strong>This one fits the intensive. Worth a tailored pitch after the analysis.</strong></p>' : ''}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Qualify error:', error);
    return res.status(500).json({ error: 'Failed to send' });
  }
}