import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface AvatarProps {
  size?: 'small' | 'medium' | 'large'
}

export default async function Avatar({ size = 'medium' }: AvatarProps) {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  // Get size classes
  const sizeClasses = {
    small: 'w-8',
    medium: 'w-10', 
    large: 'w-12'
  }
  
  const avatarSize = sizeClasses[size];
  
  if (!user) {
    return (
      <Link href="/login">
        <div tabIndex={0} className="avatar avatar-placeholder cursor-pointer">
          <div className={`bg-neutral text-neutral-content ${avatarSize} rounded-full`}>
            <span>U</span>
          </div>
        </div>
      </Link>
    );
  }

  // Get user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const displayChar = profile?.display_name?.charAt(0)?.toUpperCase() || 
                     user.email?.charAt(0)?.toUpperCase() || 
                     '?';

  return (
    <Link href="/profile">
      <div tabIndex={0} className={`avatar cursor-pointer ${profile?.avatar_url ? '' : 'avatar-placeholder'}`} title="View Profile">
        <div className={`${avatarSize} rounded-full bg-neutral text-neutral-content`}>
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" />
          ) : (
            <span>{displayChar}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
