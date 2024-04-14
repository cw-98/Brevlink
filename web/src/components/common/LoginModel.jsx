import '../../style/login.css';

function LoginModal({ isOpen, onClose, onSwitchModal, onLoginSuccess }) {
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onLoginSuccess('ChihChao');
  }
  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login</h2>
          <span className="modal-close-button" onClick={onClose}>&times;</span>
        </div>
        <form className="modal-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="password" required />
          <button type="submit" className="modal-button" onSubmit={handleSubmit}>Login Wtih Your Account</button>
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