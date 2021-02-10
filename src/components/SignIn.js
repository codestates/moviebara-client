import styles from "../css/login.module.css";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitLogin = () => {
    const data = JSON.stringify({
      password: password,
      email: email,
    });

    const config = {
      method: "post",
      url: "https://api.moviebara.com/login/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        axios
          .get("https://api.moviebara.com/users/")
          .then((res) => {
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.signInBox}>
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
      <div className={styles.buttonBox}>
        <button onClick={submitLogin}>SignIn</button>
      </div>
    </div>
  );
}
