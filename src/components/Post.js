import styles from "../css/post.module.css";
import movies from "../dummy/movies.json";
import dummyImage from "../dummy/images/1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Post({ post }) {
  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <div className={styles.profilePhotoBox}>
          <img className={styles.profilePhoto} src={post.user.image}></img>
        </div>
        <div className={styles.nickName}>{post.user.nickname}</div>
        {/* <div className={styles.date}>{"2020-02-20"}</div> */}
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <img src={post.movie.image} className={styles.movieImage}></img>
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.movieTitle}>
            <div>{post.movie.title}</div>
            <div>{post.createdAt.slice(0, 10)}</div>
          </div>
          <div className={styles.movieReviewBox}>
            <div className={styles.movieReview}>{post.text}</div>
          </div>
          <div className={styles.movieUtil}>
            <div className={styles.awesome}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            {/* <div className={styles.tagBox}>
              <div>tag1</div>
              <div>tag2</div>
              <div>tag3</div>
            </div> */}
            <div className={styles.scrap}>스크랩 {post.scrap}</div>
            <div className={styles.report}>신고</div>
          </div>
        </div>
      </div>
    </div>
  );
}
