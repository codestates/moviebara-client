import styles from "../css/mvdesc.module.css";

export default function MvDesc({ mv }) {
  return (
    <div className={styles.info_box}>
      <img src={mv.image} alt="" className={styles.img} />
      <div className={styles.title}>{mv.title}</div>
      <div>개봉연도: {mv.year}</div>
      <div>장르: {mv.genre}</div>
      {/* <div>평점:{mv.rate}</div> */}
    </div>
  );
}
