import BootStrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import classes from './ArticleList.module.css';
import ArticleContext from '../../store/article-context';
import Paging from './Paging';
import { ArticleInfo } from "../../utility/types";

type Props = { item:string | undefined}


const ArticleList:React.FC<Props> = (props) => {

  let navigate = useNavigate();
  const pageId = String(props.item);

  const columns = [{
    dataField: 'articleId',
    text: '#',
    headerStyle: () => {
      return { width: "8%" };
    }
  },{
    dataField: 'articleTitle',
    text: '제목',
    headerStyle: () => {
      return { width: "65%" };
    },
    events: {
      onClick: (e:any, column:any, columnIndex:any, row:any, rowIndex:any) => {
        const articleIdNum:string = row.articleId;
        navigate(`../article/${articleIdNum}`);
      }
    }
  },{
    dataField: 'memberNickname',
    text: '닉네임'
  },{
    dataField: 'createdAt',
    text: '작성일'
  },]


  const authCtx = useContext(AuthContext);
  const articleCtx = useContext(ArticleContext);
  
  const [AList, setAList] = useState<ArticleInfo[]>([]);
  const [maxNum, setMaxNum] = useState<number>(1);

  let isLogin = authCtx.isLoggedIn;

  const fetchListHandler = useCallback(() => {
    articleCtx.getPageList(pageId);
  }, []);


  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);


  useEffect(() => {
    if (articleCtx.isSuccess) {
      setAList(articleCtx.page);
      console.log(AList);
      setMaxNum(articleCtx.totalPages);
    }
  }, [articleCtx])

  return (
    <div className={classes.list}>
      <BootStrapTable keyField='id' data = { AList } columns={ columns } />
      <div>{isLogin &&
        <Link to="/create">
          <Button>글 작성</Button>
        </Link>
      }
      </div>
      <Paging currentPage={Number(pageId)} maxPage={maxNum}/>
    </div>
  );
}
export default ArticleList;