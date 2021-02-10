import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/header.module.css";

function Header({ isLogin }) {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const handleSearch = () => {};

  return isLogin ? (
    <div className={styles.header}>
      <span className={styles.logo}>
        <Link to="/main">Home</Link>
      </span>
      <span className={styles.search}>
        <input
          type="text"
          className={styles.search_bar}
          onChange={setKeyword(e.value)}
        />
        <button className={styles.search_btn} onClick={}>
          search
        </button>
      </span>
      <span className={styles.nav_bar}>
        <Link to="/mypage">
          <FontAwesomeIcon className={styles.mypage_btn} icon={faCog} />
        </Link>
        <Link to="/userhome">
          <FontAwesomeIcon className={styles.myhome_btn} icon={faUserCircle} />
        </Link>
        <Link to="/logout">logout</Link>
      </span>
    </div>
  ) : (
    <div className={styles.header}>
      <span className={styles.logo}>
        <Link to="/">Home</Link>
      </span>
      <span className={styles.nav_bar}>
        <Link to="/signup"> Sign Up</Link>
        <Link to="/none_membership_login">비회원 로그인</Link>
        <Link to="/sc_login">소셜 로그인</Link>
      </span>
    </div>
  );
}

export default Header;
