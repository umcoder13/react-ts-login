import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError }  from 'axios';

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode }
type LoginFailType = { status: number, error: string,};
type UserInfo = { email: string, nickname: string};
type ServerError = { errorMessage: string };
type LoginToken = { 
  grantType: string,
  accessToken: string,
  tokenExpiresIn: number
}

export type Auth = {
  LoginFailType : { status: number, error: string},
  ServerError : { errorMessage: string },
  UserInfo : { email: string, nickname: string},
}

const AuthContext = React.createContext({
  token: '',
  userObj: { email: '', nickname: '' },
  isLoggedIn: false,
  isSuccess: false,
  signup: (email: string, password: string, nickname:string) =>  {},
  login: (email:string, password: string) => {},
  logout: () => {},
  getUser: () => {},
  changeNickname: (nickname:string) => {},
  changePassword: (exPassword: string, newPassword: string) => {}
});

const calculateRemainingTime = (expirationTime:number) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retireveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime') || '0';

  const remaingTime = calculateRemainingTime(+storedExpirationDate);

  if(remaingTime <= 1000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null
  }

  return {
    token: storedToken,
    duration: remaingTime
  }
}

export const AuthContextProvider:React.FC<Props> = (props) => {

  const tokenData = retireveStoredToken();

  let initialToken:any;
  if (tokenData) {
    initialToken = tokenData.token!;
  }

  const [token, setToken] = useState(initialToken);
  const [userObj, setUserObj] = useState({
    email: '',
    nickname: ''
  })
  const [isSuccess, setIsSuccess] = useState(false);

  const userIsLoggedIn = !!token;

  const signupHandler = async (email:string, password: string, nickname: string) => {
    setIsSuccess(false);
    const URL = 'auth/signup'
    try {
      const response = await axios.post(URL, {
        email,
        password,
        nickname
      });
      const dataJson:UserInfo = response.data;
      setIsSuccess(true);
      return dataJson;
  
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          alert("failed!");
          return serverError.response.data;
        }
      }
      
      const errorObject = { errorMessage: "Failed!" }
      console.log(errorObject);
      console.log(err);
      alert("failed!");
      return errorObject;
    }
  }

  const loginHandler = async (email:string, password: string) => {
    const URL = 'auth/login'
    setIsSuccess(false);
    
    try {
      const response = await axios.post(URL, {
        email,
        password
      });
      if(response.data.error) {
        console.log((response.data as LoginFailType).error);
        alert("Wrong ID or Password");
        return response.data;
      }
  
      const dataJSON:LoginToken = response.data;
      loginTokenHandler(dataJSON.accessToken, dataJSON.tokenExpiresIn);
      setIsSuccess(true);

    } catch(err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          alert("failed!");
          // return serverError.response.data;
        }
      }
      
      const errorObject = { errorMessage: "Failed!" }
      console.log(errorObject);
      console.log(err);
      alert("failed!");
    }

  };


  const loginTokenHandler = (token:string, expirationTime:number) => {
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', String(expirationTime));

    const remainingTime = calculateRemainingTime(expirationTime);
    console.log(remainingTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  const logoutHandler = useCallback(() => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    
  }, []);

  const getUserHandler = async () => {
    const URL = '/member/me';
    try {
      const response = await axios.get(URL, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if(response.data.error) {
        console.log((response.data as LoginFailType).error);
        alert("Wrong ID or Password");
        // return response.data;
      }

      const dataJson:UserInfo = response.data;
      setUserObj(dataJson);
      console.log('Context 성공!');

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          alert("failed!");
          // return serverError.response.data;
        }
      }
      
      const errorObject = { errorMessage: "Failed!" }
      console.log(errorObject);
      console.log(err);
      alert("failed!");
    };
  };

  const changeNicknameHandler = async (nickname:string) => {
    setIsSuccess(false);
    const URL = '/member/nickname'
    try {
      const response = await axios.post(URL, 
        {
          email: userObj.email,
          nickname
        }, 
        {
          headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const dataJson:UserInfo = response.data;
      console.log('change nickname over!');
      setUserObj(dataJson);
      setIsSuccess(true);
      return dataJson.email;
      
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          alert("failed!");
          return serverError.response;
        }
      }
      
      const errorObject = { errorMessage: "Failed!" }
      console.log(errorObject);
      console.log(err);
      alert("failed!");
      return errorObject;
    }
  };

  const changePaswordHandler = async (exPassword:string, newPassword: string) => {
    setIsSuccess(false);
    const URL = '/member/password';
    try {
      const response = await axios.post(URL,
        {
          email: userObj.email,
          exPassword,
          newPassword
        },
        {
          headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const dataJson:UserInfo = response.data;
      console.log('change password over!');
      setIsSuccess(true);
      return dataJson;
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          alert("failed!");
          return serverError.response.data;
        }
      }
      
      const errorObject = { errorMessage: "Failed!" }
      console.log(errorObject);
      console.log(err);
      alert("failed!");
      return errorObject;
    };
      
  };

  useEffect(() => {
    if(tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);


  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
    getUser: getUserHandler,
    changeNickname: changeNicknameHandler,
    changePassword: changePaswordHandler
  }
  
  return(
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;