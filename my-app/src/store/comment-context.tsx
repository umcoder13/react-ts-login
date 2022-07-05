import React, { useState, useCallback, useRef } from "react";

import * as commentAction from './comment-action';

type Props = { children?: React.ReactNode }
type CommentInfo = {
  commentId: number,
  memberNickname: string,
  commentBody: string,
  createdAt: Date,
  written: boolean
}

type PostComment = {
  articleId: string,
  body: string
}



interface CommentCtx {
  commentList: CommentInfo[];
  isSuccess: boolean;
  getComments: (param:string, token?:string) => void;
  createComment: (comment:PostComment, token:string) => void;
  deleteComment: (param:string, id:string, token:string) => void;
}

const CommentContext = React.createContext<CommentCtx>({
  commentList: [],
  isSuccess: false,
  getComments: () => {},
  createComment: () => {},
  deleteComment: () => {},
});

export const CommentContextProvider:React.FC<Props> = (props) => {

  const [commentList, setCommentList] = useState<CommentInfo[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getCommentsHandler = async (param:string, token?:string) => {
    setIsSuccess(false);
    const data = (
      token ? await commentAction.getComments(param, token) : await commentAction.getComments(param)
    );
    const comments:CommentInfo[] = await data?.data;
    setCommentList(comments);
    setIsSuccess(true);
  }

  const createCommentHandler = async (comment:PostComment, token:string) => {
    setIsSuccess(false); 
    const postData = await commentAction.makeComment(comment, token);
    const msg = await postData?.data;
    console.log(msg);

    const getData = await commentAction.getComments(comment.articleId, token);
    const comments:CommentInfo[] = getData?.data;
    setCommentList(comments);
    setIsSuccess(true);
  };

  const deleteCommentHandler = async(param:string,id:string, token:string) => {
    setIsSuccess(false);
    const deleteData = await commentAction.deleteComment(param, token);
    const msg = deleteData?.data;
    console.log(msg);

    const getData = await commentAction.getComments(id, token);
    const comments:CommentInfo[] = getData?.data;
    setCommentList(comments);
    setIsSuccess(true);
  };


  const contextValue:CommentCtx = {
    commentList,
    isSuccess,
    getComments: getCommentsHandler,
    createComment: createCommentHandler,
    deleteComment: deleteCommentHandler
  }

  return (
    <CommentContext.Provider value={contextValue}>
      {props.children}
    </CommentContext.Provider>
  )
}

export default CommentContext;