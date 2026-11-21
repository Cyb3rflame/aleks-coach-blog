// lib/site.js
// One place for the site details the blog and SEO bits use.

// Main domain. Must match the primary domain set in Vercel (www or no www).
export const SITE_URL = 'https://www.alekscoach.com'

export const SITE_NAME = 'Aleks Coach'

export const BUNNY_LIBRARY = '788439'

// Bunny Stream CDN hostname, e.g. 'vz-a1b2c3d4-e5f.b-cdn.net'
// Find it in Bunny: Stream > your library > API > CDN Hostname.
// Used for video thumbnails in Google. Leave empty and the branded share image is used instead.
export const BUNNY_CDN_HOST = ''

export const bunnyEmbed = (id) =>
  `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY}/${id}?autoplay=false&preload=false&responsive=true`

export const bunnyThumb = (id) =>
  BUNNY_CDN_HOST ? `https://${BUNNY_CDN_HOST}/${id}/thumbnail.jpg` : null

export const WHATSAPP = 'https://wa.me/447512834077'
export const INSTAGRAM = 'https://www.instagram.com/aleks_coaches/'
export const YOUTUBE = 'https://www.youtube.com/@alekscoaches'

export const AUTHOR = {
  name: 'Aleks Pandov',
  role: 'LTA Level 3 tennis coach',
  // Path to a photo in /public, e.g. '/aleks.jpg'. Leave empty to show initials.
  photo: '',
  bio: 'LTA Level 3 qualified coach with 6+ years coaching. I have analysed 200+ players online and coached at David Lloyd and ActiveAway. I focus on the mechanics most coaches skip: the load, the turn, the uncoil.',
  sameAs: [
    'https://www.instagram.com/aleks_coaches/',
    'https://www.youtube.com/@alekscoaches',
  ],
}
