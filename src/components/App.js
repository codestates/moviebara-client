import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Sign from "./Sign.js";
import styles from "../css/app.module.css";
import Header from "./Header.js";
import Main from "./Main.js";
import MyPage from "./Mypage.js";
import Post from "./Post.js";
import Userhome from "./Userhome.js";
import { useHistory } from "react-router-dom";

export default function App() {
  const [isLogin, setIsLogin] = useState();
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Header isLogin={isLogin} userInfo={userInfo} />
        </nav>
        <div className={styles.pages}>
          <Switch>
            <Route path="/mypage">
              <MyPage userInfo={userInfo} setUserInfo={setUserInfo} />
            </Route>
            <Route path="/userhome">
              <Userhome userInfo={userInfo} />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/main">
              <Main userInfo={userInfo} />
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/">
              <Sign
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setUserInfo={setUserInfo}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
