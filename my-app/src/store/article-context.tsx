import React, { useState, useEffect, useCallback, useRef } from "react";
import * as articleAction from './article-action';

type Props = { children?: React.ReactNode }
type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody: string,
  cratedAt: string,
  updatedAt?: string,
  isWritten?: boolean
};

interface PostArticle {
  id? : string,
  title: string,
  body: string
} 

interface Ctx {
  article?: ArticleInfo | undefined;
  page: ArticleInfo[];
  isSuccess: boolean;
  getPage: (token?:string) => void;
  getArticle: (param:string, token?:string) => void;
  createArticle: (article:PostArticle, token:string) => void;
  getUpdateArticle: (token:string, param:string) => void;
  updateArticle: (token:string, article:PostArticle) => void;
  deleteArticle: (token:string, param:string) => void;
}



const ArticleContext = React.createContext<Ctx>({
  article: undefined,
  page: [],
  isSuccess: false,
  getPage: ()=>{},
  getArticle: ()=>{},
  createArticle:  ()=>{},
  getUpdateArticle: ()=>{},
  updateArticle: ()=>{},
  deleteArticle: ()=>{}
});

export const ArticleContextProvider:React.FC<Props> = (props) => {

  const [article, setArticle] = useState<ArticleInfo>();
  const [page, setPage] = useState<ArticleInfo[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);


  const getPageHandler = () => {
    setIsSuccess(false);
    const data =  articleAction.getArticleList();
    data.then((result) => {
      if (result !== null) {
        const page:ArticleInfo[] = result.data;
        setPage(page);
        
        console.log(isSuccess);
      }
    })
    setIsSuccess(true);
  }

  const getArticleHandler = (param:string, token?:string) => {
    setIsSuccess(false);
    const data = (token ? 
      articleAction.getOneArticle(param, token)
      : articleAction.getOneArticle(param))
    data.then((result) => {
      if (result !== null) {
        const article:ArticleInfo = result.data;
        setArticle(article);
        
        
      }
    })
    setIsSuccess(true);
  }

  const createArticleHandler = (article:PostArticle, token:string) => {
    setIsSuccess(false);
    const data = articleAction.makeArticle(token, article);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
        
      }
    })
    setIsSuccess(true);
  }

  const getUpdateArticleHancler = useCallback(async (token:string, param:string) => {
    setIsSuccess(false);
    const updateData = await articleAction.getChangeArticle(token, param);
    const article:ArticleInfo = updateData?.data;
    setArticle(article);
    setIsSuccess(true);
  }, [])

  const updateArticleHandler = (token:string, article:PostArticle) => {
    setIsSuccess(false);
    console.log('update api start')
    const data = articleAction.changeArticle(token, article);
    data.then((result) => {
      if (result !== null) {
        
      }
    })
    setIsSuccess(true);
  }

  const deleteArticleHandler = (token:string, param:string) => {
    setIsSuccess(false);
    const data = articleAction.deleteArticle(token, param);
    data.then((result) => {
      if (result !== null) {
        
      }
    })
    setIsSuccess(true);

  }

  const contextValue:Ctx = {
    article,
    page,
    isSuccess,
    getPage: getPageHandler,
    getArticle: getArticleHandler,
    createArticle: createArticleHandler,
    getUpdateArticle: getUpdateArticleHancler,
    updateArticle: updateArticleHandler,
    deleteArticle: deleteArticleHandler
  }

  return (
  <ArticleContext.Provider value={contextValue}>
    {props.children}
  </ArticleContext.Provider>)
}

export default ArticleContext;