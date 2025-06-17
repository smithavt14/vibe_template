# AI Agent Development Guide

## Overview

This **Vibe Template** is specifically designed for **AI-assisted development**. It includes a comprehensive rules system that helps AI agents understand your project structure, patterns, and conventions to provide consistent, high-quality code assistance.

## 🤖 AI-First Architecture

### What Makes This Template Special

- **Smart Rules System**: Pre-configured development patterns that AI agents can follow
- **Structured Conventions**: Consistent file organization and naming patterns
- **Context-Aware Documentation**: Technical patterns that guide AI decision-making
- **Rapid Prototyping**: MVP-focused development workflow designed for AI collaboration

### Key Benefits

✅ **Consistent Code Quality** - AI follows established patterns  
✅ **Faster Development** - Reduced back-and-forth with clear conventions  
✅ **Better Collaboration** - Standardized approaches across features  
✅ **Maintainable Codebase** - Well-documented patterns and structures  

---

## 📋 The Cursor Rules System

The `.cursor/rules` directory contains the "brain" of your AI assistant. These files teach AI agents how to work with your specific project.

### Core Files

#### `development-guide.mdc`
The **master playbook** for AI development workflow:

```tree
📁 rules/
├── development-guide.mdc     ← Main workflow & conventions
└── technical/               ← Detailed implementation patterns
    ├── auth-patterns.mdc
    ├── component-patterns.mdc
    ├── database-patterns.mdc
    ├── design-patterns.mdc
    ├── environment-setup.mdc
    └── server-actions.mdc
```

#### Technical Pattern Files
Specialized guides for specific aspects:
- **Auth Patterns**: Supabase authentication, RLS, session management
- **Component Patterns**: React component structure, client/server patterns
- **Database Patterns**: Drizzle ORM, schema design, CRUD operations
- **Design Patterns**: DaisyUI components, responsive design, accessibility
- **Server Actions**: Form handling, validation, error management

### How AI Agents Use These Rules

1. **Project Understanding**: Agents read the rules to understand your stack and conventions
2. **Pattern Following**: They apply consistent patterns from the technical guides
3. **Workflow Adherence**: They follow the development routine from the main guide
4. **Context Awareness**: They understand file organization and naming conventions

---

## 🚀 Getting Started Workflow

### Step 1: Idea to MVP Planning

When starting a new project or feature:

1. **Share Your Idea**: Describe what you want to build
2. **AI-Guided MVP Definition**: The agent will help you define the Minimum Viable Product
3. **Phase-Based Planning**: Break down development into manageable phases
4. **Task Creation**: Generate a comprehensive todo list in `tasks/plan.md`

**Example Interaction:**
```text
User: "I want to build a task management app"

AI: "I'd love to help you build a task management app! Let me gather some details to ensure we create exactly what you need...[continued]"
```

### Step 2: Development Phases

The AI follows this routine for each development session:

1. **Check Current Plan**: Review `tasks/plan.md` for next priorities
2. **Implement Features**: Follow technical patterns for consistent code
3. **Update Progress**: Mark completed tasks and update current state
4. **Test & Validate**: Provide clear testing instructions
5. **Git Commits**: Create meaningful commits at logical milestones

---

## 💡 Best Practices for AI Collaboration

### Effective Communication

**✅ DO:**
- Be specific about your requirements
- Ask for MVP definition early
- Request testing instructions
- Provide feedback on generated code

**❌ DON'T:**
- Ask for large, complex features all at once
- Skip the planning phase
- Ignore the testing/validation steps

### Leveraging the Rules System

**When to Reference Rules:**
```
"Follow the component patterns to create a new dashboard"
"Use the auth patterns for user registration"
"Apply database patterns for the user profile schema"
```

**The AI automatically applies rules, but you can be explicit when needed.**

### Workflow Optimization

1. **Start Small**: Always begin with MVP definition
2. **Phase Development**: Build in logical increments
3. **Test Frequently**: Validate each phase before moving forward
4. **Document Changes**: Keep the rules updated as your project evolves

---

## 🛠️ Technical Stack & Conventions

### Core Technologies
- **Frontend**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **ORM**: Drizzle ORM
- **Forms**: Server Actions

### File Organization
```File System
app/                    # Next.js App Router pages
├── (route)/           # Route groups
├── _components/       # Route-specific components
└── globals.css        # Global styles

components/            # Shared UI components
├── ui/               # Base UI components
└── features/         # Feature-specific components

db/                   # Database layer
├── schema/           # Drizzle schemas
├── migrations/       # Auto-generated
└── db.ts            # Database client

actions/              # Server actions
├── db/              # Database operations
└── ...              # Other server actions

lib/                  # Utilities
├── supabase/        # Supabase clients
├── env.ts           # Environment validation
└── ...

types/               # TypeScript definitions
rules/               # AI development patterns (this guide!)
```

### Naming Conventions
- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Actions**: `createExampleAction`
- **Database**: `snake_case` tables, `camelCase` TypeScript

---

## 📚 Common Development Patterns

### Creating New Features

1. **Database First**: Design schema in `db/schema/`
2. **Server Actions**: Create CRUD operations in `actions/db/`
3. **Components**: Build UI components following design patterns
4. **Pages**: Compose server/client components

### Authentication Flow

1. **Setup**: Supabase auth configuration
2. **Middleware**: Protect routes with authentication
3. **Components**: Login/signup forms with proper validation
4. **RLS**: Row Level Security for data isolation

### Form Handling

1. **Server Actions**: Handle form submissions server-side
2. **Validation**: Use Zod for type-safe validation
3. **Error Handling**: Consistent error states and messages
4. **UX**: Loading states and success feedback

---

## 🎯 Example Workflows

### Building a Blog Feature

**Phase 1 (MVP):**
```
1. ⏳ Create posts schema (title, content, user_id)
2. ⏳ Build post creation form
3. ⏳ Create posts listing page
4. ⏳ Add basic post viewing
```

**AI Implementation:**
- Follows database patterns for schema design
- Uses server actions for CRUD operations
- Applies component patterns for UI
- Implements auth patterns for user isolation

### Adding User Profiles

**Phase 1 (MVP):**
```
1. ⏳ Extend user schema with profile fields
2. ⏳ Create profile editing form
3. ⏳ Build profile display component
4. ⏳ Add profile navigation
```

**AI Implementation:**
- Updates existing schema following database patterns
- Creates forms using design patterns
- Implements proper validation and error handling

---

## 🔧 Customizing the Rules

### Adding New Patterns

When you establish new conventions in your project:

1. **Document the Pattern**: Add to appropriate technical file
2. **Update Development Guide**: Include in main workflow if needed
3. **Train the AI**: Reference new patterns in future conversations

### Project-Specific Rules

Create additional `.mdc` files for your specific domain:

```
rules/
├── development-guide.mdc
├── technical/
│   └── ... (existing files)
└── project-specific/
    ├── business-logic.mdc
    ├── api-integrations.mdc
    └── deployment.mdc
```

---

## 🎉 Success Indicators

You'll know the AI collaboration is working well when:

- **Consistent Code**: All components follow the same patterns
- **Efficient Development**: Features are built quickly with minimal revisions
- **Clear Progress**: Each phase delivers working, testable functionality
- **Maintainable Results**: Code is well-organized and follows conventions

---

## 📞 Getting Help

### Troubleshooting

**If the AI isn't following patterns:**
- Reference specific rule files: "Use the auth patterns for this"
- Be more explicit: "Follow the component structure from rules/technical/component-patterns.mdc"

**If development gets off-track:**
- Return to MVP planning: "Let's refocus on the Phase 1 requirements"
- Check the plan: "What's next in tasks/plan.md?"

### Extending This Guide

This guide evolves with your project. Update it when you:
- Establish new development patterns
- Add new technologies or tools
- Discover better AI collaboration techniques

---

**Ready to build something amazing? Start by sharing your idea and let the AI guide you through MVP planning!** 🚀 