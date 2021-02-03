import styles from "../css/login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.logo}></div>
        <div className={styles.inputBox}>
          <input type="text"></input>
          <input type="password"></input>
        </div>
        <div className={styles.buttonBox}>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
