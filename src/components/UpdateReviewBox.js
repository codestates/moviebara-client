import styles from "../css/updatereviewbox.module.css";
import MvRate from "./MvRate.js";
import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

// export default function UpdateReviewBox() {
//   const [clicked, setClicked] = useState([false, false, false, false, false]);
//   const [text, setText] = useState("");

//   const history = useHistory();
//   const { postId } = useParams();

//   useEffect(() => {
//     getPost();
//   });

//   const getPost = () => {
//     axios.get(`http://localhost:4000/posts?user_id=${userId}`).then((res) => {
//       if (res.status === 200) {
//         let post = res.data.post.filter((p) => p.movie_id === movieId);
//         setText(post.text);

//         let postRate = clicked.slice();
//         for (let i = 0; i < post.rate; i++) {
//           postRate[i] = true;
//         }
//         setClicked(postRate);
//       }
//     });
//   };

//   const handleStarClick = (e, index) => {
//     e.preventDefault();
//     let clickStates = [...clicked];
//     for (let i = 0; i < 5; i++) {
//       if (i <= index) clickStates[i] = true;
//       else clickStates[i] = false;
//     }
//     setClicked(clickStates);
//   };

//   const handleSubmit = () => {
//     axios
//       .patch(`http://localhost:4000/posts`, {
//         userId,
//         movieId,
//         rate: clicked.filter((e) => e === true).length,
//         text,
//       })
//       .then(history.push("/main"));
//   };

//   return (
//     <div className={styles.contatiner}>
//       <div className={styles.rating_box}>
//         <p>영화 평점</p>
//         <MvRate handleStarClick={handleStarClick} clicked={clicked} />
//       </div>
//       <div className={styles.text_box}>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>
//       <form className={styles.submit} onClick={handleSubmit}>
//         리뷰 수정
//       </form>
//     </div>
//   );
// }

export default function UpdateReviewBox({ userInfo, setPosts }) {
  const { postId } = useParams();
  const [text, setText] = useState("");
  const [movieId, setMovieId] = useState("");
  const history = useHistory();
  const match = useRouteMatch();
  const handleSubmit = () => {
    const getMovieId = async () => {
      await axios
        .get(`http://localhost:4000/posts?user_id=${userInfo.id}`)
        .then((res) => {
          console.log(res.data.data);
          console.log(postId);
          const post = res.data.data.filter((p) => p.id === Number(postId))[0];
          console.log(post);
          const movieTitle = post.movie.title;
          axios
            .get(`http://localhost:4000/movies?movie_title=${movieTitle}`)
            .then((res) => setMovieId(res.data.data.id));
        });
      const data = JSON.stringify({
        userId: userInfo.id,
        movieId: Number(movieId),
        rate: 8.3,
        text,
      });

      const config = {
        method: "patch",
        url: "http://localhost:4000/posts/",
        headers: {
          "Content-Type": "application/json",
        },

        data,
      };

      axios(config).then((res) => {
        axios
          .get(`http://localhost:4000/posts?movie_id=${movieId}`)
          .then((res) => {
            console.log(movieId);
            setPosts(res.data.data);
            history.push(`/main/${movieId}`);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    getMovieId();
  };
  return (
    <div className={styles.contatiner}>
      <div className={styles.text_box}>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <button className={styles.submit} onClick={handleSubmit}>
        리뷰 수정
      </button>
    </div>
  );
}
