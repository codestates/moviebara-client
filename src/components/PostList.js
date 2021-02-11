import styles from "../css/postlist.module.css";
import Post from "./Post.js";
import { Link, useRouteMatch } from "react-router-dom";
export default function PostList({ posts, userInfo, deleteHandler }) {
  const { id } = userInfo;
  // const scrapedId = scraps.map((p) => p.id);
  const match = useRouteMatch();

  if (posts === undefined) {
    return <div></div>;
  } else
    return (
      <div className={styles.posts_box}>
        {posts.map((p) => {
          return p.user_id === id ? (
            <div className={styles.post}>
              <Post key={p.id} post={p} />
              <div className={styles.UD_btn}>
                <div className={styles.update_btn}>
                  <Link to={`${match.url}/${p.user_id}/${p.movie_id}`}>
                    수정
                  </Link>
                </div>
                <div
                  className={styles.delete_btn}
                  onClick={deleteHandler(p.id)}
                >
                  삭제
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.post}>
              <Post key={p.id} post={p} />

              {/* {scrapedId.includes(p.id) ? (
              <div className={styles.scrap_btn}>스크랩 취소</div>
            ) : (
              <div className={styles.scrap_btn}>스크랩</div>
            )} */}
            </div>
          );
        })}
      </div>
    );
}
