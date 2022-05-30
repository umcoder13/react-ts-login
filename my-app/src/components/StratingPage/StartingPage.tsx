import axios from 'axios';
import { useEffect, useState } from 'react';

import classes from './StartingPage.module.css';

const StaringPage = () => {

  const [ testStr, setTestStr ] = useState<string>('');
  const URL = '/hello/ui';

  // 변수 초기화
  function callback(str:string) {
    setTestStr(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
  useEffect(() => {
    const getHomepage = async () => {
      const response = await axios.get(URL);
      callback(response.data);
    };
    getHomepage();
      }, []
  );

  return(
    <section className={classes.starting}>
      <h1>Hi from String!</h1>
    </section>
  );
}

export default StaringPage;