import { useParams } from "react-router-dom";

import styles from "../css/mvposts.module.css";
import movies from "../dummy/movies.json";
import posts from "../dummy/posts.json";
const moviesData = movies.movies;
const postsData = posts.posts;

export default function MvPosts() {
  let { id } = useParams();
  let mv = moviesData.filter((m) => m.id === Number(id))[0];

  let mvPosts = postsData.filter((p) => p.movie_id === Number(id));

  return (
    <div className={styles.container}>
      <div className={styles.mvInfo}>
        <span>
          <img src={mv.image} alt="포스터" />
        </span>
        <span>
          <div>{mv.title + "  " + mv.year}</div>
          <div>줄거리</div>
        </span>
      </div>
      <div className={styles.reviewbox}></div>
    </div>
  );
}
