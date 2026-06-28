import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, stroke, goal, level, coaching, frequency } = req.body;

  // Nothing useful to send? Just acknowledge.
  if (!goal && !level && !coaching && !frequency) {
    return res.status(200).json({ success: true });
  }

  // Flag the high-intent ones so they stand out in your inbox.
  // Strongest signal: competitive goal, especially if they have no coach yet.
  const competitiveGoal = goal === 'Tournaments' || goal === 'Moving up a level';
  const isIntensiveLead = competitiveGoal && coaching !== 'In-person coach';
  const flag = isIntensiveLead ? ' ⭐ INTENSIVE LEAD' : '';

  try {
    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: 'contact@alekscoach.com',
      subject: `Qualifying info: ${name || email || 'submitter'}${flag}`,
      html: `
        <h2>Qualifying answers${flag}</h2>
        <p><strong>Name:</strong> ${name || '(unknown)'}</p>
        <p><strong>Email:</strong> ${email || '(not captured)'}</p>
        <p><strong>Stroke submitted:</strong> ${stroke || '(unknown)'}</p>
        <p><strong>Playing for:</strong> ${goal || '(skipped)'}</p>
        <p><strong>Level:</strong> ${level || '(skipped)'}</p>
        <p><strong>Currently coached:</strong> ${coaching || '(skipped)'}</p>
        <p><strong>Plays:</strong> ${frequency || '(skipped)'}</p>
        ${isIntensiveLead ? '<p style="color:#1A5C38;"><strong>Competitive goal and no in-person coach. Strong fit for the intensive. Worth a tailored pitch after the analysis.</strong></p>' : ''}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Qualify error:', error);
    return res.status(500).json({ error: 'Failed to send' });
  }
}