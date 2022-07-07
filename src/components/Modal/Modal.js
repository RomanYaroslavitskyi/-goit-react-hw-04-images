import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');
const bodyEl = document.querySelector('body');

function Modal({ getFind, onClose }) {
  
  useEffect(() =>
  {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    bodyEl.classList.add('is-hidden');
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      bodyEl.classList.remove('is-hidden');
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.content}>
        <img src={getFind} alt="Name" className={s.img} />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  getFind: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
