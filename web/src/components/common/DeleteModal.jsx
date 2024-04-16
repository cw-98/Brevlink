import React, { useEffect, useRef }from 'react';
import { fetchWithToken } from '../../utils/api';
import conifg from '../../../config/config';

function DeleteModal({ isOpen, onClose, link }) {
  const modalRef = useRef(null);

  const handleDelete = async () => {
    try {
        const res = await fetchWithToken(`${conifg.deleteUrl}/${link.id}`, { // Assuming `config.api` holds your base API URL
          method: 'DELETE',
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        if (res.ok) {
            console.log('Link deleted successfully');
            onClose(true);
        }
        else {
            console.error('Failed to delete the link');
            onClose(false);
        }
    } catch (error) {
        console.error('Network error when trying to delete the link:', error);
        onClose(false);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => {document.removeEventListener('mousedown', handleClickOutside);};
  }, [isOpen]);

  if (!isOpen || !link) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h3>Confirm Deletion</h3>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete "{link.shortened_id}" ? This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button onClick={handleDelete} className="btn btn-danger">OK</button>
          <button onClick={() => {onClose(false);}} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
