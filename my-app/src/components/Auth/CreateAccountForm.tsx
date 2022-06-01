import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const CreateAccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;

    setIsLoading(true);

    authCtx.signup(enteredEmail, enteredPassword, enteredNickname);

    setIsLoading(false);
    
    if (authCtx.isSuccess) {
      navigate("/");
    }
    
  }

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