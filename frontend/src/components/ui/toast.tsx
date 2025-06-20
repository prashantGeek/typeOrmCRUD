import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  onClose?: () => void
}

export function Toast({ title, description, variant = 'default', onClose }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  const variants = {
    default: "bg-white border-gray-200 shadow-lg",
    success: "bg-green-50 border-green-200 shadow-lg shadow-green-100",
    error: "bg-red-50 border-red-200 shadow-lg shadow-red-100", 
    warning: "bg-yellow-50 border-yellow-200 shadow-lg shadow-yellow-100"
  }

  const titleColors = {
    default: "text-gray-900",
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800"
  }

  const descriptionColors = {
    default: "text-gray-600",
    success: "text-green-600", 
    error: "text-red-600",
    warning: "text-yellow-600"
  }

  const icons = {
    default: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />
  }

  React.useEffect(() => {
    // Show animation
    setTimeout(() => setIsVisible(true), 100)
    
    // Auto dismiss
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <div className={cn(
      "fixed top-4 right-4 z-[9999] w-80 p-4 rounded-xl border-2 backdrop-blur-md transition-all duration-300 transform",
      variants[variant],
      isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icons[variant]}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn("font-semibold text-sm", titleColors[variant])}>
              {title}
            </h4>
          )}
          {description && (
            <p className={cn("text-sm mt-1", descriptionColors[variant])}>
              {description}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
