import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';


const MainNavigation = () =>{

  const authCtx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  let isLogin = authCtx.isLoggedIn;

  

  useEffect(() => {
    console.log(isLogin);
    setIsLoggedIn(isLogin);
    if (isLoggedIn) {
      authCtx.getUser();
      console.log(authCtx.userObj.nickname);
      setNickname(authCtx.userObj.nickname);
    }
  }, [isLoggedIn, authCtx, isLogin]);


  const toggleLogoutHandler = () => {
    authCtx.logout();
    setIsLoggedIn(false);
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