import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/app/profile/profile-form'
import Avatar from '@/components/avatar'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login')
  }

  // Get user's profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar size="large" />
                <div>
                  <h2 className="text-xl font-semibold">
                    {profile?.display_name || 'No name set'}
                  </h2>
                  <p className="text-sm opacity-70">{user.email}</p>
                </div>
              </div>
            </div>

            <ProfileForm 
              profile={profile} 
              userId={user.id}
            />
          </div>
        </div>

        <div className="mt-6">
          <a href="/" className="btn btn-ghost">← Back to Home</a>
        </div>
      </div>
    </div>
  )
} 