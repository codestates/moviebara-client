import styles from "../css/login.module.css";
import { useState } from "react";
import axios from "axios";
import { emailValidator, passwordValidator } from "../modules/validators.js";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [nickName, setNickName] = useState();
  const history = useHistory();
  const [warnings, setWarnings] = useState({
    email: "",
    password: "",
  });

  const submitSignup = () => {
    if (!emailValidator(email)) {
      setWarnings({
        email: "올바른 이메일 형식이 아닙니다.",
        password: "",
      });
    } else if (!passwordValidator(password)) {
      setWarnings({
        email: "",
        password:
          "올바른 비밀번호 형식이 아닙니다. 숫자와 문자 포함 6~12자리 이내의 암호",
      });
    } else {
      setWarnings({ email: "", password: "" });
    }

    const data = JSON.stringify({
      nickname: nickName,
      password: password,
      email: email,
    });

    const config = {
      method: "post",
      url: "https://api.moviebara.com/users/",
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
    <div className={styles.inputs}>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.loginInputs}
        ></input>
        <div>{warnings.email}</div>
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInputs}
        ></input>
        <div>{warnings.password}</div>
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="password check"
          onChange={(e) => setPasswordCheck(e.target.value)}
          className={styles.loginInputs}
        ></input>
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="nickname"
          onChange={(e) => setNickName(e.target.value)}
          className={styles.loginInputs}
        ></input>
      </div>
      <div className={styles.buttonBox}>
        <button onClick={submitSignup} className={styles.signInButton}>
          SignUp
        </button>
      </div>
    </div>
  );
}
