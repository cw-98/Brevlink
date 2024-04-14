import '../../style/login.css';

function SignupModal({ isOpen, onClose, onSwitchModal }) {
  if (!isOpen) return null;

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register</h2>
          <span className="modal-close-button" onClick={onClose}>&times;</span>
        </div>
        <form className="modal-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Create a password" required />
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