import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App.js";
import axios from "axios";

axios.defaults.withCredentials = true;
const root = document.getElementById("root");

ReactDOM.render(<App />, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
