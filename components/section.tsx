import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={`min-h-[var(--full-screen)] py-10 relative ${className || ''}`}>
      {children}
    </section>
  )
} 