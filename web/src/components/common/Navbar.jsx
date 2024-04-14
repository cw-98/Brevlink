import { useState, useRef, useEffect } from 'react'
import SignupModal from './SignupModel';
import LoginModal from './LoginModel';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { isLoggedIn, user, logOut, logIn } = useUser();
    const dropdownRef = useRef(null);
    
    const openLogin = () => {
        setSignupOpen(false);
        setLoginOpen(true);
        setDropdownOpen(false);
    };
    
    const openSignup = () => {
        setDropdownOpen(false);
        setLoginOpen(false);
        setSignupOpen(true);
    };

    const toggleDropdown = () => {
        if (isLoggedIn) {
          setDropdownOpen(!isDropdownOpen);
        } else {
          openSignup();
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const closeModal = () => {
        setLoginOpen(false);
        setSignupOpen(false);
    };

    const handleModelSuccess = (accessToken, data) => {
        logIn(accessToken, data)
        setLoginOpen(false); // Close modal on successful login
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    return (
    <>
    <header>
          <nav class="navbar">
              <Link to="/" className='nav-brand'>Brev</Link>
              <div class="nav-items">
                  <a onClick={toggleDropdown} class="nav-link">{ isLoggedIn ? user.first_name : 'Signup'}</a>
                  {isDropdownOpen && (
                    <div className="dropdown-menu" ref={dropdownRef}>
                        <Link to="/links" className='dropdown-item' onClick={() => setDropdownOpen(false)}>My Links</Link>
                        <a className="dropdown-item">Settings</a>
                        <a className="dropdown-item" onClick={logOut}>logout</a>
                    </div>
                   )}
              </div>
          </nav>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={closeModal} onSwitchModal={openSignup} onLoginSuccess={handleModelSuccess} />
      <SignupModal isOpen={isSignupOpen} onClose={closeModal} onSwitchModal={openLogin} onSignupSuccess={handleModelSuccess} />
    </>
    )
}

export default Navbar