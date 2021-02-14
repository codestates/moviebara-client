import axios from "axios";

export default function requestLogin(setIsLogin, setUserInfo, history) {
  axios
    .get("https://api.moviebara.com/users/")
    .then((res) => {
      console.log("123");
      setIsLogin(true);
      setUserInfo(res.data.data);
    })
    .catch((err) => {
      history.push("/");
    });
}
