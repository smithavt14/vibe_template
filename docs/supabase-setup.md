# Supabase Setup Guide

> **Detailed Setup Guide**: This document provides comprehensive instructions for setting up Supabase with your Vibe Template project. For a quick overview, see the [main README](../README.md).

This guide will help you set up Supabase for your Vibe Template project using the modern connector approach.

## Why Supabase for This Project?

[Supabase](https://supabase.com/) is the perfect backend solution for this project. It provides a full PostgreSQL database with instant APIs, built-in authentication with Row Level Security, real-time subscriptions, and excellent TypeScript integration. The generous free tier (2 projects, 50k MAU) makes it ideal for development and small applications, while the intuitive dashboard and zero-config setup means you can focus on building your app instead of managing infrastructure. [View pricing details →](https://supabase.com/pricing)

## 1. Create a Supabase Project

1. Go to [database.new](https://supabase.com/dashboard/new/new-project) and create a new Supabase project

2. Once your project is ready, get your connection details:
   
   **Step 1: Get your App Framework variables**
   - In your project dashboard, click the **"Connect"** button in the header
   - In the modal that opens, go to the **"App Frameworks"** tab
   - Select **"Next.js"** and **"App Router"**
   - Copy the `.env` content provided
   
   **Step 2: Get your Database URL**
   - Still in the Connect modal, go to the **"ORM"** tab
   - Select **"Drizzle"**
   - Copy the `DATABASE_URL` provided (it will have `[password]` as a placeholder)
   
   **Step 3: Get your database password**
   - Go to **Project Settings** > **Configuration** > **Database**
   - Copy your database password (or reset it if you forgot it)
   - Replace `[password]` in your `DATABASE_URL` with your actual password (remove the brackets)

## 2. Configure Environment Variables

Create a `.env` file in your project root and add your Supabase credentials from the previous step:

> **Note**: We use `.env` (not `.env.local`) because Drizzle ORM needs access to the `DATABASE_URL` for schema operations.

```env
# Copy these values from your Supabase project connector
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-database-connection-string-with-actual-password

# These are optional for basic usage
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Only if you need admin operations
SUPABASE_PROJECT_ID=your-project-ref
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Minimal setup** only requires:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

## 3. Set Up Your Database Schema

### Understanding Supabase Authentication

Supabase automatically creates an `auth.users` table that contains core authentication data:
- User ID (UUID), email, phone
- Provider information (google, github, etc.)
- Email confirmation status and timestamps

**You don't need to create a users table yourself** - Supabase manages this automatically.

### Run the Migration

The template includes a single, comprehensive migration that sets up everything you need:

```bash
# Push the migration to your Supabase database
pnpm db:push
```

### ✨ What This Migration Creates

**📋 Profiles Table**
- Links to Supabase's `auth.users` for additional user data
- Fields: `display_name`, `avatar_url`, `bio`, timestamps
- Uses `user_id` as foreign key to `auth.users`

**🔄 Automatic Profile Creation**
- Database trigger that fires when users sign up
- Automatically creates a profile record
- Smart display name (uses metadata or falls back to email)

**🔒 Row Level Security (RLS)**
- Enables RLS on profiles table
- Creates policies so users can only access their own data
- Full CRUD protection (SELECT, INSERT, UPDATE, DELETE)

**All of this happens automatically with one migration - no manual setup required!**

## 4. Test Your Setup

Now let's test your setup by creating a user and updating their profile:

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Create a new user account:**
   - Visit `http://localhost:3000/login`
   - Click on "Sign up" or create a new account
   - Enter your email and password to create an account
   - You should be redirected to the home page

3. **Test the profile functionality:**
   - Visit `http://localhost:3000/profile`
   - Update your display name, avatar URL, and bio
   - Click "Save Profile"
   - You should see a success message

4. **Verify everything is working:**
   - The profile should save successfully
   - You should see your updated information displayed
   - Try signing out and signing back in to confirm persistence

## 5. Set Up Supabase MCP in Cursor (Optional)

Connect your AI tools to Supabase using the Model Context Protocol (MCP). This allows your AI assistants to interact with and query your Supabase projects on your behalf.

### Step 1: Create a Personal Access Token (PAT)

1. Go to your [Supabase settings](https://supabase.com/dashboard/account/tokens)
2. Create a personal access token
3. Give it a name that describes its purpose, like "Cursor MCP Server"
4. Copy the token (you'll need it in the next step)

### Step 2: Configure Cursor

1. **Create the MCP directory:**
   ```bash
   mkdir -p .cursor
   ```

2. **Create the MCP configuration file:**
   Create `.cursor/mcp.json` with the following content:
   ```json
   {
     "mcpServers": {
       "supabase": {
         "command": "npx",
         "args": [
           "-y",
           "@supabase/mcp-server-supabase@latest",
           "--access-token",
           "<personal-access-token>"
         ]
       }
     }
   }
   ```

3. **Update the configuration:**
   - Replace `<personal-access-token>` with your actual personal access token
   - Save the file

4. **Verify the connection:**
   - Open Cursor and navigate to Settings/MCP
   - You should see a green active status after the server is successfully connected

Once connected, your AI assistant can help you manage your Supabase projects, query databases, and more!

---

**🎉 Your Supabase integration is now complete!**

## Additional Resources

### Setting Up OAuth Providers (Optional)

If you want to add OAuth providers like Google or GitHub:

1. Go to **Authentication > Providers** in your Supabase dashboard
2. Enable the provider you want (e.g., "Google")
3. Add your OAuth credentials from the provider's console
4. Add the redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

### Advanced Database Patterns

**🔧 Extending the Schema**
You can modify the schemas in `db/schema/` and generate new migrations:
```bash
# After updating schema files
pnpm db:generate  # Creates new migration
pnpm db:push      # Applies to database
```

**🔍 Database Inspection**
```bash
pnpm db:studio    # Opens Drizzle Studio to view/edit data
```

**📊 Understanding the Security Model**
The RLS policies ensure that:
- Users can only see their own profile data
- API calls automatically filter by authenticated user
- No risk of data leakage between users
- All database operations are secure by default

### Next Steps

You can now:
- **Add more tables** using the Table Editor or by defining schemas in `db/schema/`
- **Implement real-time features** with Supabase subscriptions
- **Add file storage** for images/documents
- **Create API routes** for server-side operations

Check the `/rules` directory for more development patterns and best practices. 