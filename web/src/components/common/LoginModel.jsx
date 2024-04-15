import React, { useState } from 'react';

import '../../style/login.css';
import conifg from '../../../config/config';

function LoginModal({ isOpen, onClose, onSwitchModal, onLoginSuccess }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const res = await fetch(conifg.login, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.access_token, data.user); // Adjust according to your API response structure  
        onClose();
      } else {
        console.error('Login failed:', await res.text());
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  }
  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login</h2>
          <span className="modal-close-button" onClick={onClose}>&times;</span>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="modal-button">Login Wtih Your Account</button>
        </form>
        <p className="modal-footer-text">
          Need an account? <a onClick={onSwitchModal}>Sign up</a>
        </p>
      </div>
    </div>
    </>
  );
}

export default LoginModal;