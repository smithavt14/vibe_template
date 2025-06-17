"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  user_id: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

interface ProfileFormProps {
  profile: Profile | null
  userId: string
}

export default function ProfileForm({ profile, userId }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const profileData = {
        user_id: userId,
        display_name: displayName.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        bio: bio.trim() || null,
        updated_at: new Date().toISOString()
      }

      let error
      if (profile) {
        // Update existing profile
        const result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', userId)
        error = result.error
      } else {
        // Create new profile
        const result = await supabase
          .from('profiles')
          .insert(profileData)
        error = result.error
      }

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An error occurred' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Display Name</span>
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your display name"
            maxLength={50}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Avatar URL</span>
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://example.com/your-avatar.jpg"
          />
          <label className="label">
            <span className="label-text-alt">Paste a link to your avatar image</span>
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Bio</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Tell us about yourself..."
            maxLength={500}
          />
          <label className="label">
            <span className="label-text-alt">{bio.length}/500 characters</span>
          </label>
        </div>

        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
          
          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-outline btn-error"
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  )
} 