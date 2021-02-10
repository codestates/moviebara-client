import {
  useParams,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import PostList from "./PostList.js";
import NewReview from "./NewReview.js";
import styles from "../css/mvposts.module.css";

//with dummyData
// import movies from "../dummy/movies.json";
// import posts from "../dummy/posts.json";
// const moviesData = movies.movies;
// const postsData = posts.posts;

// export default function MvPosts() {
//   let { id } = useParams();
//   let match = useRouteMatch();

//   let mv = moviesData.filter((m) => m.id === Number(id))[0];
//   let mvPosts = postsData.filter((p) => p.movie_id === Number(id));
//   console.log(id);
//   return (
//     <div className={styles.container}>
//       <div className={styles.mvInfo}>
//         <span>
//           <img src={mv.image} alt="포스터" />
//         </span>
//         <span>
//           <div>{mv.title + "  " + mv.year}</div>
//           <div>줄거리</div>
//         </span>
//       </div>
//       <div className={styles.posts_box}>
//         <Switch>
//           <Route exact path={match.path}>
//             <Link to={`${match.url}/create`}>새글쓰기</Link>
//             <PostList posts={mvPosts} />
//           </Route>
//           <Route path={`${match.path}/create`}>
//             <NewReview movieId={mv.id} />
//           </Route>
//         </Switch>
//       </div>
//     </div>
//   );
// }

//with state

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MvPosts({ userInfo, scraps, accessToken }) {
  const { movieId } = useParams();
  const match = useRouteMatch();

  const [posts, setPosts] = useState(null);
  const [message, setMessage] = useState("loading..");
  const [mvInfo, setMvInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.moviebara.com/posts?movie_id=${movieId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data.posts);
        } else if (res.data.message === "There's no post of user") {
          setMessage("Post first review!");
        } else if (res.data.message === "need some id") {
          setMessage("please login again");
        }
      });

    axios
      .get(`https://api.moviebara.com/movies?movie_id=${movieId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setMvInfo(res.data);
        }
      });
  });

  const handleDelete = (postId) => {
    axios.delete(
      `https://api.moviebara.com/posts`,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      }
    );
  };

  return (
    <div className={styles.contatiner}>
      <div className={styles.mvInfo_box}>
        <div className={styles.mvPoster}>
          <img src={mvInfo.image} alt="영화 포스터" />
        </div>
        <div className={styles.mvInfo}>
          <p>
            {mvInfo.title}, {mvInfo.year}{" "}
          </p>
          <p>장르 : {mvInfo.genre}</p>
          <p>줄거리 : {mvInfo.summary}</p>
        </div>
      </div>
      <div className={styles.posts_box}>
        {posts === null ? (
          <div className={styles.message_box}>
            <div className={styles.message}>{message}</div>
            <img className={styles.message_img} src="img url" />
          </div>
        ) : (
          <Switch>
            <Route exact path={match.path}>
              <div className={styles.newReview_btn}>
                <Link to={`${match.url}/create`}>리뷰 작성</Link>
              </div>
              <PostList
                posts={posts}
                userInfo={userInfo}
                scraps={scraps}
                deleteHandler={handleDelete}
              />
            </Route>
            <Route path={`${match.path}/create`}>
              <NewReview
                movieId={mvInfo.id}
                userId={userInfo.id}
                accessToken={accessToken}
              />
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}
