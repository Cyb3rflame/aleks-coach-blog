import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
const isDev = process.env.NODE_ENV === 'development'

// gray-matter turns unquoted dates into Date objects, which Next can't pass as props.
function toDateString(value) {
  if (!value) return null
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function readingTime(content) {
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Pulls question/answer pairs out of a "## FAQ" section written as:
// **Question?**
// Answer text
function extractFaq(content) {
  const lines = content.split('\n')
  const start = lines.findIndex((l) => /^##\s+(faq|frequently asked questions)\s*$/i.test(l.trim()))
  if (start === -1) return []

  const faq = []
  let current = null
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^##\s/.test(line)) break
    const q = line.match(/^\*\*(.+?)\*\*$/)
    if (q) {
      if (current && current.answer) faq.push(current)
      current = { question: stripMarkdown(q[1]), answer: '' }
    } else if (current && line && line !== '---') {
      current.answer = (current.answer + ' ' + stripMarkdown(line)).trim()
    }
  }
  if (current && current.answer) faq.push(current)
  return faq
}

function postFiles() {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
}

function parse(fileName) {
  const slug = fileName.replace(/\.md$/, '')
  const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')
  const { data, content } = matter(fileContents)
  return {
    slug,
    title: data.title || slug,
    date: toDateString(data.date),
    updated: toDateString(data.updated) || toDateString(data.date),
    description: data.description || '',
    keyword: data.keyword || null,
    topic: data.topic || null,
    video: data.video || null,
    videoTitle: data.videoTitle || null,
    image: data.image || null,
    imageAlt: data.imageAlt || data.title || '',
    draft: Boolean(data.draft),
    readingTime: readingTime(content),
    content,
  }
}

function visible(post) {
  return isDev || !post.draft
}

export function getAllPosts() {
  return postFiles()
    .map(parse)
    .filter(visible)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug) {
  const post = parse(`${slug}.md`)
  return { ...post, faq: extractFaq(post.content) }
}

export function getAllSlugs() {
  return postFiles()
    .map(parse)
    .filter(visible)
    .map((p) => ({ params: { slug: p.slug } }))
}

// Same topic first, then newest.
export function getRelatedPosts(slug, topic, limit = 3) {
  const others = getAllPosts().filter((p) => p.slug !== slug)
  const sameTopic = topic ? others.filter((p) => p.topic === topic) : []
  const rest = others.filter((p) => !sameTopic.includes(p))
  return [...sameTopic, ...rest].slice(0, limit)
}
