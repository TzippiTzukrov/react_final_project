import { createContext, useContext, useState, useEffect } from "react";
import "../styles/Toast.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="toast-container">
          <div className={`toast-bar ${toast.type}`} />
          <div className={`toast-icon ${toast.type}`}>
            {toast.type === 'error' ? '✕' : toast.type === 'success' ? '✓' : 'ℹ'}
          </div>
          <div className="toast-message">
            {toast.message}
          </div>
          <button
            onClick={() => setToast(null)}
            className="toast-close-btn"
          >
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);