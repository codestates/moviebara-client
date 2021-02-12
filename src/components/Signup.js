import styles from "../css/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [nickName, setNickName] = useState();
  const history = useHistory();

  const submitSignup = () => {
    const data = JSON.stringify({
      nickname: nickName,
      password: password,
      email: email,
    });

    const config = {
      method: "post",
      url: "http://localhost:4000/users/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("회원가입이 완료되었습니다!");
        history.push("/signin");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="password check"
          onChange={(e) => setPasswordCheck(e.target.value)}
        ></input>
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="nickname"
          onChange={(e) => setNickName(e.target.value)}
        ></input>
      </div>
      <div className={styles.buttonBox}>
        <button onClick={submitSignup}>SignUp</button>
      </div>
    </div>
  );
}
