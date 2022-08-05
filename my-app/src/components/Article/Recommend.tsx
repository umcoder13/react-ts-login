import React, { useCallback, useContext, useEffect, useState } from 'react';

import EmptyHeart from '../../images/empty-heart.png';
import Heart from '../../images/heart.png';
import AuthContext from '../../store/auth-context';
import RecommendContext from '../../store/recommend-context';
import classes from './Recommend.module.css';

type Props = { item:string | undefined }

type Recommends = {
  recommendNum: number
  recommended: boolean
}

const Recommend:React.FC<Props> = (props) => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [recommends, setRecommends] = useState<Recommends>();
  
  const authCtx = useContext(AuthContext);
  const recommendCtx = useContext(RecommendContext);


  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);

  const getContext = useCallback(() => {
    setIsLoading(false);
    (isLogin ? recommendCtx.getRecommends(id, authCtx.token) : recommendCtx.getRecommends(id));
  }, [isLogin])

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (recommendCtx.isSuccess) {
      setRecommends(recommendCtx.recommends);
      console.log(recommends);
      console.log("set");
      setIsLoading(true);
    }
  }, [recommendCtx, recommends])

  useEffect(() => {
    if (recommendCtx.isChangeSuccess) {
      setRecommends(recommendCtx.recommends);
      console.log(recommends);
      console.log("change set");
      setIsLoading(true);
    }
  }, [recommendCtx.isChangeSuccess])
  

  const changeRecommend = () =>{
    if (!isLogin) {
      return alert("로그인 하세요");
    } else {
      (recommends!.recommended ? recommendCtx.deleteRecommend(id, authCtx.token) : recommendCtx.postRecommend(id, authCtx.token));
    }

  }

  const heartImage = (heart:string) => {
    return (
      <img alt="heart" className={classes.heart} src={heart} onClick={changeRecommend}/>
    )
  }

  let media = <h3>is Loading...</h3>

  if (isLoading && recommends) {
    media = (
      <div>
        {recommends.recommended ? heartImage(Heart) : heartImage(EmptyHeart)}
        <h4>좋아요 숫자 {recommends.recommendNum}</h4>
      </div>
    )
  }

  return ( 
    <div className={classes.recommend}>
      {media}
    </div>
  );
}

export default Recommend;