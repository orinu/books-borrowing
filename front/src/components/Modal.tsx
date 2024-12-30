// src/components/Modal.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import '../scss/components/./Modal.scss';

// import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, ariaLabel }) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <FocusTrap>
      <div
        className="modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          tabIndex={-1}
        >
          <button className="modal-close-button" onClick={onClose} aria-label="Close Modal">
            &times;
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>,
    modalRoot
  );
};

export default Modal;
