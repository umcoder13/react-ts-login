import { Button, Form } from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import classes from './SearchForm.module.css';

const SearchForm = () => {
  return (
    <div className={classes.search}>
      <Form>
        <Form.Group className={classes.form}>
          <Form.Control type="text" />
          <Button>검색</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchForm;