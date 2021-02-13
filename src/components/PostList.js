import styles from "../css/postlist.module.css";
import Post from "./Post.js";
import { Link, useRouteMatch } from "react-router-dom";
export default function PostList({
  posts,
  userInfo,
  deleteHandler,
  scraps_id,
  scrapHandler,
  unscrapHandler,
}) {
  const { nickname } = userInfo;
  const match = useRouteMatch();

  if (!posts) {
    return <div></div>;
  } else {
    console.log(posts);
    console.log(userInfo);
    console.log(scraps_id);
    return (
      <div className={styles.posts_box}>
        {posts.map((p) => {
          if (!p.post) {
            // props로 전달된 posts가 api- getscraps로 온건지, getposts로 온건지
            if (p.user.nickname === nickname) {
              // getposts로 온것중에 user가 쓴글
              return (
                <div key={p.id} className={styles.post_wrapper}>
                  <div className={styles.post}>
                    <Post post={p} />
                  </div>
                  <div className={styles.UD_btn}>
                    <div className={styles.update_btn}>
                      <Link to={`${match.url}/${p.id}`}>수정</Link>
                    </div>
                    <button
                      className={styles.delete_btn}
                      onClick={() => {
                        console.log(p.id + "삭제!");
                        deleteHandler(p.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            }
            return (
              <div key={p.id} className={styles.post_wrapper}>
                <div className={styles.post}>
                  <Post post={p} />
                </div>

                {scraps_id.includes(p.id) ? (
                  <div className={styles.UD_btn}>
                    <button
                      className={styles.scrap_btn}
                      onClick={() => {
                        unscrapHandler(p.id);
                      }}
                    >
                      스크랩 취소
                    </button>
                  </div>
                ) : (
                  <div className={styles.UD_btn}>
                    <button
                      className={styles.scrap_btn}
                      onClick={() => {
                        scrapHandler(p.id);
                      }}
                    >
                      스크랩
                    </button>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div key={p.postId} className={styles.post_wrapper}>
                <div className={styles.post}>
                  <Post post={p.post} />
                </div>
                {scraps_id.includes(p.postId) ? (
                  <div className={styles.UD_btn}>
                    <button
                      className={styles.scrap_btn}
                      onClick={() => {
                        unscrapHandler(p.postId);
                      }}
                    >
                      스크랩 취소
                    </button>
                  </div>
                ) : (
                  <div className={styles.UD_btn}>
                    <button
                      className={styles.scrap_btn}
                      onClick={() => {
                        scrapHandler(p.postId);
                      }}
                    >
                      스크랩
                    </button>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    );
  }
}
