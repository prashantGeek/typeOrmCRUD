import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95"
    
    const variants = {
      default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl",
      destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800",
      outline: "border-2 border-blue-300 bg-white text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-400",
      secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md hover:from-gray-200 hover:to-gray-300",
      ghost: "hover:bg-blue-50 hover:text-blue-700 text-gray-700",
      link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-800",
    }

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-lg px-4 text-sm",
      lg: "h-12 rounded-lg px-8 text-base",
      icon: "h-11 w-11",
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
