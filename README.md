# Vibe Template

A sophisticated Next.js template with MVP-focused development workflow.

## Quick Start
1. Clone this template
2. `pnpm install`
3. Copy `.env.example` to `.env`
4. **[Set up Supabase](docs/supabase-setup.md)** - Follow the detailed guide for database setup
5. `pnpm dev`

## What's Included
- Pre-configured Next.js + TypeScript + Tailwind + DaisyUI
- Supabase + Drizzle ORM setup
- Comprehensive development rules in `/rules`
- MVP-focused development workflow
- Example components and patterns

## Documentation
- **[Supabase Setup Guide](docs/supabase-setup.md)** - Complete database and authentication setup
- **[Development Guide](rules/development-guide.mdc)** - MVP-focused development workflow
- **[Technical Rules](rules/technical/)** - Development patterns and best practices

## DaisyUI Integration

This template uses [DaisyUI](https://daisyui.com/components/) as our primary UI component library, providing 61+ semantic components that work beautifully with Tailwind CSS.

### Why DaisyUI over shadcn/ui?

**DaisyUI Advantages:**
- **Semantic HTML**: Uses proper semantic HTML with meaningful class names (`btn`, `card`, `hero`)
- **Zero JavaScript**: Pure CSS components with no JavaScript dependencies
- **Theme System**: Built-in theming with 32+ themes including dark mode support
- **Smaller Bundle**: No component copying means smaller bundle sizes
- **Design Consistency**: All components follow the same design language
- **Accessibility**: Built with accessibility in mind from the ground up

**vs shadcn/ui:**
- shadcn/ui requires copying components into your codebase
- DaisyUI provides ready-to-use components with consistent theming
- Better for rapid prototyping and MVP development
- Easier maintenance with centralized updates

### Current Theme Setup

The template is configured with:
- **Light theme**: `lofi` - Clean, minimal design
- **Dark theme**: `sunset` - Warm, vibrant colors
- **Theme switching**: Automatic with the `ThemeController` component

### Using DaisyUI Components

1. **Browse components**: Visit [daisyui.com/components](https://daisyui.com/components/)
2. **Choose a component**: Pick from 61+ available components
3. **Copy the HTML**: Use the semantic class names directly
4. **Create custom components**: Wrap in your own React components

### Example: Creating a Custom Card Component

```tsx
// components/feature-card.tsx
interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {icon && <div className="text-2xl mb-2">{icon}</div>}
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  )
}
```

### Available Component Categories

From [daisyui.com/components](https://daisyui.com/components/):

**Actions**: Button, Dropdown, Modal, Swap, Theme Controller  
**Data Display**: Accordion, Avatar, Badge, Card, Carousel, Chat bubble, Collapse, Countdown, Table, Timeline  
**Navigation**: Breadcrumbs, Dock, Link, Menu, Navbar, Pagination, Steps, Tabs  
**Feedback**: Alert, Loading, Progress, Skeleton, Toast, Tooltip  
**Data Input**: Calendar, Checkbox, File Input, Radio, Range, Rating, Select, Input, Textarea, Toggle  
**Layout**: Divider, Drawer, Footer, Hero, Indicator, Join, Mask, Stack  
**Mockup**: Browser, Code, Phone, Window

### Theme Customization

Themes are configured in `app/globals.css`:
```css
@plugin "daisyui" {
  themes: lofi --default, sunset --prefersdark;
}
```

Available themes: light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter, dim, nord, sunset, and more.

## Development Workflow
See `/rules/development-guide.mdc` for the complete development process.