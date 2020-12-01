import React from 'react';
import './modal.scss';

const Modal = ({ closeModal, isOpen, content }) => {
  // console.log(content);

  const { urls, user, id } = content;
  console.log(urls, user, id, 'shine');
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <button type="button" onClick={closeModal} className="modal-btn">
            X
          </button>
          <img src={urls?.raw} alt="" className="modal-image" />
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
