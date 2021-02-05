import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styles from "../css/userhome.modules.css";
import posts from "../dummy/posts.json";
import users from "../dummy/users.json";
import movies from "../dummy/movies.json";
const usersData = users;
const postsData = posts;
const movieData = movies.movies;
export default function Userhome() {
  const user = usersData.users[0]; /****** get user's info */
  const scrapPostId = [5, 6, 7, 8, 9]; /******* get user's scrap */
  const userPosts = postsData.posts.filter((post) => {
    return post.user_id === user.id;
  });
  let curData = userPosts;
  const userReview = () => {
    curData = userPosts;
  };

  const userScrap = () => {
    curData = postsData.posts.filter((post) => {
      return scrapPostId.includes(post.id);
    });
  };

  const handleGenre = (e) => {
    const texts = [];
    for (let i = 0; i < e.options.length; i++) {
      const option = e.options[i];
      if (option.selected) {
        texts.push(option.text);
      }
      //****TODO:change state */
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={user.image} alt="프로필 사진" />
        <div>{user.nickname}</div>
        <div>
          내가 작성한 리뷰:{userPosts.length}, 스크랩한 리뷰:
          {scrapPostId.length}
        </div>
      </div>
      <div className={styles.btn_box}>
        <span onClick={userReview}>내가 작성한 리뷰</span>
        <span onClick={userScrap}>스크랩한 리뷰</span>
      </div>
      (curData === userPosts) ? (
      <div className={styles.mini_header}>
        <span className={styles.genre_category}>
          <select
            className={styles.combo_box}
            multiple="multiple"
            onChange={handleGenre}
          >
            <option value="none">=== 장르 ===</option>
            {userPosts.map((post) => {
              let mvInfo = movieData.filter((mv) => {
                return mv.id === post.movie_id;
              })[0];
              console.log(mvInfo);
              let result = "";
              for (let i = 0; i < mvInfo.genre.length; i++) {
                result += (
                  <option value={mvInfo.genre[i]}>{mvInfo.genre[i]}</option>
                );
              }
              return result;
            })}
          </select>
        </span>
        <span className={styles.newReview}>
          <Router>
            <Link to="/create_post">
              <button className={styles.newReview_btn}>새 리뷰 쓰기</button>
            </Link>
            <Switch>
              <Route>
                <CreatePost />
              </Route>
            </Switch>
          </Router>
        </span>
      </div>
      <div className={styles.review_box}>
        {curData.map((post) => {
          return <Post post={post} handleUpdate={true} />;
        })}
      </div>
      ):(
      <div className={styles.review_box}>
        {curData.map((post) => {
          return <Post post={post} handleUpdate={false} />; //******TODO: 컴포넌트 만들기, handleUpdate프롭스 유무에 따라 화면 routing *************/
        })}
      </div>
      )
    </div>
  );
}

function Post({ post, handleUpdate }) {
  return handleUpdate ? (
    <div>
      <span>
        <img src={post.image} alt="포스터" />
      </span>
      <span>
        <div>{post.title + "  " + post.year}</div>
        <div>{post.text}</div>
      </span>
      <span>
        <Router>
          <Link to="/Update">수정</Link>
          <Switch>
            <Route path="/Update">
              <UpdatePost post={post} />
            </Route>
          </Switch>
        </Router>
      </span>
    </div>
  ) : (
    <div>
      <span>
        <img src={post.image} alt="포스터" />
      </span>
      <span>
        <div>{post.title + "  " + post.year}</div>
        <div>{post.text}</div>
      </span>
    </div>
  );
}

function CreatePost() {
  return "수정하기 페이지";
}

function UpdatePost({ post }) {
  return post + "수정하기 페이지";
}
