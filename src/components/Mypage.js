import styles from "../css/mypage.module.css";
import movies from "../dummy/movies.json";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function MyPage() {
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
      <input type="text" placeholder="nickname"></input>
      <input type="password" placeholder="password"></input>
      <input type="password" placeholder="password check"></input>
      <button>Modified</button>
    </div>
  );
}
