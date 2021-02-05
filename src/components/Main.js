import MvPosts from "./MvPosts.js";
import MvList from "./MvList.js";

import styles from "../css/main.module.css";

import { Route, useRouteMatch } from "react-router";

function Main() {
  let match = useRouteMatch();
  return (
    <>
      <Route exact path={match.path} component={MvList} />
      <Route path={`${match.path}/:id`}>
        <MvPosts />
      </Route>
    </>
  );
}

// function Main() {
//   const handleClick = (e) => {
//     this.props.history.push(`/mv_${e.key}`);
//   };

//   return (
//     <div className={styles.container}>
//       {data.map((mv) => {
//         return (
//           <div key={mv.id} className={styles.poster} onClick={handleClick}>
//             <img src={mv.image} alt="" />
//             <div>{mv.title}</div>
//             <div>개봉연도:{mv.year}</div>
//             <div>장르:{mv.genre}</div>
//             <div>평점:{mv.rate}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function Mvposts({ id, data }) {
//   const mv = data.filter((m) => {
//     return m.id === id;
//   });
//   const posts = postsData.filter((p) => {
//     return p.movie_id === id;
//   });
//   return (
//     <div>
//       <div>
//         <img src={mv.image} alt="" />
//         <div>{mv.title}</div>
//         <div>개봉연도:{mv.year}</div>
//         <div>장르:{mv.genre}</div>
//         <div>평점:{mv.rate}</div>
//       </div>
//       <div>
//         {posts.map((p) => {
//           return <div key={p.id}>{p.text}</div>;
//         })}
//       </div>
//     </div>
//   );
// }

export default Main;
