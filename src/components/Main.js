import MvPosts from "./MvPosts.js";
import MvList from "./MvList.js";
import styles from "../css/main.module.css";
import { Route, useRouteMatch } from "react-router";

function Main() {
  let match = useRouteMatch();
  return (
    <>
      <Route exact path={match.path} component={MvList} />
      <Route path={`${match.path}/:id`}>
        <MvPosts />
      </Route>
    </>
  );
}

export default Main;
