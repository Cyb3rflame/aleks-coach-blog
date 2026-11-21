// pages/api/og.js
// Branded share image for links (WhatsApp, Instagram, Google etc.).
// Usage: /api/og?title=Your%20post%20title

import { ImageResponse } from 'next/og'

export const config = { runtime: 'edge' }

export default function handler(req) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'Online tennis coaching and video analysis').slice(0, 120)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0f2341',
          color: '#fff',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40 }}>
          Aleks<span style={{ color: '#c8102e', marginLeft: 12 }}>Coach</span>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 58 : 70, lineHeight: 1.15, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, opacity: 0.85 }}>
          <div style={{ width: 48, height: 6, background: '#c8102e', marginRight: 18 }} />
          alekscoach.com · Online tennis coaching and video analysis
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
