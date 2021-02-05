import styles from "../css/login.module.css";

export default function SignUp() {
  return (
    <div>
      <div className={styles.inputBox}>
        <input type="text" placeholder="email"></input>
      </div>
      <div className={styles.inputBox}>
        <input type="password" placeholder="password"></input>
      </div>
      <div className={styles.inputBox}>
        <input type="password" placeholder="password check"></input>
      </div>
      <div className={styles.inputBox}>
        <input type="text" placeholder="nickname"></input>
      </div>
      <div className={styles.buttonBox}>
        <button>SignUp</button>
      </div>
    </div>
  );
}
