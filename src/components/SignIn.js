import styles from "../css/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const submitLogin = () => {
    const data = JSON.stringify({
      password: password,
      email: email,
    });

    const config = {
      method: "post",
      url: "http://localhost:4000/login/",
      headers: {
        "Content-Type": "application/json",
      },

      data,
    };

    axios(config)
      .then(() => {
        axios
          .get("https://api.moviebara.com/users/")
          .then((res) => {
            props.setIsLogin(true);
            props.setUserInfo(res.data);
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
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
