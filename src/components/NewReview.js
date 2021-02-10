import styles from "../css/newreview.module.css";
import MvRate from "./MvRate.js";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function NewReview({ movieId, userId, accessToken }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [text, setText] = useState("");
  const history = useHistory();

  const handleStarClick = (e, index) => {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      if (i <= index) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setClicked(clickStates);
  };

  const handleSubmit = () => {
    axios
      .post(
        `https://api.moviebara.com/posts`,
        {
          userId,
          movieId,
          rate: clicked.filter((e) => e === true).length,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/plain",
          },
          withCredentials: true,
        }
      )
      .then(history.push(`/main/${movieId}`));
  };

  return (
    <div className={styles.contatiner}>
      <div className={styles.rating_box}>
        <p>영화 평점</p>
        <MvRate handleStarClick={handleStarClick} clicked={clicked} />
      </div>
      <div className={styles.text_box}>
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <form className={styles.submit} onClick={handleSubmit}>
        리뷰 등록
      </form>
    </div>
  );
}
