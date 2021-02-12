import styles from "../css/mypage.module.css";
import movies from "../dummy/movies.json";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function MyPage() {
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const submitModified = () => {
    const data = JSON.stringify({
      nickname,
      password,
      image,
    });

    const config = {
      method: "patch",
      url: "https://api.moviebara.com/users/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [image, setImage] = useState(movies.movies[0].image);
  const fileInput = React.createRef();

  const imageChangeHandler = () => {
    const img = URL.createObjectURL(fileInput.current.files[0]);
    setImage(img);
  };

  return (
    <div className={styles.box}>
      <label htmlFor="fileUploader" className={styles.profileLabel}>
        <div className={styles.profileFilter}>
          <FontAwesomeIcon icon={faCamera} size="3x" />
        </div>
        <img src={image} className={styles.profile}></img>
      </label>
      <div>munawiki@gmail.com</div>
      <input
        type="file"
        onChange={imageChangeHandler}
        ref={fileInput}
        className={styles.fileUploader}
        id="fileUploader"
      ></input>
      <input
        type="text"
        placeholder="nickname"
        onChange={(e) => setNickname(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="password check"
        onChange={(e) => setPasswordCheck(e.target.value)}
      ></input>
      <button onClick={submitModified}>Modified</button>
    </div>
  );
}
