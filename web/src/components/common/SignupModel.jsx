import '../../style/login.css';
import { useState } from 'react'
import { useUser } from '../../hooks/useAuth';
import config from '../../../config/config';

function SignupModal({ isOpen, onClose, onSwitchModal, onSignupSuccess }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, username, logOut } = useUser();


  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const payload = { email, first_name: firstName, last_name: lastName, password };

    try {
      const response = await fetch(config.newUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Account created successfully');
        const data = await response.json();
        onSignupSuccess(data.access_token ,data.user);
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register</h2>
          <span className="modal-close-button" onClick={onClose}>&times;</span>
        </div>
        <form className="modal-form" onSubmit={handleSignup}>
          <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="text" placeholder="First name" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
          <input type="text" placeholder="Last name" required value={lastName} onChange={e => setLastName(e.target.value)}/>
          <input type="password" placeholder="Create a password" required value={password} onChange={e => setPassword(e.target.value)}/>
          <button type="submit" className="modal-button">Create Account</button>
        </form>
        <p className="modal-footer-text">
          Already a member? <a onClick={onSwitchModal}>Log in</a>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignupModal;