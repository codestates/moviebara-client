import {
  useParams,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostList from "./PostList.js";
import NewReview from "./NewReview.js";
import styles from "../css/mvposts.module.css";

export default function MvPosts({ userInfo }) {
  const { movieId } = useParams();
  const match = useRouteMatch();

  const [posts, setPosts] = useState();
  const [message, setMessage] = useState("loading..");
  const [mvInfo, setMvInfo] = useState();

  useEffect(() => {
    getMvInfo();
    getData();
  }, []);

  const getData = () => {
    axios.get(`http://localhost:4000/posts?movie_id=${movieId}`).then((res) => {
      console.log(res.data.post);
      setPosts(res.data.post);
    });
  };
  const getMvInfo = () => {
    axios
      .get(`http://localhost:4000/movies?movie_id=${movieId}`)
      .then((res) => {
        console.log(res.data);
        setMvInfo(res.data);
      });
  };

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:4000/posts`, { postId });
  };

  if (mvInfo === undefined) {
    return <div className={styles.contatiner}>{message}</div>;
  } else {
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
          <Switch>
            <Route exact path={match.path}>
              <div className={styles.newReview_btn}>
                <Link to={`${match.url}/create`}>리뷰 작성</Link>
              </div>
              <div className={styles.posts}>
                <PostList
                  posts={posts}
                  userInfo={userInfo}
                  deleteHandler={handleDelete}
                />
              </div>
            </Route>
            <Route path={`${match.path}/create`}>
              <NewReview userId={userInfo} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
