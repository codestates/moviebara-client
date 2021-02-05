import styles from "../css/postlist.module.css";
import Post from "./Post.js";

export default function PostList({ posts }) {
  return (
    <div className={styles.reviewbox}>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
