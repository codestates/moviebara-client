import styles from "../css/newreview.module.css";
import MvRate from "./MvRate.js";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function NewReview({ userId }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [text, setText] = useState("");
  const history = useHistory();
  const { movieId } = useParams();
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
    const data = {
      userId: userId.id,
      movieId,
      rate: 0,
      text,
    };
    axios
      .post(`http://localhost:4000/posts`, JSON.stringify(data))
      .then(history.push(`/main/${movieId}`));
  };

  return (
    <div className={styles.contatiner}>
      <div className={styles.rating_box}>
        <p>영화 평점</p>
        {/* <MvRate handleStarClick={handleStarClick} clicked={clicked} /> */}
      </div>
      <div className={styles.text_box}>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <button className={styles.submit} onClick={handleSubmit}>
        리뷰 등록
      </button>
    </div>
  );
}
