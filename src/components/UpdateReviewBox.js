import styles from "../css/updatereviewbox.module.css";
import MvRate from "./MvRate.js";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateReviewBox() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [text, setText] = useState("");

  const history = useHistory();
  const { userId, movieId } = useParams();

  useEffect(() => {
    getPost();
  });

  const getPost = () => {
    axios
      .get(`https://api.moviebara.com/posts?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          let post = res.data.posts.filter((p) => p.movie_id === movieId);
          setText(post.text);

          let postRate = clicked.slice();
          for (let i = 0; i < post.rate; i++) {
            postRate[i] = true;
          }
          setClicked(postRate);
        }
      });
  };

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
      .patch(
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
      .then(history.push("/main"));
  };

  return (
    <div className={styles.contatiner}>
      <div className={styles.rating_box}>
        <p>영화 평점</p>
        <MvRate handleStarClick={handleStarClick} />
      </div>
      <div className={styles.text_box}>
        <input type="text" value={text} onChange={setText(e.value)} />
      </div>
      <form className={styles.submit} onClick={handleSubmit}>
        리뷰 수정
      </form>
    </div>
  );
}
