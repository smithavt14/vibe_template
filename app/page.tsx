import Container from "@/components/container";
import { Section } from "@/components/section";
import { isEnvConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db/db";
import { profilesTable } from "@/db/schema/profiles";

async function getSetupStatus() {
  if (!isEnvConfigured) {
    return { envConfigured: false, dbSetup: false, userAuthenticated: false };
  }

  let dbSetup = false;
  let userAuthenticated = false;

  try {
    // Check if database is set up by trying to query the profiles table
    await db.select().from(profilesTable).limit(1);
    dbSetup = true;
  } catch {
    // If query fails, database is not set up
    dbSetup = false;
  }

  try {
    // Check if user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userAuthenticated = !!user;
  } catch {
    userAuthenticated = false;
  }

  return { envConfigured: true, dbSetup, userAuthenticated };
}

export default async function Home() {
  const { envConfigured, dbSetup, userAuthenticated } = await getSetupStatus();

  // Show setup instructions if environment variables are not configured
  if (!envConfigured) {
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
                  href="/docs/supabase-setup" 
                  className="btn btn-outline"
                >
                  Setup Guide
                </a>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">🤖 AI Agent Guide</h3>
                <p className="text-sm text-base-content/70">Learn how to use this template with AI assistants</p>
                <div className="card-actions justify-center">
                  <a href="/docs/ai-agent-guide" className="btn btn-sm btn-primary">Start Here</a>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">📚 Documentation</h3>
                <p className="text-sm text-base-content/70">Learn about the template structure and features</p>
                <div className="card-actions justify-center">
                  <a href="/docs" className="btn btn-sm btn-outline">View Docs</a>
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

  // Show "all set up" UI when database and authentication are complete
  if (dbSetup && userAuthenticated) {
    return (
      <Section className="flex flex-col items-center justify-center">
        <Container className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            🎉 Congratulations! You&apos;re All Set Up!
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            Your template is fully configured with environment variables, database migrations, and user authentication. 
            You&apos;re ready to start building your app!
          </p>

          {/* Success Card */}
          <div className="card bg-success/10 border border-success/20 shadow-xl max-w-2xl mx-auto">
            <div className="card-body">
              <div className="flex items-center justify-center mb-4">
                <div className="badge badge-success gap-2">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  Setup Complete
                </div>
              </div>
              
              <h2 className="card-title justify-center text-2xl mb-4">
                ✅ Everything is Working!
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-base-100 rounded-lg">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="text-sm font-semibold">Environment</div>
                  <div className="text-xs text-success">Configured</div>
                </div>
                <div className="flex flex-col items-center p-4 bg-base-100 rounded-lg">
                  <div className="text-2xl mb-2">🗄️</div>
                  <div className="text-sm font-semibold">Database</div>
                  <div className="text-xs text-success">Migrated</div>
                </div>
                <div className="flex flex-col items-center p-4 bg-base-100 rounded-lg">
                  <div className="text-2xl mb-2">🔐</div>
                  <div className="text-sm font-semibold">Authentication</div>
                  <div className="text-xs text-success">Active</div>
                </div>
              </div>

              <p className="text-base-content/80 mb-6">
                Your template includes Next.js 14, TypeScript, Tailwind CSS, DaisyUI, Supabase, and Drizzle ORM. 
                You can now start building your application or learn more about the template structure.
              </p>

              <div className="card-actions justify-center gap-3">
                <a href="/profile" className="btn btn-primary">
                  View Your Profile
                </a>
                <a 
                  href="/docs" 
                  className="btn btn-outline"
                >
                  Template Docs
                </a>
              </div>
            </div>
          </div>

          {/* Clean Up Template Instructions */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="card bg-info/10 border border-info/20 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-center mb-4">
                  <div className="badge badge-info gap-2">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    Ready to Build
                  </div>
                </div>
                
                <h3 className="card-title justify-center text-xl mb-4">
                  🧹 Remove Template Files When Ready
                </h3>
                
                <p className="text-base-content/80 mb-4 text-center">
                  When you&apos;re ready to start building your own app, you can safely remove the template onboarding UI:
                </p>
                
                <div className="mockup-code text-sm mb-4">
                  <pre data-prefix="$" className="text-info"><code>rm -rf app/docs</code></pre>
                  <pre data-prefix="$" className="text-info"><code>rm app/page.tsx</code></pre>
                  <pre data-prefix="$" className="text-info"><code># Then create your own app/page.tsx</code></pre>
                </div>
                
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-sm">
                    This removes the welcome page and docs routes. You can still reference the <code>/docs</code> directory 
                    throughout the build process and remove it when you want to deploy your app.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">🤖 AI Development</h3>
                <p className="text-sm text-base-content/70 mb-4">
                  Learn how to build efficiently with AI agents using this template.
                </p>
                <div className="card-actions justify-center">
                  <a href="/docs/ai-agent-guide" className="btn btn-sm btn-primary">AI Agent Guide</a>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">🚀 Start Building</h3>
                <p className="text-sm text-base-content/70 mb-4">
                  Ready to customize this template for your needs? Check the cleanup guide above!
                </p>
                <div className="card-actions justify-center">
                  <a href="/docs/ai-agent-guide" className="btn btn-sm btn-outline">Development Guide</a>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">📚 Learn More</h3>
                <p className="text-sm text-base-content/70 mb-4">
                  Explore the template structure, patterns, and best practices.
                </p>
                <div className="card-actions justify-center">
                  <a href="/docs" className="btn btn-sm btn-outline">View Docs</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Show database setup instructions when environment is configured but database/auth is not
  return (
    <Section className="flex flex-col items-center justify-center">
      <Container className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            🎉 Environment Configured!
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            Great! Your environment variables are set up. Now let&apos;s get your database and authentication ready.
          </p>

          {/* Next Steps */}
          <div className="card bg-success/10 border border-success/20 shadow-xl max-w-2xl mx-auto">
            <div className="card-body">
              <div className="flex items-center justify-center mb-4">
                <div className="badge badge-success gap-2">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  Ready for Next Steps
                </div>
              </div>
              
              <h2 className="card-title justify-center text-2xl mb-4">
                🚀 Let&apos;s Set Up Your Database
              </h2>
              
              <p className="text-base-content/80 mb-6">
                Now that your environment is configured, follow these steps to complete the setup:
              </p>

              <div className="steps steps-vertical lg:steps-horizontal w-full mb-6">
                <div className={`step ${dbSetup ? 'step-success' : 'step-primary'}`}>
                  {dbSetup ? '✅ Database Ready' : 'Run Database Migrations'}
                </div>
                <div className={`step ${userAuthenticated ? 'step-success' : 'step-primary'}`}>
                  {userAuthenticated ? '✅ User Logged In' : 'Test Authentication'}
                </div>
                <div className="step step-primary">Start Building!</div>
              </div>

              <div className="text-left space-y-4">
                {!dbSetup && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">1. Run Database Migrations</h3>
                    <p className="text-sm text-base-content/70 mb-2">
                      Push your database schema to Supabase:
                    </p>
                    <div className="mockup-code text-sm">
                      <pre data-prefix="$" className="text-success"><code>pnpm db:push</code></pre>
                    </div>
                  </div>
                )}
                
                {dbSetup && !userAuthenticated && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">✅ Database Ready!</h3>
                    <p className="text-sm text-base-content/70 mb-2">
                      Great! Now test your authentication flow:
                    </p>
                  </div>
                )}

                {!userAuthenticated && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{dbSetup ? '2' : '2'}. Test Authentication</h3>
                    <p className="text-sm text-base-content/70 mb-2">
                      Make sure your authentication flow is working:
                    </p>
                  </div>
                )}
              </div>

              <div className="card-actions justify-center mt-6 gap-3">
                <a href="/login" className="btn btn-primary">
                  {userAuthenticated ? 'Go to Profile' : 'Test Login Flow'}
                </a>
                <a 
                  href="/docs/supabase-setup" 
                  className="btn btn-outline"
                >
                  Setup Guide
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">🤖 AI Agent Guide</h3>
                <p className="text-sm text-base-content/70">Learn how to use this template with AI assistants</p>
                <div className="card-actions justify-center">
                  <a href="/docs/ai-agent-guide" className="btn btn-sm btn-primary">Start Here</a>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">📚 Documentation</h3>
                <p className="text-sm text-base-content/70">Learn about the template structure and features</p>
                <div className="card-actions justify-center">
                  <a href="/docs" className="btn btn-sm btn-outline">View Docs</a>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-lg">🗄️ Database</h3>
                <p className="text-sm text-base-content/70">Manage your database schema and data</p>
                <div className="card-actions justify-center">
                  <a href="https://supabase.com/dashboard" target="_blank" className="btn btn-sm btn-outline">Supabase Dashboard</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
    </Section>
  );
}
