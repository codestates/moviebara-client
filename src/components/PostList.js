import styles from "../css/postlist.module.css";
import Post from "./Post.js";
import { Link, useRouteMatch } from "react-router-dom";
export default function PostList({
  posts,
  userInfo,
  deleteHandler,
  mvInfo,
  scraps_id,
  scrapHandler,
  unscrapHandler,
  setPosts,
}) {
  const { nickname } = userInfo;
  const match = useRouteMatch();

  if (!posts) {
    return <div></div>;
  } else {
    return (
      <div className={styles.posts_box}>
        {posts
          .map((p) => {
            if (!p.post) {
              // props로 전달된 posts가 api- getscraps로 온건지, getposts로 온건지
              if (p.user.nickname === nickname) {
                // getposts로 온것중에 user가 쓴글
                return (
                  <div key={p.id} className={styles.post_wrapper}>
                    <div className={styles.post}>
                      <Post post={p} mvInfo={mvInfo} />
                    </div>
                    <div className={styles.UD_btn}>
                      <div className={styles.btn}>
                        <Link
                          className={styles.link}
                          to={`${match.url}/${p.id}`}
                        >
                          수정
                        </Link>
                      </div>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          deleteHandler(p.id);
                        }}
                      >
                        삭제
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={p.id} className={styles.post_wrapper}>
                  <div className={styles.post}>
                    <Post post={p} mvInfo={mvInfo} />
                  </div>
                  {scraps_id.includes(p.id) ? (
                    <div className={styles.UD_btn}>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          unscrapHandler(p.id);
                          const temp = [...posts];
                          temp[temp.findIndex((v) => v.id === p.id)].scrap -= 1;
                          setPosts(temp);
                        }}
                      >
                        스크랩<div>취소</div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.UD_btn}>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          scrapHandler(p.id);
                          const temp = [...posts];
                          temp[temp.findIndex((v) => v.id === p.id)].scrap += 1;
                          setPosts(temp);
                        }}
                      >
                        스크랩
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div key={p.postId} className={styles.post_wrapper}>
                  <div className={styles.post}>
                    <Post post={p.post} mvInfo={mvInfo} />
                  </div>
                  {scraps_id.includes(p.postId) ? (
                    <div className={styles.UD_btn}>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          unscrapHandler(p.postId);
                          const temp = [...posts];
                          temp.scrap += 1;
                          setPosts(temp);
                        }}
                      >
                        스크랩<div>취소</div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.UD_btn}>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          scrapHandler(p.postId);
                          const temp = [...posts];
                          temp.scrap += 1;
                          setPosts(temp);
                        }}
                      >
                        스크랩
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })
          .reverse()}
      </div>
    );
  }
}
