import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../css/app.module.css";
import Sign from "./Sign.js";
import Header from "./Header.js";
import Main from "./Main.js";
import MyPage from "./Mypage.js";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // 로그인 요청
  });

  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Header isLogin={isLogin} />
        </nav>
        <div className={styles.pages}>
          <Switch>
            <Route path="/mypage">
              <MyPage />
            </Route>
            <Route path="/userhome">
              <Userhome />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <Sign isLogin={isLogin} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
