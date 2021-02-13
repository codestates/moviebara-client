import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/userhome.module.css";
import PostList from "./PostList";
import UpdateReviewBox from "./UpdateReviewBox";

export default function Userhome({ userInfo }) {
  const { id, nickname, image } = userInfo;
  const match = useRouteMatch();
  const [posts, setPosts] = useState(null);
  const [scraps, setScraps] = useState(null);
  const [scraps_id, setScraps_id] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [genres, setGenres] = useState(null);
  const history = useHistory();

  const getGenreArray = (reviews) => {
    const temp = reviews.map((p) => p.movie.genre);

    setGenres([...new Set(temp)]);
  };

  const getPosts = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setPosts(null);
      setScraps(null);
      setScraps_id(null);
      setData(null);

      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        `https://api.moviebara.com/posts?user_id=${id}`
      );
      const response2 = await axios.get(
        `https://api.moviebara.com/scraps?user_id=${id}`
      );

      setPosts(response.data.post);
      setData(response.data.post);
      setScraps(response2.data.data);
      const scrapIds = response2.data.data.map((p) => p.postId);
      setScraps_id(scrapIds);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  const filtPosts = (genre) => {
    const filteredPosts = posts.filter((p) => p.movie.genre === genre);

    setFiltered(filteredPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = (postId) => {
    console.log("delete from userhome");
    const data = JSON.stringify({ postId: postId });
    const config = {
      method: "delete",
      url: "https://api.moviebara.com/posts/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };
    axios(config).then((res) => {
      axios
        .get(`https://api.moviebara.com/posts?user_id=${id}`)
        .then((res) => {
          console.log("what the ffffffffffffffffff");
          setPosts(res.data.post);
          setData(res.data.post);
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
      url: "https://api.moviebara.com/scraps/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };
    axios(config).then((res) => {
      axios
        .get(`https://api.moviebara.com/scraps?user_id=${id}`)
        .then((res) => {
          console.log("what the ffffffffffffffffff");
          setScraps(res.data.data);
          const scrapIds = res.data.data.map((p) => p.postId);
          setScraps_id(scrapIds);
          setData(res.data.data);
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
      url: "https://api.moviebara.com/scraps/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };
    axios(config).then((res) => {
      axios
        .get(`https://api.moviebara.com/scraps?user_id=${id}`)
        .then((res) => {
          console.log("what the ffffffffffffffffff");
          setScraps(res.data.data);
          const scrapIds = res.data.data.map((p) => p.postId);
          setScraps_id(scrapIds);
          setData(res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생!!{error}</div>;
  if (!posts && !scraps) return null;
  return (
    <div className={styles.container}>
      <div className={styles.userInfo_box}>
        <div className={styles.img_box}>
          <img className={styles.img} src={image} alt="사용자 프로필 사진" />
        </div>
        <div className={styles.info_box}>
          <p>{nickname}</p>
          <p>
            내가 쓴 리뷰 : {posts.length} 스크랩 : {scraps.length}
          </p>
        </div>
      </div>

      <div className={styles.links_Box}>
        <div className={styles.myReview_link}>
          <button
            onClick={() => {
              setData(posts);
            }}
          >
            내가 쓴 리뷰
          </button>
        </div>
        <div className={styles.myScrap_link}>
          <button
            onClick={() => {
              setData(scraps);
              console.log(scraps_id);
            }}
          >
            스크랩
          </button>
        </div>
      </div>
      <Switch>
        <Route exact path={match.path}>
          {/* <div className={styles.genreFilter_box}>
            <div className={styles.genre_tag} onClick={setFiltered(posts)}>
              모든 장르
            </div>
            {genres.map((g) => (
              <div
                key={genres.indexOf(g)}
                className={styles.genre_tag}
                onClick={filtPosts(g, posts)}
              >
                {g}
              </div>
            ))}
          </div> */}
          <div className={styles.posts_box}>
            <PostList
              posts={data}
              userInfo={userInfo}
              scraps_id={scraps_id}
              deleteHandler={handleDelete}
              scrapHandler={handleScrap}
              unscrapHandler={handleUnscrap}
            />
          </div>
        </Route>
        <Route path={`${match.path}/:postId`}>
          <UpdateReviewBox />
        </Route>
      </Switch>
    </div>
  );
}
