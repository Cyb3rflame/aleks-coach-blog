// components/MdxComponents.js
// Extra bits you can use inside a post's markdown:
//   <Video id="bunny-video-id" caption="What to watch for" />
//   <Video id="bunny-video-id" vertical />        (for 9:16 phone clips)
//   <FreeAnalysis />                               (mid-post call to action)
//   <Tip>Short coaching cue here</Tip>
// Normal markdown images become captioned figures:
//   ![Alt text describing the image](/blog/post-slug/image.webp "Optional caption")

import { bunnyEmbed } from '../lib/site'

const ALLOW = 'accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen'

// id = Bunny video ID. src = a video file in /public instead (e.g. /blog/slug/video.mp4).
export function Video({ id, src, poster, caption, vertical = false }) {
  if (!id && !src) return null
  return (
    <figure className={vertical ? 'post-video vert' : 'post-video'}>
      <div className="frame">
        {id ? (
          <iframe src={bunnyEmbed(id)} loading="lazy" allow={ALLOW} allowFullScreen title={caption || 'Video breakdown'} />
        ) : (
          <video src={src} poster={poster} controls playsInline preload="metadata" title={caption || 'Video breakdown'} />
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function FreeAnalysis({ title, text }) {
  return (
    <aside className="inline-cta">
      <div>
        <strong>{title || 'Struggling with this in your own game?'}</strong>
        <p>{text || 'Send me a clip of the stroke. I will send back a free 5 minute breakdown of what is going wrong and what to fix first.'}</p>
      </div>
      <a className="btn btn-red" href="/freeanalysis">Get my free analysis</a>
    </aside>
  )
}

export function Tip({ children }) {
  return <div className="tip">{children}</div>
}

function PostImage({ src, alt = '', title }) {
  return (
    <figure className="post-img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  )
}

// Markdown wraps images in <p>, and a <figure> inside a <p> is invalid HTML.
function Paragraph({ children }) {
  const kids = Array.isArray(children) ? children : [children]
  const onlyImage = kids.length === 1 && kids[0]?.type === PostImage
  if (onlyImage) return <>{children}</>
  return <p>{children}</p>
}

export const mdxComponents = {
  Video,
  FreeAnalysis,
  Tip,
  img: PostImage,
  p: Paragraph,
}
