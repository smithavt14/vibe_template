# Supabase Setup Guide

> **Detailed Setup Guide**: This document provides comprehensive instructions for setting up Supabase with your Vibe Template project. For a quick overview, see the [main README](../README.md).

This guide will help you set up Supabase for your Vibe Template project using the modern connector approach.

## 1. Create a Supabase Project

1. Go to [database.new](https://database.new) and create a new Supabase project
2. When your project is up and running, you'll automatically get your connection details

## 2. Set Up Your Database Schema

### Understanding Supabase Authentication

When you enable Supabase Authentication, it automatically creates an `auth.users` table that contains:
- User ID (UUID)
- Email, phone
- Provider information (google, github, etc.)
- Email confirmation status
- Authentication metadata
- Timestamps

**You don't need to create a users table yourself** - Supabase manages this automatically.

### Creating Your Profile Table

The template includes a `profiles` table that references Supabase's auth users for additional user data:

```bash
# Generate the migration files from your schema
pnpm db:generate

# Push the schema to your Supabase database
pnpm db:push
```

This will create:
- **profiles** table (linked to Supabase's auth.users for additional user data like display_name, avatar_url, bio)

The profiles table uses the auth user's UUID as a foreign key, which is the recommended pattern for extending user data in Supabase applications.

You can modify the schemas in `db/schema/` and re-run the commands to update your database.

## 3. Get Your Connection Variables

In your Supabase dashboard, the connector will show you the exact values you need:

- **Project URL**: Your unique Supabase URL
- **Anon Key**: Your public anonymous key

## 4. Configure Environment Variables

Your `.env.local` file should already exist. Simply update it with your actual Supabase credentials:

```env
# Copy these values from your Supabase project connector
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-database-connection-string

# These are optional for basic usage
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Only if you need admin operations
SUPABASE_PROJECT_ID=your-project-ref
DATABASE_URL=your-database-connection-string     # Only if using direct database access
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Minimal setup** only requires:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. Test Your Connection

You can test your connection by creating a simple query. After setting up authentication and creating some users, you can query both the auth users and profiles:

**Create `app/test-db/page.tsx`:**
```tsx
import { createClient } from '@/lib/supabase/server'

export default async function TestDatabase() {
  const supabase = await createClient()
  
  // Test profiles table
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")

  // Test auth users (requires service role key for admin access)
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Profiles Table</h2>
        {profilesError ? (
          <div className="text-red-500">Error: {profilesError.message}</div>
        ) : (
          <pre className="bg-base-200 p-4 rounded text-sm">
            {JSON.stringify(profiles, null, 2)}
          </pre>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Auth Users (Admin View)</h2>
        {authError ? (
          <div className="text-red-500">Error: {authError.message}</div>
        ) : (
          <pre className="bg-base-200 p-4 rounded text-sm">
            {JSON.stringify(authUsers?.users?.map(u => ({ 
              id: u.id, 
              email: u.email, 
              created_at: u.created_at 
            })) || [], null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
```

## 6. Start the App and Test

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Visit your test page at `http://localhost:3000/test-db`
3. You should see your profiles data displayed in JSON format (likely empty initially)

## 7. Authentication Setup

### How Supabase Authentication Works

Supabase provides a complete authentication system that:

1. **Automatically manages the `auth.users` table** - stores core authentication data
2. **Handles all auth flows** - login, signup, password reset, email confirmation
3. **Supports multiple providers** - email/password, OAuth (Google, GitHub, etc.)
4. **Manages sessions** - JWT tokens, refresh tokens, session persistence

### Your Profile Table Pattern

The recommended pattern (which this template follows) is:

1. **Supabase manages authentication** via `auth.users` table
2. **Your app manages additional user data** via a `profiles` table that references the auth user ID
3. **Automatic profile creation** when users sign up (via database triggers or application logic)

### Setting Up Authentication

1. **Enable Authentication** in your Supabase dashboard:
   - Go to Authentication > Settings
   - Configure your site URL: `http://localhost:3000` (development) 
   - Add redirect URLs as needed

2. **Configure providers** you want to support:
   - Email/Password (enabled by default)
   - OAuth providers (Google, GitHub, etc.)

3. **Set up profile creation** - you can create a database trigger to automatically create a profile when a user signs up:

```sql
-- Run this in your Supabase SQL Editor
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

4. **Test the authentication** at `http://localhost:3000/login`

### OAuth Setup Example (Google):
1. Go to **Authentication > Providers** in Supabase
2. Enable "Google"
3. Add your Google OAuth credentials from Google Console
4. Add redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

## 8. Understanding the User Data Architecture

### Why Separate `auth.users` and `profiles` Tables?

This is the **recommended pattern** for Supabase applications:

**`auth.users` table (managed by Supabase):**
- Contains authentication-specific data: email, password hashes, provider info
- Managed entirely by Supabase Auth system
- You cannot modify this table structure
- Includes: `id`, `email`, `email_confirmed_at`, `last_sign_in_at`, `raw_app_meta_data`, `raw_user_meta_data`, etc.

**`profiles` table (managed by your app):**
- Contains application-specific user data: display names, avatars, preferences, etc.
- References the auth user via `user_id` foreign key
- Fully customizable to your app's needs
- Examples: `display_name`, `avatar_url`, `bio`, `preferences`, `subscription_tier`, etc.

### Benefits of This Pattern:

1. **Separation of Concerns**: Auth data vs. app data
2. **Flexibility**: Customize user profiles without touching auth system
3. **Security**: Auth table is protected, your profile table has custom RLS policies
4. **Scalability**: Can have multiple related tables (user_preferences, user_settings, etc.)

### No Database Migrations Needed for Auth

When you enable Supabase Authentication, the `auth.users` table is created automatically. You only need to run migrations for your own tables (like `profiles`).

## 9. Development Workflow

### Working with User Data

1. **User signs up** → Supabase creates entry in `auth.users`
2. **Trigger creates profile** → Automatic profile creation in your `profiles` table
3. **App queries both** → Use joins or separate queries as needed
4. **User updates profile** → Your app updates the `profiles` table

### Working with Drizzle ORM

For the profiles table and any additional tables:

1. Define your schema in `db/schema/`
2. Generate migrations: `pnpm db:generate`
3. Push to database: `pnpm db:push`
4. View your data: `pnpm db:studio`

## Common Issues

### Connection Issues
- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure your Supabase project is running (not paused)
- Verify RLS policies allow the operations you're trying to perform

### Authentication Issues
- Ensure middleware is commented out during development
- Check that auth providers are properly configured in Supabase
- Verify redirect URLs match your app URL

## Next Steps

Your Supabase integration is now complete! You can:

- **Add more tables** using the Table Editor
- **Set up authentication** when ready
- **Implement real-time features** with Supabase subscriptions
- **Add file storage** for images/documents
- **Create API routes** for server-side operations

Check the `/rules` directory for more development patterns and best practices. 