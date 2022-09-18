type ChildProps = { children?: React.ReactNode }

// Article
type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody: string,
  cratedAt: string,
  updatedAt?: string,
  isWritten?: boolean
};

type PostArticle = {
  id? : string,
  title: string,
  body: string
}

// Recommend
type Recommends = {
  recommendNum: number
  recommended: boolean
}

// Comment
interface CommentInfo {
  commentId: number,
  memberNickname: string,
  commentBody: string,
  createdAt: string,
  written: boolean
}

type PostComment = {
  articleId: string,
  body: string
}

export type { ChildProps, ArticleInfo, PostArticle, Recommends, CommentInfo, PostComment };