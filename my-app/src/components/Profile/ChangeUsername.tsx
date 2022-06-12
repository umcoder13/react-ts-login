import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './ChangeUsername.module.css';

const ChangeUsername = () => {

  let navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredNickname = nicknameInputRef.current!.value;
    console.log('change nickname start!');
    authCtx.changeNickname(enteredNickname);
    if (authCtx.isSuccess) {
      alert("변경 되었습니다.");
      authCtx.getUser();
      navigate("/", { replace: true });
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='username'>New Nickname</label>
        <input type='text' id='username'minLength={3} required ref={nicknameInputRef}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Username</button>
      </div>
    </form>
  );
}

export { ChangeUsername };