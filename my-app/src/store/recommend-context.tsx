import React, { useState, useCallback, useRef } from "react";

import * as recommendAction from './recommend-action';

type Props = { children?: React.ReactNode }

type Recommends = {
  recommendNum: number
  recommended: boolean
}


interface RecommendCtx {
  recommends: Recommends | undefined;
  isSuccess: boolean;
  isChangeSuccess: boolean;
  getRecommends: (param:string, token?:string) => void;
  postRecommend: (id:string, token:string) => void;
  deleteRecommend: (param:string, token:string) => void;
}

const RecommendContext = React.createContext<RecommendCtx>({
  recommends: undefined,
  isSuccess: false,
  isChangeSuccess: false,
  getRecommends: () => {},
  postRecommend: () => {},
  deleteRecommend: () => {},
});

export const RecommendContextProvider:React.FC<Props> = (props) => {

  const [recommends, setRecommends] = useState<Recommends>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isChangeSuccess, setIsChangeSuccess] = useState<boolean>(false);

  const getRecommendsHandler = (param:string, token?:string) => {
    setIsSuccess(false);
    const data = (token ? 
      recommendAction.getRecommends(param, token) 
      : recommendAction.getRecommends(param));
    data.then((result) => {
      if (result !== null) {
        const recommends:Recommends = result.data;
        setRecommends(recommends);
        console.log(recommends)
      }
    })
    setIsSuccess(true);
  }

  const postRecommendHandler = async (id:string, token:string) => {
    setIsChangeSuccess(false);
    const postData = await recommendAction.makeRecommend(id, token);
    const msg = await postData?.data;
    console.log(msg);

    const getData = await recommendAction.getRecommends(id, token);
    const recommends:Recommends = getData?.data;
    setRecommends(recommends);
    console.log(recommends);
    setIsChangeSuccess(true);
  }

  const deleteRecommendHancler = async (param:string, token:string) => {
    setIsChangeSuccess(false);
    const deleteData = await recommendAction.deleteRecommend(param, token);
    const msg = await deleteData?.data;

    const getData = await recommendAction.getRecommends(param, token);
    const recommends:Recommends = getData?.data;
    setRecommends(recommends);
    console.log(recommends);
    setIsChangeSuccess(true);
  }


  const contextValue:RecommendCtx = {
    recommends,
    isSuccess,
    isChangeSuccess,
    getRecommends: getRecommendsHandler,
    postRecommend: postRecommendHandler,
    deleteRecommend: deleteRecommendHancler
  }

  return(
    <RecommendContext.Provider value={contextValue}>
      {props.children}
    </RecommendContext.Provider>
  )
}

export default RecommendContext;