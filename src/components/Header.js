import React, { useEffect, useState } from "react";

import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/header.module.css";
import axios from "axios";

function Header({ isLogin, userInfo, setIsLogin, setUserInfo }) {
  const [title, setTitle] = useState("");
  const history = useHistory();
  let match = useRouteMatch();

  console.log(window.location.pathname);

  const handleSearch = () => {
    history.push(`/main/${title}`);
  };

  const logoutHandler = () => {
    axios.post("https://api.moviebara.com/logout/").then((res) => {
      console.log(res);
      setIsLogin(false);
      history.push("/");
    });
  };

  const nonMemberLogin = () => {
    axios.post("https://api.moviebara.com/login/nonMember/").then(() => {
      axios.get("https://api.moviebara.com/users/").then((res) => {
        setIsLogin(true);
        setUserInfo(res.data.data);

        history.push("/");
      });
    });
  };

  return isLogin ? (
    <div className={`${styles.header} ${styles.headerBackground}`}>
      <Link to="/main" className={styles.logo}>
        {/* <Link></Link> */}
      </Link>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search_bar}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.search_btn}
          onClick={handleSearch}
        />
      </div>
      <div className={styles.nav_bar}>
        <Link to="/mypage">
          <FontAwesomeIcon
            className={styles.mypage_btn}
            icon={faCog}
            fontSize={faThLarge}
          />
          Mypage
        </Link>
        <Link to="/userhome">
          <FontAwesomeIcon className={styles.myhome_btn} icon={faUserCircle} />
          {!userInfo ? "안녕하세요!" : userInfo.nickname + "님"}
        </Link>
        <a onClick={logoutHandler} className={styles.logoutButton}>
          로그아웃
        </a>
      </div>
    </div>
  ) : (
    <div className={`${styles.header}`}>
      <Link to="/main" className={styles.logo}>
        {/* <Link></Link> */}
      </Link>
      <div className={styles.search}>
        <input type="text" className={styles.search_bar} />
        <FontAwesomeIcon icon={faSearch} className={styles.search_btn} />
      </div>
      <div className={styles.nav_bar}>
        <div className={styles.btn_wrapper}>
          <Link to="/signup" className={styles.text_btn}>
            Sign UP
          </Link>
        </div>
        <div className={styles.btn_wrapper}>
          <div className={styles.text_btn} onClick={nonMemberLogin}>
            비회원 로그인
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
