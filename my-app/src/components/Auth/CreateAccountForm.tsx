import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './CreateAccountForm.module.css';

const CreateAccountForm = () => {

  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const [ isSuccess, setIsSuccess ] = useState<boolean>(false); 
  

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;
    authCtx.signup(enteredEmail, enteredPassword, enteredNickname)
    if (authCtx.isSuccess) {
      navigate("/",  { replace: true })
    }
    //setIsSuccess(true);
  }

  const formToServer = () => {
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;

    authCtx.signup(enteredEmail, enteredPassword, enteredNickname);
  }

  useEffect(() => {
    if (isSuccess) {
      formToServer();
      if (authCtx.isSuccess) {
        navigate("/", { replace: true });
      }

    }
  }, [isSuccess])



  return (
    <section className={classes.auth}>
      <h1>Create Account</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="nickname">NickName</label>
          <input type='text' id='nickname' required ref={nicknameInputRef}/>
        </div>
        <div className={classes.actions}>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default CreateAccountForm;