import { Fragment } from "react";
import ArticleList from "../components/Article/ArticleList";
import SearchForm from "../components/Article/SearchForm";
import { ArticleContextProvider } from "../store/article-context";

const ArticleListPage = () => {
  return (
    <ArticleContextProvider>
      <Fragment>
        <ArticleList />
        <SearchForm />
      </Fragment>
  </ArticleContextProvider>
  );
}

export default ArticleListPage;