import styles from "../css/updatereviewbox.module.css";

import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

export default function UpdateReviewBox({ userInfo, setPosts }) {
  const { postId } = useParams();
  const [text, setText] = useState("");
  const [movieId, setMovieId] = useState("");
  const history = useHistory();
  const match = useRouteMatch();
  useEffect(() => {
    const getMovieId = async () => {
      await axios
        .get(`http://localhost:4000/posts?user_id=${userInfo.id}`)
        .then((res) => {
          const post = res.data.data.filter((p) => p.id === Number(postId))[0];

          const movieTitle = post.movie.title;
          axios
            .get(`http://localhost:4000/movies?movie_title=${movieTitle}`)
            .then((res) => setMovieId(res.data.data.id));
        });
    };
    getMovieId();
  }, []);

  const handleSubmit = () => {
    const data = JSON.stringify({
      userId: userInfo.id,
      movieId: Number(movieId),
      rate: 8.3,
      text,
    });

    const config = {
      method: "patch",
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
        리뷰 수정
      </button>
    </div>
  );
}
