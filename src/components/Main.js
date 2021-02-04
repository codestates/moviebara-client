import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styles from "../css/main.module.css";
import movies from "../dummy/movies.json";
import posts from "../dummy/posts.json";
const data = movies.movies;
const postsData = posts.posts;
function Main() {
  const handleClick = (e) => {
    this.props.history.push(`/mv_${e.key}`);
  };
  return (
    <div className={styles.container}>
      {data.map((mv) => {
        return (
          <div key={mv.id} className={styles.poster} onClick={handleClick}>
            <img src={mv.image} alt="" />
            <div>{mv.title}</div>
            <div>개봉연도:{mv.year}</div>
            <div>장르:{mv.genre}</div>
            <div>평점:{mv.rate}</div>
          </div>
        );
      })}
    </div>
  );
}

function Mvposts({ id, data }) {
  const mv = data.filter((m) => {
    return m.id === id;
  });
  const posts = postsData.filter((p) => {
    return p.movie_id === id;
  });
  return (
    <div>
      <div>
        <img src={mv.image} alt="" />
        <div>{mv.title}</div>
        <div>개봉연도:{mv.year}</div>
        <div>장르:{mv.genre}</div>
        <div>평점:{mv.rate}</div>
      </div>
      <div>
        {posts.map((p) => {
          return <div key={p.id}>{p.text}</div>;
        })}
      </div>
    </div>
  );
}

export default Main;
