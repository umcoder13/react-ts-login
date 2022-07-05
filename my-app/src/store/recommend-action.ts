import { GET, POST, DELETE }  from "./fetch-action";

const createTokenHeader = (token:string) => {
  return {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
}

export const getRecommends = (param:string, token?:string) => {
  const URL = '/recommend/list?id=' + param;
  const response = (token ? GET(URL, createTokenHeader(token)) : GET(URL, {}));
  return response;
}

export const makeRecommend = async (id_str:string, token:string) => {
  const URL = '/recommend/'
  const id = +id_str
  const response = POST(URL, { id:id }, createTokenHeader(token));
  return response;
}

export const deleteRecommend = (param:string, token:string) => {
  const URL = '/recommend/one?id=' + param;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
}