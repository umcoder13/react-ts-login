import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "../components/Article/ArticleList";
import SearchForm from "../components/Article/SearchForm";
import { ArticleContextProvider } from "../store/article-context";

const ArticleListPage = () => {
  let { pageId } = useParams();
  return (
    <ArticleContextProvider>
      <Fragment>
        <ArticleList item={pageId}/>
        <SearchForm />
      </Fragment>
  </ArticleContextProvider>
  );
}

export default ArticleListPage;