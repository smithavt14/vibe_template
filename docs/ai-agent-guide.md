# AI Agent Development Guide

## Overview

This **Vibe Template** is specifically designed for **AI-assisted development**. It includes a comprehensive rules system that helps AI agents understand your project structure, patterns, and conventions to provide consistent, high-quality code assistance.

## 🤖 AI-First Architecture

The AI agent follows a **6-step routine** for every new project or feature to ensure organized, successful development:

### Step 1: 🎯 Idea Analysis & Requirements Gathering

**What the agent does:**
- Analyzes your idea or feature request
- Asks clarifying questions about your goals and requirements
- Identifies the core problem your application should solve

**Example interaction:**
```text
User: "I want to build a task management app"

Agent: "I'd love to help you build a task management app! 
Let me gather some details to ensure we create exactly what you need:

1. Who will be using this app? (personal, team, business)
2. What's the main pain point you're trying to solve?
3. What are the 2-3 most essential features users need?"
```

---

### Step 2: 📋 MVP Planning & Development Strategy

**What the agent does:**
- **Leads MVP Definition Discussion**: Helps you define the Minimum Viable Product
- **Phase-Based Planning**: Breaks development into manageable phases
- **Scope Management**: Focuses on "what's the simplest version that proves the concept?"

**MVP Guidelines the agent follows:**
- Basic user interface with 1-3 core screens
- Essential user flow (sign up → main action → basic result)
- Simple database schema with core entities
- Basic authentication if needed
- Minimal but functional styling with DaisyUI components

**Example MVP definition:**
```text
For a task management app:

Phase 1 (MVP):
- User can sign up/login
- User can create, view, and mark tasks as complete
- Simple dashboard showing active tasks
- Basic task creation form

Phase 2+ (Future):
- Task categories, due dates, priorities
- Team collaboration, sharing
- Advanced filtering and search
```

---

### Step 3: 📝 Development Planning & Task Creation

**What the agent does:**
- Checks for existing plan in `tasks/plan.md`
- Creates comprehensive coding todo list if none exists
- Writes specific, actionable tasks in priority order
- Defines clear "MVP complete" criteria

**Planning format the agent uses:**
```text
|Index|Status|Description                              |Priority|Depends|
|-----|------|-----------------------------------------|--------|-------|
|  1  |  ⏳  |Create database schema for tasks table   |High    |       |
|  2  |  ⏳  |Build user authentication with Supabase  |High    |       |
|  3  |  ⏳  |Create task creation form component      |High    |1,2    |
|  4  |  ⏳  |Build task dashboard page                |Medium  |1,2    |
```

**For each task, the agent specifies:**
- Exact files/components to create or modify
- Dependencies between tasks
- Why each task is important for your goals

---

### Step 4: ⚙️ Implementation & Git Workflow

**What the agent does:**
- Solves **one task at a time** from the plan
- Follows established code patterns and conventions
- Creates commits at logical milestones
- Updates progress tracking files

**Commit strategy the agent follows:**
- **Frequency**: After completing individual features/components
- **Messages**: Clear, descriptive format like `feat: add user authentication with Supabase`
- **Milestones**: Always commits after each major phase completion

**Progress tracking:**
- ✅ Marks completed tasks in `tasks/plan.md`
- 📝 Updates `tasks/current.md` with current state
- 📚 Appends completed work to `tasks/history.md`

---

### Step 5: 🧪 Testing & Validation

**What the agent does:**
- Prompts you to test after each phase completion
- Provides clear, step-by-step testing instructions
- Clearly communicates what should and shouldn't work yet

**Testing template the agent uses:**
```text
Phase 1 is complete! Please test the current implementation:

🧪 TO TEST:
- Sign up with email/password
- Create a new task
- Mark task as complete

✅ SHOULD WORK:
- User registration and login
- Basic task creation and completion
- Task list display

⚠️ NOT IMPLEMENTED YET:
- Task categories (Phase 2)
- Due dates (Phase 2)
- Team sharing (Phase 3)

📋 HOW TO RUN:
1. Run `pnpm dev`
2. Navigate to localhost:3000
3. Click "Sign Up" to create account
```

---

### Step 6: 🔄 Progress Review & Next Steps

**What the agent does:**
- Reviews completed phase against original goals
- Updates all project tracking files
- Clearly marks MVP milestones
- Plans next phase based on your feedback

**End-of-phase checklist:**
- ✅ All planned tasks completed
- ✅ Code committed with meaningful messages
- ✅ Progress files updated
- ✅ Testing instructions provided
- ✅ User feedback collected

---

## 📊 Project Tracking System

The agent maintains three key files to track your project:

### `tasks/plan.md`
- **Master todo list** with all planned features
- **Status tracking** (⏳ Pending, 🔄 In Progress, ✅ Complete)
- **Dependencies** showing task relationships
- **Priorities** to guide development order

### `tasks/current.md`
- **Current project state** and active work
- **Recent progress** and immediate next steps
- **Blockers or decisions** that need your input

### `tasks/history.md`
- **Completed work log** for project history
- **Milestone tracking** showing major achievements
- **Reference for decisions** made during development

---

## 💡 How to Work Effectively with the Agent

### ✅ Best Practices

**For Planning:**
- Be specific about your goals and requirements
- Trust the MVP definition process
- Don't skip the planning phase

**During Development:**
- Test each phase when prompted
- Provide feedback on the implementation
- Ask questions if something isn't clear

**For Communication:**
- Start new chats after major phases to keep context fresh
- Reference specific rule files when needed: "Use the auth patterns for user registration"
- Return to MVP focus if development gets off-track: "Let's refocus on Phase 1 requirements"

### 🚫 What to Avoid

- Asking for large, complex features all at once
- Skipping testing and validation steps
- Jumping ahead without completing current phase
- Ignoring the planning structure

---

## 🎯 Key Agent Principles

The agent **always follows** these core principles:

1. **One Task at a Time**: Solves individual tasks before moving to the next
2. **MVP First**: Prioritizes core functionality that users can engage with immediately
3. **Phase-Based Development**: Builds in logical, testable increments
4. **Clear Communication**: Explains what's being implemented and why
5. **Progress Tracking**: Maintains accurate project state and history
6. **User Validation**: Ensures each phase works before proceeding

---

**Ready to build? Share your idea and let the agent guide you through the structured development process!** 🚀 