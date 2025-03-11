import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Import useNavigate
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate(); //  Get navigate function

  const checkLogin = () => {
    setLoginCheck(auth.loggedIn()); //  update login state
  };

  useEffect(() => {
    checkLogin();
  }, []); // Only runs once on component mount

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => auth.logout(navigate)}>Logout</button> {/* Pass navigate */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

