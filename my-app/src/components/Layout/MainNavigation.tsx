import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';


const MainNavigation = () =>{

  const authCtx = useContext(AuthContext);
  const isLogin = authCtx.isLoggedIn;
  const nickname = authCtx.userObj.nickname;

  

  useEffect(() => {
    if (isLogin) {
      authCtx.getUser();
    }
  }, [isLogin]);

  const toggleLogoutHandler = () => {
    authCtx.logout();
  }

  return(
    <header className={classes.header}>
      <Link to='/'><div className={classes.logo}>Home</div></Link>
      <nav>
        <ul>
          <li>{!isLogin && <Link to='/login'>Login</Link>}</li>
          <li>{!isLogin && <Link to='signup'>Sign-Up</Link>}</li>
          <li>{isLogin && <Link to='/profile'>Profile</Link>}</li>
          <li>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
          <li>{isLogin && <p>{nickname}</p>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;