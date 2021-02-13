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
      url: "http://localhost:4000/posts/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };

    axios(config).then((res) => {
      axios
        .get(`http://localhost:4000/posts?movie_id=${movieId}`)
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
    <div className={styles.contatiner}>
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
