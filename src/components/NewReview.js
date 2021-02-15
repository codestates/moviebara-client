import styles from "../css/newreview.module.css";

import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function NewReview({ userInfo, setPosts }) {
  const [text, setText] = useState("");
  const history = useHistory();
  const { movieId } = useParams();

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
          setPosts(res.data.data);
          history.push(`/main/${movieId}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <div className={styles.profilePhotoBox}>
          <img className={styles.profilePhoto} src={userInfo.image}></img>
        </div>
        <div className={styles.nickName}>{userInfo.nickname}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          {/* <img src= className={styles.movieImage}></img> */}
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.movieTitle}>
            {/* <div>{post.movie.title}</div> */}
            {/* <div>{post.createdAt.slice(0, 10)}</div> */}
          </div>
          <div className={styles.movieReviewBox}>
            <textarea
              className={styles.movieReview}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className={styles.movieUtil}>
            <div className={styles.submit} onClick={handleSubmit}>
              리뷰 등록
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
