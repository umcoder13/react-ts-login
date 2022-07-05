import { GET, POST, DELETE }  from "./fetch-action";

type Comment = {
  articleId: string,
  body: string
}

const createTokenHeader = (token:string) => {
  return {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
}

export const getComments = (param:string, token?:string) => {
  const URL = '/comment/list?id=' + param;
  const response = (token ? GET(URL, createTokenHeader(token)) : GET(URL, {}));
  return response;
}

export const makeComment = (comment:Comment, token:string) => {
  const URL = '/comment/'
  const response = POST(URL, comment,  createTokenHeader(token));
  return response;
}

export const deleteComment = (param:string, token:string) => {
  const URL = '/comment/one?id=' + param;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
}