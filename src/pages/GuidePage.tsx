import { useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'

const guides = import.meta.glob('../content/guides/*.md', { query: '?raw', import: 'default' })

export function GuidePage() {
  const { slug } = useParams()
  
  if (!slug) return <Navigate to="/" replace />
  
  const guidePath = `../content/guides/${slug}.md`
  const getGuide = guides[guidePath] as (() => Promise<string>) | undefined
  
  if (!getGuide) return <Navigate to="/" replace />

  // We could fetch it asynchronously, but since we are replacing the logic here for simplicity,
  // let's do a fast sync require equivalent or standard async load.
  // Actually, standard Vite lazy loading mechanism is better.
  
  return (
    <GuideLoader getGuide={getGuide} />
  )
}

function GuideLoader({ getGuide }: { getGuide: () => Promise<string> }) {
  const [content, setContent] = useState('')
  const [meta, setMeta] = useState({ title: '', description: '', date: '' })

  useEffect(() => {
    getGuide().then(raw => {
      const match = raw.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
      if (match) {
        const fm = match[1];
        const tMatch = fm.match(/title:\s*"(.*?)"/);
        const dMatch = fm.match(/description:\s*"(.*?)"/);
        const dateMatch = fm.match(/date:\s*"(.*?)"/);
        setMeta({
          title: tMatch ? tMatch[1] : '',
          description: dMatch ? dMatch[1] : '',
          date: dateMatch ? dateMatch[1] : ''
        });
      }

      const cleanContent = raw.replace(/^---[\s\S]*?---/, '').trim()
      setContent(cleanContent)
    })
  }, [getGuide])

  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": meta.title || "InboxCraft Guide",
    "description": meta.description || "Guide on utilizing Outlook rules efficiently.",
    "datePublished": meta.date,
    "author": {
      "@type": "Organization",
      "name": "InboxCraft"
    },
    "image": [
      "https://inboxcraft.app/og-image.png"
    ],
    "recipeIngredient": [
      "Target email addresses",
      "Microsoft Outlook",
      "InboxCraft Generator"
    ],
    "recipeInstructions": [
      {
        "@type": "HowToStep",
        "name": "Follow along with the guide",
        "text": meta.description || "Follow the detailed steps and insights inside the article."
      }
    ]
  };

  return (
    <main className="flex flex-col flex-1 items-center justify-start bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {meta.title && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <section className="relative w-full pt-36 sm:pt-44 pb-16 px-4 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(83,58,253,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(83,58,253,0.15),transparent)]" />
      </section>
      <div className="w-full max-w-4xl px-4 sm:px-8 pb-32 animate-slide-up-fade -mt-20">
        <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/50 rounded-3xl p-8 sm:p-14 border border-slate-200 dark:border-slate-800">
          <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-[300] prose-a:text-[#533afd] hover:prose-a:text-[#4434d4] prose-h1:text-[2.5rem] prose-h1:leading-tight prose-h1:mb-8 prose-h2:mt-12 prose-img:rounded-xl">
            {content ? <ReactMarkdown>{content}</ReactMarkdown> : <div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}
          </article>
        </div>
      </div>
    </main>
  )
}
