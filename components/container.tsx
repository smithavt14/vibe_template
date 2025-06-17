interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}