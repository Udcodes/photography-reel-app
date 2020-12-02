import React from 'react';
import './modal.scss';

const Modal = ({ closeModal, isOpen, content }) => {
  const { urls, user, id } = content;
  return (
    isOpen && (
      <div className="modal" key={id}>
        <div className="modal-content">
          <button type="button" onClick={closeModal} className="modal-btn">
            X
          </button>
          <img src={urls?.regular} alt="" className="modal-image" />
          <div className="modal-info">
            <h2 className="modal-title">{user?.name}</h2>
            <p className="modal-sub-title">{user?.location}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
