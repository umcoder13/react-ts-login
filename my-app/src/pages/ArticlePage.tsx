import { useParams } from "react-router-dom";
import ArticleList from "../components/Article/ArticleList";
import { ArticleContextProvider } from "../store/article-context";

const ArticlePage = () => {
  let { pageId } = useParams();

  return (
    <ArticleContextProvider>
      <ArticleList />
    </ArticleContextProvider>
  );
}

export default ArticlePage;