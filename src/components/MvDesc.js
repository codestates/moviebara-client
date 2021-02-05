import styles from "../css/mvdesc.module.css";

export default function MvDesc({ mv }) {
  return (
    <>
      <img src={mv.image} alt="" />
      <div>{mv.title}</div>
      <div>개봉연도:{mv.year}</div>
      <div>장르:{mv.genre}</div>
      <div>평점:{mv.rate}</div>
    </>
  );
}
