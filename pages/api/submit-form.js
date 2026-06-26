import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Shared email chrome (matches your booked-call templates) ──────────
const wrap = (innerHtml) => `
<body style="margin:0;padding:0;background:#0f0f0e;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0e;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#191918;border-radius:12px;overflow:hidden;">
        <tr><td style="height:4px;background:#CCFF00;line-height:4px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px 40px 8px;">
          <span style="color:#F2F2EC;font-size:22px;font-weight:bold;letter-spacing:0.5px;">ALEKS<span style="color:#CCFF00;">COACH</span></span>
        </td></tr>
        ${innerHtml}
        <tr><td style="padding:24px 40px 0;"><div style="height:1px;background:#2c2c2a;line-height:1px;font-size:0;">&nbsp;</div></td></tr>
        <tr><td style="padding:20px 40px 32px;color:#F2F2EC;font-size:15px;line-height:1.5;">
          <p style="margin:0;color:#CCFF00;font-weight:bold;font-style:italic;">Good luck, and enjoy your tennis.</p>
          <p style="margin:14px 0 0;font-weight:bold;">Alex</p>
          <p style="margin:2px 0 0;color:#9a9a92;font-size:13px;">Aleks Coach &middot; Biomechanical Tennis Coaching</p>
        </td></tr>
      </table>
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:20px 40px;text-align:center;color:#6b6b64;font-size:12px;">
          <a href="https://alekscoach.com" style="color:#9a9a92;text-decoration:none;">alekscoach.com</a> &middot;
          <a href="mailto:contact@alekscoach.com" style="color:#9a9a92;text-decoration:none;">contact@alekscoach.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>`;

const heading = (title, eyebrow) => `
  <tr><td style="padding:16px 40px 0;">
    <h1 style="margin:0;color:#F2F2EC;font-size:26px;line-height:1.25;font-weight:bold;">${title}</h1>
    <p style="margin:10px 0 0;color:#CCFF00;font-size:14px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;">${eyebrow}</p>
  </td></tr>
  <tr><td style="padding:24px 40px 0;"><div style="height:1px;background:#2c2c2a;line-height:1px;font-size:0;">&nbsp;</div></td></tr>`;

const noteBox = (html) => `
  <tr><td style="padding:8px 40px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#13130f;border-left:3px solid #CCFF00;border-radius:6px;">
      <tr><td style="padding:18px 20px;color:#F2F2EC;font-size:15px;line-height:1.6;">${html}</td></tr>
    </table>
  </td></tr>`;

// ── The 3 nurture emails ──────────────────────────────────────────────
const nurtureDay3 = (name) => wrap(
  heading("How's the change going?", "One thing at a time") +
  `<tr><td style="padding:24px 40px 0;color:#F2F2EC;font-size:16px;line-height:1.6;">
    <p style="margin:0 0 16px;">Hey ${name},</p>
    <p style="margin:0 0 16px;">By now you have your breakdown. Have you taken the change to the court yet?</p>
    <p style="margin:0 0 16px;">One thing at a time is the whole point. Don't try to fix everything at once. Pick the single change from your analysis and drill only that until it stops feeling weird.</p>
    <p style="margin:0 0 16px;">Stuck on anything? Reply to this email. <strong style="color:#CCFF00;">I read every one.</strong></p>
  </td></tr>`
);

const nurtureDay6 = (name) => wrap(
  heading("Knowing isn't doing.", "The real work") +
  `<tr><td style="padding:24px 40px 0;color:#F2F2EC;font-size:16px;line-height:1.6;">
    <p style="margin:0 0 16px;">Hey ${name},</p>
    <p style="margin:0 0 16px;">Most players know roughly what is wrong with their game. Very few change it. The gap is not knowledge. <strong style="color:#CCFF00;">It is reps with someone watching.</strong></p>
    <p style="margin:0 0 16px;">That is what I do week to week with the players I coach. One change locked in, then the next, with eyes on your footage the whole way.</p>
  </td></tr>` +
  noteBox(`Want to see what that looks like? Here are players I have worked with and what changed.<br><br><a href="https://www.alekscoach.com/proof" style="color:#CCFF00;font-weight:bold;text-decoration:none;">&rarr;&nbsp; See real results</a>`)
);

const nurtureDay10 = (name) => wrap(
  heading("Want me in your corner?", "Ongoing coaching") +
  `<tr><td style="padding:24px 40px 0;color:#F2F2EC;font-size:16px;line-height:1.6;">
    <p style="margin:0 0 16px;">Hey ${name},</p>
    <p style="margin:0 0 16px;">If the free breakdown helped, ongoing coaching takes it further. You send footage, I find the next change, you drill it, we move on. No fluff, no generic drills.</p>
  </td></tr>` +
  noteBox(`I cap it at <strong style="color:#CCFF00;">20 players</strong> so everyone gets proper attention. A few spots tend to open each month.`) +
  `<tr><td style="padding:24px 40px 0;color:#F2F2EC;font-size:16px;line-height:1.6;">
    <p style="margin:0 0 16px;">If you want in, reply and tell me what you are working towards. I will take it from there.</p>
    <p style="margin:0;">Speak soon.</p>
  </td></tr>`
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { first_name, email, stroke, footage_link, notes, ref } = req.body;

  if (!first_name || !email || !stroke || !footage_link) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const refLine = ref ? ref : 'Direct (no referral)';

  try {
    // ── Notify you of the submission ────────────────────────────────
    await resend.emails.send({
      from: 'Aleks Coach <contact@alekscoach.com>',
      to: 'alexpandov07@gmail.com',
      subject: `New footage submission: ${stroke} from ${first_name}${ref ? ` [via ${ref}]` : ''}`,
      html: `
        <h2>New footage submission</h2>
        <p><strong>Referred by:</strong> ${refLine}</p>
        <p><strong>Name:</strong> ${first_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Stroke:</strong> ${stroke}</p>
        <p><strong>Footage link:</strong> <a href="${footage_link}">${footage_link}</a></p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      `,
    });

    // ── Confirmation to the submitter ───────────────────────────────
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
        <p>Aleks<br><a href="https://alekscoach.com">alekscoach.com</a></p>
      `,
    });

    // ── Nurture sequence (scheduled). Requires Resend SDK ^6.12.4+ ──
    try {
      const inDays = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000).toISOString();

      await resend.emails.send({
        from: 'Aleks Coach <contact@alekscoach.com>',
        to: email, replyTo: 'contact@alekscoach.com', scheduledAt: inDays(3),
        subject: 'How is the change going?',
        html: nurtureDay3(first_name),
      });

      await resend.emails.send({
        from: 'Aleks Coach <contact@alekscoach.com>',
        to: email, replyTo: 'contact@alekscoach.com', scheduledAt: inDays(6),
        subject: 'Knowing the fix is the easy part',
        html: nurtureDay6(first_name),
      });

      await resend.emails.send({
        from: 'Aleks Coach <contact@alekscoach.com>',
        to: email, replyTo: 'contact@alekscoach.com', scheduledAt: inDays(10),
        subject: 'Want me in your corner?',
        html: nurtureDay10(first_name),
      });
    } catch (nurtureErr) {
      console.error('Nurture scheduling error:', nurtureErr);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}