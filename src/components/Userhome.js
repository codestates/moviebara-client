import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styles from "../css/userhome.module.css";
import posts from "../dummy/posts.json";
import users from "../dummy/users.json";
import movies from "../dummy/movies.json";
import PostList from "./PostList";
import PostListUD from "./PostListUD";
import UpdateReviewBox from "./UpdateReviewBox";

const usersData = users;
const postsData = posts;
const movieData = movies.movies;

export default function Userhome() {
  const user = usersData.users[0]; /****** get user's info */
  const scrapPostId = [5, 6, 7, 8, 9]; /******* get user's scrap */
  const userPosts = postsData.posts.filter((post) => post.user_id === user.id);
  const scrapPosts = postsData.posts.filter((post) =>
    scrapPostId.includes(post.id)
  );
  let match = useRouteMatch();

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img className={styles.img} src={user.image} />
        <div className={styles.info}>
          <div>{user.nickname}</div>
          <div>
            내가 쓴 리뷰 : {userPosts.length} 스크랩한 리뷰 :{" "}
            {scrapPosts.length}
          </div>
        </div>
      </div>
      <div className={styles.linksBox}>
        <Link to={match.url}>내가 쓴 리뷰</Link>
        <Link to={`${match.url}/scraps`}>스크랩한 리뷰</Link>
      </div>
      <div className={styles.postsBox}>
        <Switch>
          <Route exact path={match.path}>
            <PostListUD posts={userPosts} />
          </Route>
          <Route path={`${match.path}/scraps`}>
            <PostList posts={scrapPosts} />
          </Route>
          <Route path={`${match.path}/:id`}>
            <UpdateReviewBox />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
