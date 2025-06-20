import { useState, useCallback } from 'react';

interface ToastConfig {
  title: string;
  description: string;
  variant: 'default' | 'success' | 'error' | 'warning';
}

export function useToast() {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const showSuccess = useCallback((title: string, description: string) => {
    showToast({ title, description, variant: 'success' });
  }, [showToast]);

  const showError = useCallback((title: string, description: string) => {
    showToast({ title, description, variant: 'error' });
  }, [showToast]);

  const showWarning = useCallback((title: string, description: string) => {
    showToast({ title, description, variant: 'warning' });
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
  };
}
