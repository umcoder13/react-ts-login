import { useNavigate } from "react-router-dom";
import { ArticleInfo } from "../../utility/types";

type Props = { item:ArticleInfo, onDelete: (id:string) => void }

const Article:React.FC<Props> = (props) => {

  let navigate = useNavigate();

  const id = props.item!.articleId.toString();

  const backHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/page/1");
  }
  
  const updateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("../update/" + id);
  }

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")){
      props.onDelete(id);
    }
  }

  return (
    <div>
      <header>
          <h4>{props.item!.articleTitle}</h4>
          <div>
            <span>이름: {props.item!.memberNickname}</span><br />
            <span>날짜 : {props.item!.updatedAt}</span>
          </div>
        </header>
        <div>
          <div>{props.item!.articleBody}</div>
        </div>
        <button onClick={backHandler}>뒤로</button>
        {props.item!.isWritten && 
          <div>
            <button onClick={updateHandler}>수정</button><br />
            <button onClick={deleteHandler}>삭제</button>
          </div>
        }
    </div>
  );
}

export default Article;