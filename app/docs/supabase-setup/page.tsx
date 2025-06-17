import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Container from '@/components/container'
import { Section } from '@/components/section'

export default async function SupabaseSetupPage() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), 'docs', 'supabase-setup.md')
  const markdownContent = await fs.readFile(markdownPath, 'utf8')

  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="breadcrumbs text-sm">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li>Supabase Setup</li>
              </ul>
            </div>
          </div>

          {/* Markdown Content */}
          <article className="prose prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content prose-strong:text-base-content prose-code:text-base-content prose-blockquote:text-base-content prose-li:text-base-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom component styling for better integration with DaisyUI
                h1: ({ children }) => (
                  <h1 className="text-4xl font-black mb-6 text-base-content">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-black mb-5 mt-8 text-base-content border-b border-base-300 pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold mb-4 mt-6 text-base-content">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <div className="alert my-4">
                    <div>{children}</div>
                  </div>
                ),
                code: ({ children, className, ...props }) => {
                  // Check if it's inline code (no className usually means inline)
                  const isInline = !className || !className.includes('language-')
                  
                  if (isInline) {
                    return (
                      <code className="bg-base-200 text-base-content px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    )
                  }
                  return (
                    <div className="not-prose my-6">
                      <div className="bg-base-300 rounded-t-lg px-4 py-2 text-sm text-base-content font-mono border-b border-base-content/10">
                        {className?.replace('language-', '') || 'code'}
                      </div>
                      <div className="bg-base-200 rounded-b-lg overflow-x-auto">
                        <pre className="p-4 text-sm leading-relaxed">
                          <code className={`${className} text-base-content font-mono`} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )
                },
                pre: ({ children }) => children, // Remove default pre styling since we handle it in code
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-1 my-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-1 my-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-base-content text-base">
                    {children}
                  </li>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="link link-primary" 
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </article>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-base-300">
            <div className="flex justify-between items-center">
              <Link href="/" className="btn btn-ghost">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export const metadata = {
  title: 'Supabase Setup Guide',
  description: 'Complete guide for setting up Supabase with your Vibe Template project',
} 