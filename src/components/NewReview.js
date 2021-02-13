import styles from "../css/newreview.module.css";
import MvRate from "./MvRate.js";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function NewReview({ userInfo, setPosts }) {
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
    const data = JSON.stringify({
      userId: userInfo.id,
      movieId: Number(movieId),
      rate: 8.3,
      text,
    });

    const config = {
      method: "post",
      url: "https://api.moviebara.com/posts/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };

    axios(config).then((res) => {
      axios
        .get(`https://api.moviebara.com/posts?movie_id=${movieId}`)
        .then((res) => {
          console.log("what the ffffffffffffffffff");
          setPosts(res.data.post);
          history.push(`/main/${movieId}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
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
