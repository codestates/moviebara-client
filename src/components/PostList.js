import styles from "../css/postlist.module.css";
import Post from "./Post.js";

export default function PostList({ mvPosts }) {
  return (
    <div className={styles.reviewbox}>
      {mvPosts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
