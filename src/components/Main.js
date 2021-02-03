import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styles from "../css/main.modules.css";
import dummy from "../dummy/movies.json";
const data = dummy.json().movies;
export default function Main() {
  return (
    <div className={styles.container}>
      {data.map((mv) => {
        <Router>
          <Link to="/mv_posts">
            <div className={styles.poster}>
              <img src={mv.image} alt="" />
              <div>{mv.title}</div>
              <div>개봉연도:{mv.year}</div>
              <div>장르:{...mv.genre}</div>
              <div>평점:{mv.rate}</div>
            </div>
          </Link>
          <Switch>
            <Route path="/mv_posts">
              <Mvposts id={mv.id} />
              //*영화에 대한 리뷰목록 컴포넌트 만들고 import*/
            </Route>
          </Switch>
        </Router>;
      })}
    </div>
  );
}
