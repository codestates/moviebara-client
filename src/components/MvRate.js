import React from "react";
import styles from "../css/mvrate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function MvRate({ handleStarClick, clicked }) {
  return (
    <div className={styles.rating}>
      <p>Rating</p>
      <div>
        <FontAwesomeIcon
          icon={faStar}
          onClick={(e) => handleStarClick(e, 0)}
          className={clicked[0] ? styles.clickedstar : null}
        />
        <FontAwesomeIcon
          icon={faStar}
          onClick={(e) => handleStarClick(e, 1)}
          className={clicked[1] ? styles.clickedstar : null}
        />
        <FontAwesomeIcon
          icon={faStar}
          onClick={(e) => handleStarClick(e, 2)}
          className={clicked[2] ? styles.clickedstar : null}
        />
        <FontAwesomeIcon
          icon={faStar}
          onClick={(e) => handleStarClick(e, 3)}
          className={clicked[3] ? styles.clickedstar : null}
        />
        <FontAwesomeIcon
          icon={faStar}
          onClick={(e) => handleStarClick(e, 4)}
          className={clicked[4] ? styles.clickedstar : null}
        />
      </div>
    </div>
  );
}
