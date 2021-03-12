import styles from "../css/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { emailValidator, passwordValidator } from "../modules/validators.js";
import GoogleLogin from "react-google-login";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

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
        "https://apimovie.capybara25.com/login/googleLogin/",
        {
          token: response.tokenObj.id_token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        axios
          .get("https://apimovie.capybara25.com/users/")
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
    const data = JSON.stringify({
      password: password,
      email: email,
    });

    const config = {
      method: "post",
      url: "https://apimovie.capybara25.com/login/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios(config)
      .then(() => {
        axios
          .get("https://apimovie.capybara25.com/users/")
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
      <div className={styles.buttonBox}>
        <button onClick={submitLogin} className={styles.signInButton}>
          SignIn
        </button>
        <GoogleLogin
          clientId="27009864668-5sahnm79e1ij8sih5sbgv4foariaslc4.apps.googleusercontent.com"
          buttonText="Login"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={styles.signInButton}
            >
              Google Login
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}
