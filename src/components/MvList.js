import { Link, useRouteMatch } from "react-router-dom";

import MvDesc from "./MvDesc.js";
import styles from "../css/mvlist.module.css";

export default function MvList({ movies }) {
  let match = useRouteMatch();

  return (
    <div className={styles.container}>
      {Array.isArray(movies)
        ? movies.map((mv) => (
            <div key={mv.id} className={styles.poster}>
              <Link to={`${match.url}/${mv.id}`} className={styles.posterInbox}>
                <MvDesc mv={mv} />
              </Link>
            </div>
          ))
        : ""}
    </div>
  );
}
