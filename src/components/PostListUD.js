import { Link, useRouteMatch } from "react-router-dom";
import styles from "../css/postlistud.module.css";
import Post from "./Post";

export default function PostListUD({ posts }) {
  let match = useRouteMatch();

  const handleDelete = (postId) => {
    /* request Delete review , setstate */
  };

  return (
    <div className={styles.reviewbox}>
      {posts.map((p) => (
        <div className={styles.box}>
          <Post key={p.id} post={p} />
          <div className={styles.btn_box}>
            <div>
              <Link to={`${match.url}/${p.id}`}>수정</Link>
            </div>
            <div onClick={handleDelete(p.id)}>삭제</div>
          </div>
        </div>
      ))}
    </div>
  );
}
