import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <aside className="toast-container" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={18} className="toast-icon-success" />;
        if (toast.type === 'error') {
          icon = <AlertCircle size={18} className="toast-icon-error" />;
        } else if (toast.type === 'info') {
          icon = <Info size={18} className="toast-icon-info" />;
        }

        return (
          <div
            key={toast.id}
            className={`toast-item toast-${toast.type}`}
            role="status"
          >
            <div className="toast-icon-box" aria-hidden="true">
              {icon}
            </div>
            <div className="toast-text-box">
              <span className="toast-title">{toast.title}</span>
              {toast.description && (
                <span className="toast-desc">{toast.description}</span>
              )}
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
