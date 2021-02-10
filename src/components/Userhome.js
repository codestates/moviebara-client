import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import styles from "../css/userhome.module.css";
import PostList from "./PostList";

import UpdateReviewBox from "./UpdateReviewBox";

// with dummyData
//import PostListUD from "./PostListUD";
// import posts from "../dummy/posts.json";
// import users from "../dummy/users.json";
// import movies from "../dummy/movies.json";
// const usersData = users;
// const postsData = posts;
// const movieData = movies.movies;

// export default function Userhome() {
//   const user = usersData.users[0];
//   const scrapPostId = [5, 6, 7, 8, 9];
//   const userPosts = postsData.posts.filter((post) => post.user_id === user.id);
//   const scrapPosts = postsData.posts.filter((post) =>
//     scrapPostId.includes(post.id)
//   );
//   let match = useRouteMatch();

//   return (
//     <div className={styles.container}>
//       <div className={styles.userInfo}>
//         <img className={styles.img} src={user.image} />
//         <div className={styles.info}>
//           <div>{user.nickname}</div>
//           <div>
//             내가 쓴 리뷰 : {userPosts.length} 스크랩한 리뷰 :{" "}
//             {scrapPosts.length}
//           </div>
//         </div>
//       </div>
//       <div className={styles.linksBox}>
//         <Link to={match.url}>내가 쓴 리뷰</Link>
//         <Link to={`${match.url}/scraps`}>스크랩한 리뷰</Link>
//       </div>
//       <div className={styles.postsBox}>
//         <Switch>
//           <Route exact path={match.path}>
//             <PostListUD posts={userPosts} />
//           </Route>
//           <Route path={`${match.path}/scraps`}>
//             <PostList posts={scrapPosts} />
//           </Route>
//           <Route path={`${match.path}/:id`}>
//             <UpdateReviewBox />
//           </Route>
//         </Switch>
//       </div>
//     </div>
//   );
// }

// with state

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Userhome({ userInfo, scraps, movies, accessToken }) {
  const { userId, nickname, image } = userInfo;

  const [posts, setPosts] = useState(null);
  const [genres, setGenres] = useState(null);
  const [Rmessage, setRMessage] = useState("img url");
  const [Smessage, setSMessage] = useState("img url");
  const [filtered, setFiltered] = useState(posts);

  const { scrap } = useParams();

  useEffect(() => {
    if (!scrap) {
      getPosts();
    } else {
      setPosts(scraps);
      if (scraps.length === 0) {
        setSMessage("Scrap reviews!");
      }
    }
    getGenreArray(posts);
  });

  const getPosts = () => {
    axios
      .get(`https://api.moviebara.com/posts?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.posts);
        } else if (res.data.message === "There's no post of user") {
          setMessage("Post your first review!");
        } else if (res.data.message === "need some id") {
          setMessage("please login again");
        }
      });
  };

  const getGenreArray = (reviews) => {
    const temp = reviews.map((p) => {
      for (let movie of movies) {
        if (p.movie_id === movie.id) return movie.genre;
      }
    });

    setGenres([...new Set(temp)]);
  };

  const filtPosts = (genre) => {
    const filteredPosts = posts.filter((p) => {
      const mvGenres = movies.filter((mv) => {
        if (mv.id === p.movie_id) {
          return mv.genre;
        }
      });
      return mvGenres.includes(genre);
    });

    setFiltered(filteredPosts);
  };

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
          <Link to={match.url}>내가 쓴 리뷰</Link>
        </div>
        <div className={styles.myScrap_link}>
          <Link to={`${match.url}/scraps`}>스크랩</Link>
        </div>
      </div>
      <Switch>
        <Route exact path={match.path}>
          <div className={styles.genreFilter_box}>
            <div className={styles.genre_tag} onClick={setFiltered(posts)}>
              모든 장르
            </div>
            {genres.map((g) => (
              <div
                key={genres.indexOf(g)}
                className={styles.genre_tag}
                onClick={filtPosts(g)}
              >
                {g}
              </div>
            ))}
          </div>
          <div className={styles.posts_box}>
            <PostList
              posts={filtered}
              userInfo={userInfo}
              scraps={scraps}
              deleteHandler={handleDelete}
            />
          </div>
        </Route>
        <Route path={`${match.path}/scraps`}>
          <div className={styles.genreFilter_box}>
            <div className={styles.genre_tag} onClick={setFiltered(scraps)}>
              모든 장르
            </div>
            {genres.map((g) => (
              <div
                key={genres.indexOf(g)}
                className={styles.genre_tag}
                onClick={filtPosts(g)}
              >
                {g}
              </div>
            ))}
          </div>
          <div className={styles.posts_box}>
            <PostList
              posts={filtered}
              userInfo={userInfo}
              scraps={scraps}
              deleteHandler={handleDelete}
            />
          </div>
        </Route>
        <Route path={`${match.path}/:userId/:movieId`}>
          <UpdateReviewBox />
        </Route>
      </Switch>
    </div>
  );
}
