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
import UpdateReviewBox from "./UpdateReviewBox.js";
import styles from "../css/mvposts.module.css";

export default function MvPosts({ userInfo }) {
  const { id } = userInfo;
  const { movieId } = useParams();
  const match = useRouteMatch();

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mvInfo, setMvInfo] = useState(null);
  const [scraps, setScraps] = useState(null);
  const [scraps_id, setScraps_id] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setPosts(null);
      setMvInfo(null);
      setLoading(true);
      setScraps([]);
      setScraps_id([]);
      await axios
        .get(`http://localhost:4000/posts?movie_id=${movieId}`)
        .then((res) => {
          setPosts(res.data.data);
        });
      await axios
        .get(`http://localhost:4000/movies?movie_id=${movieId}`)
        .then((res) => {
          setMvInfo(res.data.data);
        });
      await axios
        .get(`http://localhost:4000/scraps?user_id=${id}`)
        .then((res) => {
          if (!res.data.data) {
            setScraps([]);
            setScraps_id([]);
          } else {
            setScraps(res.data.data);
            const scrapIds = res.data.data.map((p) => p.postId);
            setScraps_id(scrapIds);
          }
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleDelete = (postId) => {
    const data = JSON.stringify({ postId: postId });
    const config = {
      method: "delete",
      url: "http://localhost:4000/posts/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };
    axios(config).then((res) => {
      axios
        .get(`http://localhost:4000/posts?movie_id=${movieId}`)
        .then((res) => {
          setPosts(res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const handleScrap = (postId) => {
    const data = JSON.stringify({ postId: postId, userId: id });
    const config = {
      method: "post",
      url: "http://localhost:4000/scraps/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };
    axios(config).then((res) => {
      axios
        .get(`http://localhost:4000/scraps?user_id=${id}`)
        .then((res) => {
          if (!res.data.data) {
            setScraps([]);
            setScraps_id([]);
          } else {
            setScraps(res.data.data);
            const scrapIds = res.data.data.map((p) => p.postId);
            setScraps_id(scrapIds);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const handleUnscrap = (postId) => {
    const data = JSON.stringify({ postId: postId, userId: id });
    const config = {
      method: "delete",
      url: "http://localhost:4000/scraps/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };
    axios(config).then((res) => {
      axios
        .get(`http://localhost:4000/scraps?user_id=${id}`)
        .then((res) => {
          if (!res.data.data) {
            setScraps([]);
            setScraps_id([]);
          } else {
            setScraps(res.data.data);
            const scrapIds = res.data.data.map((p) => p.postId);
            setScraps_id(scrapIds);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  if (loading) return <div>로딩중</div>;
  if (mvInfo === null && posts === null) {
    return <div className={styles.contatiner}></div>;
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
                  scraps_id={scraps_id}
                  deleteHandler={handleDelete}
                  scrapHandler={handleScrap}
                  unscrapHandler={handleUnscrap}
                />
              </div>
            </Route>
            <Route path={`${match.path}/create`}>
              <NewReview userInfo={userInfo} setPosts={setPosts} />
            </Route>
            <Route path={`${match.path}/:postId`}>
              <UpdateReviewBox userInfo={userInfo} setPosts={setPosts} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
