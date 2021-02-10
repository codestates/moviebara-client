import MvPosts from "./MvPosts.js";
import MvList from "./MvList.js";
import styles from "../css/main.module.css";
import { Route, useRouteMatch } from "react-router";

function Main({ userInfo, scraps, movies, accessToken }) {
  const match = useRouteMatch();
  return (
    <div className={styles.contatiner}>
      <Route exact path={match.path}>
        <MvList movies={movies} />
      </Route>
      <Route path={`${match.path}/:id`}>
        <MvPosts
          userInfo={userInfo}
          scraps={scraps}
          accessToken={accessToken}
        />
      </Route>
    </div>
  );
}

export default Main;
