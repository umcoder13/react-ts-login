import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './StartingPage.module.css';

const StaringPage = () => {


  const authCtx = useContext(AuthContext);
  let isLogin = authCtx.isLoggedIn;
  const [ testStr, setTestStr ] = useState<string>('');

  // 변수 초기화
  function callback(str:string) {
    setTestStr(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
  useEffect(() => {
    console.log('home start!');
    if (isLogin) {
      callback(authCtx.userObj.nickname);
    } else {
      callback('');
    }
      }, [isLogin, authCtx]
  );



  return(
    <section className={classes.starting}>
      <h1>Hi!</h1>
      <h1>{testStr}</h1>
      <Link to='list'>게시판페이지</Link>
    </section>
  );
}

export default StaringPage;