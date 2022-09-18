import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setIsFormSuccess] = useState(false);
  const authCtx = useContext(AuthContext);

  const submitHandler = (event: React.FormEvent) => {
    setIsFormSuccess(false);
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    setIsLoading(true);
    authCtx.login(enteredEmail, enteredPassword);
    setIsLoading(false);

    /*
    if (authCtx.isSuccess) {
      
    } 
    */
    setIsFormSuccess(true);
  }

  useEffect(() => {
    if (formSuccess) {
      if (authCtx.isSuccess) {
        if (authCtx.token) {
          navigate("/", { replace: true });
        } else {
          alert("로그인 실패");
        }
      }
      
    }
  }, [formSuccess, authCtx])

    return (
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your email</label>
            <input type='email' id='email' required ref={emailInputRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your password</label>
            <input type='password' id='password' required ref={passwordInputRef}/>
          </div>
          <div className={classes.actions}>
            <button type='submit'>Login</button>
            {isLoading && <p>Loading</p>}
            <p>Create Account</p>
          </div>
        </form>
      </section>
    );
  }


export default AuthForm;