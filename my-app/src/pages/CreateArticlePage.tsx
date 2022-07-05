import CreateArticleForm from "../components/Article/CreateArticleForm";

import { ArticleContextProvider } from "../store/article-context";

const CreateArticlePage = () => {
  return (
    <ArticleContextProvider>
      <CreateArticleForm item={undefined}/>
    </ArticleContextProvider>
  )
}

export default CreateArticlePage;