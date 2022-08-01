import { Pagination } from "react-bootstrap";

type Props = { currentPage:number, maxPage:number }

const Paging:React.FC<Props> = (props) => {

  const maxNum = props.maxPage;
  const currentNum = props.currentPage;

  const definePage = () => {
    let pageProp: JSX.Element[] = []
    if (maxNum < 6) {
      for (let num = 1; num <= maxNum; num ++) {
        pageProp.push(
          <Pagination.Item key={num} active={num === currentNum}>
            {num}
          </Pagination.Item>
        )
      }
      return pageProp;
    } 

    if (currentNum < 5) {
      for (let num = 1; num <= 4; num ++) {
        pageProp.push(
          <Pagination.Item key={num} active={num === currentNum}>
            {num}
          </Pagination.Item>
        )
      }
      pageProp.push(<Pagination.Ellipsis />);
      pageProp.push(<Pagination.Item>{maxNum}</Pagination.Item>);
      pageProp.push(<Pagination.Next />)
      return pageProp;
    }

    if (maxNum - currentNum < 4) {
      pageProp.push(<Pagination.First />)
      pageProp.push(<Pagination.Item>{1}</Pagination.Item>);
      pageProp.push(<Pagination.Ellipsis />);
      for (let num = maxNum-3; num <= maxNum; num ++) {
        pageProp.push(
          <Pagination.Item key={num} active={num === currentNum}>
            {num}
          </Pagination.Item>
        )
      }
      return pageProp;
    } 

    pageProp.push(<Pagination.First />)
    pageProp.push(<Pagination.Item>{1}</Pagination.Item>);
    pageProp.push(<Pagination.Ellipsis />);
    for (let num = currentNum-2; num <= currentNum + 2; num++) {
      <Pagination.Item key={num} active={num === currentNum}>
        {num}
      </Pagination.Item>
    }
    return pageProp;
  }

  

  return (
    <Pagination>
    {definePage()}
    </Pagination>
  );
}

export default Paging;