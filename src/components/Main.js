import MvPosts from "./MvPosts.js";
import MvList from "./MvList.js";
import styles from "../css/main.module.css";
import { Route, useRouteMatch } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Main({ userInfo }) {
  const match = useRouteMatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    axios.get("https://api.moviebara.com/movies/").then((res) => {
      console.log(res.data.data);
      setMovies(res.data.data);
    });
  };
  return (
    <>
      <Route exact path={match.path}>
        <div className={styles.contatiner}>
          <MvList movies={movies} />
        </div>
      </Route>
      <Route path={`${match.path}/:movieId`}>
        <div className={styles.mvPosts_box}>
          <MvPosts userInfo={userInfo} />
        </div>
      </Route>
    </>
  );
}

export default Main;
