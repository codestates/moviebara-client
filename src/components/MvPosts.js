import {
  useParams,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import PostList from "./PostList.js";
import NewReview from "./NewReview.js";
import styles from "../css/mvposts.module.css";
import movies from "../dummy/movies.json";
import posts from "../dummy/posts.json";
const moviesData = movies.movies;
const postsData = posts.posts;

export default function MvPosts() {
  let { id } = useParams();
  let match = useRouteMatch();

  let mv = moviesData.filter((m) => m.id === Number(id))[0];
  let mvPosts = postsData.filter((p) => p.movie_id === Number(id));
  console.log(id);
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
      <div className={styles.posts_box}>
        <Switch>
          <Route exact path={match.path}>
            <Link to={`${match.url}/create`}>새글쓰기</Link>
            <PostList mvPosts={mvPosts} />
          </Route>
          <Route path={`${match.path}/create`}>
            <NewReview movie_id={mv.id} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
