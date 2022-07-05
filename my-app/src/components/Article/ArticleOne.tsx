import { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleContext from '../../store/article-context';
import AuthContext from '../../store/auth-context';
import Article from './Article';
import classses from './ArticleOne.module.css';

type Props = { item:string | undefined }

type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody?: string,
  cratedAt: string,
  updatedAt?: string,
  written?: boolean
};

const ArticleOne:React.FC<Props> = (props) => {

  let navigate = useNavigate();

  const [article, setArticle] = useState<ArticleInfo>();
  const [isLoading, setIsLoading ] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const articleCtx = useContext(ArticleContext);
  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);


  const deleteHandler = (id:string) => {
    articleCtx.deleteArticle(authCtx.token, id);
    alert("삭제되었습니다.");
    navigate("/list")
  }

  const getContext = useCallback(() => {
    setIsLoading(false);
    (isLogin ? articleCtx.getArticle(id, authCtx.token) : articleCtx.getArticle(id));
  }, [isLogin])
  
  useEffect(() => {
    getContext();
  }, [getContext])

  useEffect(() => {
    if (articleCtx.isSuccess) {
      setArticle(articleCtx.article);
      console.log(article);
      console.log(article?.cratedAt);
      setIsLoading(true);
    }
  }, [articleCtx, article]);

  let content = <p>Loading</p>

  if (isLoading && article) {
    content = <Article item={article} onDelete={deleteHandler} />
  }

  return ( 
    <div className={classses.article}>
      {content}
    </div>
    
  );
}

export default ArticleOne;