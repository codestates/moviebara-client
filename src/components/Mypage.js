import styles from "../css/mypage.module.css";
import movies from "../dummy/movies.json";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function MyPage(props) {
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [image, setImage] = useState(movies.movies[0].image);

  const submitModified = () => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("nickname", nickname);
    formData.append("password", password);

    const config = {
      method: "patch",
      url: "https://api.moviebara.com/users/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        axios.get("https://api.moviebara.com/users/").then((res) => {
          props.setUserInfo(res.data.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileInput = React.createRef();

  const imageChangeHandler = () => {
    setImage(fileInput.current.files[0]);
  };

  return (
    <div className={styles.box}>
      <label htmlFor="fileUploader" className={styles.profileLabel}>
        <div className={styles.profileFilter}>
          <FontAwesomeIcon icon={faCamera} size="3x" />
        </div>
        <img src={props.userInfo.image} className={styles.profile}></img>
      </label>
      <div>{props.userInfo.email}</div>
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
