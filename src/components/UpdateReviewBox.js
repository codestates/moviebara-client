import styles from "../css/updatereviewbox.module.css";

import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function UpdateReviewBox({ userInfo, setPosts }) {
  const { postId } = useParams();
  const [text, setText] = useState("");
  const [post, setPost] = useState();
  const [movieId, setMovieId] = useState("");
  const history = useHistory();
  const match = useRouteMatch();
  useEffect(() => {
    const getMovieId = async () => {
      console.log("433333333333");
      await axios
        .get(`https://api.moviebara.com/posts?user_id=${userInfo.id}`)
        .then((res) => {
          const post = res.data.data.filter((p) => p.id === Number(postId))[0];
          setText(post.text);
          setPost(post);
          console.log(post);
          const movieTitle = post.movie.title;
          axios
            .get(`https://api.moviebara.com/movies?movie_title=${movieTitle}`)
            .then((res) => setMovieId(res.data.data.id));
        });
    };
    getMovieId();
  }, []);

  const handleSubmit = () => {
    const data = JSON.stringify({
      userId: userInfo.id,
      movieId: Number(movieId),
      postId,
      rate: 8.3,
      text,
    });

    const config = {
      method: "patch",
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
              리뷰 수정
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
