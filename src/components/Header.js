import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/header.module.css";

function Header({ isLogin, userInfo }) {
  return isLogin ? (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to="/main">
          <div className={styles.logo_wrapper}>MOVIE-BARA</div>
        </Link>
      </div>
      <div className={styles.search}>
        <input type="text" className={styles.search_bar} />
        <FontAwesomeIcon icon={faSearch} className={styles.search_btn} />
      </div>
      <div className={styles.nav_bar}>
        <Link to="/mypage">
          <FontAwesomeIcon
            className={styles.mypage_btn}
            icon={faCog}
            fontSize={faThLarge}
          />
        </Link>
        <Link to="/userhome">
          <FontAwesomeIcon className={styles.myhome_btn} icon={faUserCircle} />
          {!userInfo ? "안녕하세요!" : userInfo.nickname + "님"}
        </Link>
      </div>
    </div>
  ) : (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <div className={styles.logo_wrapper}>MOVIE-BARA</div>
        </Link>
      </div>
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
          <Link to="/none_membership_login" className={styles.text_btn}>
            Google Login
          </Link>
        </div>
        <div className={styles.btn_wrapper}>
          <Link to="/topics" className={styles.text_btn}>
            Test
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
