import Container from "@/components/container";
import { Section } from "@/components/section";
import { isEnvConfigured } from "@/lib/env";

export default function Home() {
  // Show setup instructions if environment variables are not configured
  if (!isEnvConfigured) {
    return (
      <Section className="flex flex-col items-center justify-center">
        <Container className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            🚀 Welcome to Your New Template!
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            This template is built with Next.js, TypeScript, Tailwind CSS,
            DaisyUI, Supabase, and Drizzle ORM
          </p>

          {/* Setup Instructions */}
          <div className="card bg-warning/10 border border-warning/20 shadow-xl max-w-2xl mx-auto">
            <div className="card-body">
              <div className="flex items-center justify-center mb-4">
                <div className="badge badge-warning gap-2">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/></svg>
                  Setup Required
                </div>
              </div>
              
              <h2 className="card-title justify-center text-2xl mb-4">
                🔧 Environment Configuration Needed
              </h2>
              
              <p className="text-base-content/80 mb-6">
                To get started, you need to set up your environment variables:
              </p>

              <div className="steps steps-vertical lg:steps-horizontal w-full mb-6">
                <div className="step step-primary">Copy .env.example</div>
                <div className="step step-primary">Add Supabase credentials</div>
                <div className="step step-primary">Restart your dev server</div>
              </div>

              <div className="text-left space-y-4">
                <div className="mockup-code text-sm">
                  <pre data-prefix="$" className="text-warning"><code>cp .env.example .env</code></pre>
                </div>
                
                <p className="text-sm text-base-content/70">
                  Then edit your <code className="bg-base-200 px-2 py-1 rounded">.env</code> file with your Supabase project credentials:
                </p>
                
                <div className="mockup-code text-sm">
                  <pre data-prefix="1"><code>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</code></pre>
                  <pre data-prefix="2"><code>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</code></pre>
                  <pre data-prefix="3"><code>DATABASE_URL=postgresql://postgres.your-project...</code></pre>
                </div>
              </div>

              <div className="card-actions justify-center mt-6 gap-3">
                <a
                  href="https://supabase.com/dashboard/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Create Supabase Project
                </a>
                <a 
                  href="/docs/supabase-setup.md" 
                  target="_blank"
                  className="btn btn-outline"
                >
                  Setup Guide
                </a>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">📚 Documentation</h3>
                <p className="text-sm text-base-content/70">Learn about the template structure and features</p>
                <div className="card-actions justify-center">
                  <a href="/rules" className="btn btn-sm btn-outline">View Guide</a>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">🎨 Styling</h3>
                <p className="text-sm text-base-content/70">Explore DaisyUI components and themes</p>
                <div className="card-actions justify-center">
                  <a href="https://daisyui.com/" target="_blank" className="btn btn-sm btn-outline">DaisyUI Docs</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Original content when environment is configured
  return (
    <Section className="flex flex-col items-center justify-center">
      <Container className="text-center">
          <h1>
            You&apos;re up and running! 🎉
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            This template is built with Next.js, TypeScript, Tailwind CSS,
            DaisyUI, Supabase, and Drizzle ORM
          </p>

          {/* Supabase Connection Prompt */}
          <div className="card bg-base-200 shadow-xl max-w-lg mx-auto">
            <div className="card-body card-xl">
              <h2 className="card-title justify-center text-primary">
                🗄️ Connect Your Database
              </h2>
              <p className="text-base-content/70">
                To get started, connect your Supabase project by updating your
                environment variables.
              </p>

              <div className="text-left mt-4">
                <div className="mockup-code text-sm">
                  <pre data-prefix="1">
                    <code>NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co</code>
                  </pre>
                  <pre data-prefix="2">
                    <code>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1Q...</code>
                  </pre>
                  <pre data-prefix="3">
                    <code>DATABASE_URL=postgresql://postgres.abc123:pwd@aws...</code>
                  </pre>
                </div>
              </div>

              <div className="card-actions justify-center mt-4">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Open Supabase Dashboard
                </a>
                <a href="/login" className="btn btn-outline">
                  Test Authentication
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="stats shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Documentation</div>
                <div className="stat-value text-primary">📚</div>
                <div className="stat-desc">
                  <a href="/rules" className="link link-primary">
                    View Guide
                  </a>
                </div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Styling</div>
                <div className="stat-value text-accent">🎨</div>
                <div className="stat-desc">
                  <a
                    href="https://daisyui.com/"
                    target="_blank"
                    className="link link-accent"
                  >
                    DaisyUI Docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
    </Section>
  );
}
