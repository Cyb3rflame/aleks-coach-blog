// pages/sitemap.xml.js
// Builds alekscoach.com/sitemap.xml automatically. New blog posts are added on every deploy.
// /welcome, /c/ and /v/ pages are left out on purpose (they are set to noindex).

import { getAllPosts } from '../lib/posts'
import { SITE_URL } from '../lib/site'

const STATIC_PAGES = ['/', '/programme', '/freeanalysis', '/offers', '/proof', '/blog']

function buildXml(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    ...STATIC_PAGES.map((p) => ({ loc: `${SITE_URL}${p === '/' ? '' : p}`, lastmod: today })),
    ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.updated || p.date })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const posts = getAllPosts().filter((p) => !p.draft)
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(buildXml(posts))
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
