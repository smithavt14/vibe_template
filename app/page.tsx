import Container from "@/components/container";
import { Section } from "@/components/section";

export default function Home() {
  return (
    <Section className="flex flex-col items-center justify-center">
      <Container className="text-center">
          <h1>
            You're up and running! 🎉
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
