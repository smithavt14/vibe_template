import Link from 'next/link'
import Container from '@/components/container'
import { Section } from '@/components/section'

export default function DocsPage() {
  const docs = [
    {
      title: "AI Agent Development Guide",
      description: "Learn how to use this template with AI assistants for rapid development. Covers the rules system, workflow patterns, and best practices for AI collaboration.",
      href: "/docs/ai-agent-guide",
      icon: "🤖",
      featured: true,
      tags: ["AI", "Workflow", "Getting Started"]
    },
    {
      title: "Supabase Setup Guide",
      description: "Complete guide for setting up Supabase with your Vibe Template project. Includes environment configuration, database migrations, and authentication setup.",
      href: "/docs/supabase-setup",
      icon: "🗄️",
      featured: false,
      tags: ["Setup", "Database", "Authentication"]
    }
  ]

  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="breadcrumbs text-sm">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-4 text-base-content">
              📚 Documentation
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Everything you need to know about using the Vibe Template for rapid development with modern web technologies.
            </p>
          </div>

          {/* Featured Guide */}
          {docs.filter(doc => doc.featured).map((doc) => (
            <div key={doc.href} className="mb-8">
              <div className="badge badge-primary mb-4">Featured Guide</div>
              <Link href={doc.href}>
                <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{doc.icon}</div>
                      <div className="flex-1">
                        <h2 className="card-title text-2xl mb-2 text-base-content">
                          {doc.title}
                        </h2>
                        <p className="text-base-content/80 mb-4">
                          {doc.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doc.tags.map((tag) => (
                            <div key={tag} className="badge badge-primary badge-outline">
                              {tag}
                            </div>
                          ))}
                        </div>
                        <div className="card-actions">
                          <span className="btn btn-primary">
                            Read Guide →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* All Guides */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-base-content">
              All Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map((doc) => (
                <Link key={doc.href} href={doc.href}>
                  <div className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                    <div className="card-body">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{doc.icon}</div>
                        <h3 className="card-title text-xl text-base-content">
                          {doc.title}
                        </h3>
                      </div>
                      <p className="text-base-content/70 text-sm mb-4 flex-1">
                        {doc.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doc.tags.map((tag) => (
                          <div key={tag} className="badge badge-ghost badge-sm">
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="card-actions">
                        <span className="btn btn-ghost btn-sm">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="border-t border-base-300 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-base-content">
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-base-200 shadow">
                <div className="card-body text-center">
                  <div className="text-2xl mb-2">📁</div>
                  <h3 className="card-title justify-center text-lg">Rules System</h3>
                  <p className="text-sm text-base-content/70 mb-4">
                    Explore the technical patterns and conventions on GitHub
                  </p>
                  <div className="card-actions justify-center">
                    <a 
                      href="https://github.com/smithavt14/vibe_template/tree/main/rules" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      Browse Rules
                    </a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 shadow">
                <div className="card-body text-center">
                  <div className="text-2xl mb-2">🛠️</div>
                  <h3 className="card-title justify-center text-lg">Development Guide</h3>
                  <p className="text-sm text-base-content/70 mb-4">
                    Technical development workflow and patterns on GitHub
                  </p>
                  <div className="card-actions justify-center">
                    <a 
                      href="https://github.com/smithavt14/vibe_template/blob/main/rules/development-guide.mdc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      View Guide
                    </a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 shadow">
                <div className="card-body text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <h3 className="card-title justify-center text-lg">Daisy UI Docs</h3>
                  <p className="text-sm text-base-content/70 mb-4">
                    DaisyUI components and design system
                  </p>
                  <div className="card-actions justify-center">
                    <a 
                      href="https://daisyui.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      DaisyUI Docs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-base-300 text-center">
            <p className="text-base-content/60 mb-4">
              Need help or have questions? Feel free to reach out or contribute to the documentation.
            </p>
            <Link href="/" className="btn btn-ghost">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export const metadata = {
  title: 'Documentation',
  description: 'Complete documentation for the Vibe Template - guides, setup instructions, and development patterns',
} 