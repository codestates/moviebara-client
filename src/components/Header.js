import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/header.modules.css";

function Header() {
  const islogin = false;
  return islogin ? (
    <div className={styles.header}>
      <span className={styles.logo}>
        <Link to="/main">Home</Link>
      </span>
      <span className={styles.search}>
        <input type="text" className={styles.search_bar} />
        <button className={styles.search_btn}>search</button>
      </span>
      <span className={styles.nav_bar}>
        <Link to="/about">
          <FontAwesomeIcon className={styles.mypage_btn} icon={faCog} />
        </Link>
        <Link to="/topics">
          <FontAwesomeIcon className={styles.myhome_btn} icon={faUserCircle} />
        </Link>
      </span>
    </div>
  ) : (
    <div className={styles.header}>
      <span className={styles.logo}>
        <Link to="/">Home</Link>
      </span>
      <span className={styles.search}>
        <input type="text" className={styles.search_bar} />
        <button className={styles.search_btn}>search</button>
      </span>
      <span className={styles.nav_bar}>
        <Link to="/signup"> Sign Up</Link>
        <Link to="/none_membership_login">비회원 login</Link>
        <Link to="/topics">test</Link>
      </span>
    </div>
  );
}

export default Header;
