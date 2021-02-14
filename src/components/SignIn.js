import styles from "../css/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { emailValidator, passwordValidator } from "../modules/validators.js";
import GoogleLogin from "react-google-login";

export default function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const [warnings, setWarnings] = useState({
    email: "",
    password: "",
  });

  const responseGoogle = (response) => {
    axios
      .post(
        "https://api.moviebara.com/login/googleLogin/",
        {
          token: response.tokenObj.id_token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        axios
          .get("https://api.moviebara.com/users/")
          .then((res) => {
            props.setIsLogin(true);
            props.setUserInfo(res.data.data);

            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const submitLogin = () => {
    // if (!emailValidator(email)) {
    //   setWarnings({
    //     email: "올바른 이메일 형식이 아닙니다.",
    //     password: "",
    //   });
    // } else if (!passwordValidator(password)) {
    //   setWarnings({
    //     email: "",
    //     password:
    //       "올바른 비밀번호 형식이 아닙니다. 숫자와 문자 포함 6~12자리 이내의 암호",
    //   });
    // } else {
    //   setWarnings({ email: "", password: "" });

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
      data,
    };

    axios(config)
      .then(() => {
        axios
          .get("https://api.moviebara.com/users/")
          .then((res) => {
            props.setIsLogin(true);
            props.setUserInfo(res.data.data);

            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert("회원정보가 일치하지 않습니다.");
      });
    // }
  };

  return (
    <div className={styles.signInBox}>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div>{warnings.email}</div>
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div>{warnings.password}</div>
      </div>
      <div className={styles.buttonBox}>
        <button onClick={submitLogin}>SignIn</button>
        <GoogleLogin
          clientId="27009864668-5sahnm79e1ij8sih5sbgv4foariaslc4.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}
