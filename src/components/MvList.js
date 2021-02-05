import { Link, useRouteMatch } from "react-router-dom";

import MvDesc from "./MvDesc.js";
import styles from "../css/mvlist.module.css";
import movies from "../dummy/movies.json";

const moviesData = movies.movies;

export default function MvList() {
  let match = useRouteMatch();
  return (
    <div className={styles.container}>
      {moviesData.map((mv) => (
        <div key={mv.id} className={styles.poster}>
          <Link to={`${match.url}/${mv.id}`}>
            <MvDesc mv={mv} />
          </Link>
        </div>
      ))}
    </div>
  );
}
