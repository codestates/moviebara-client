import styles from "../css/login.module.css";
import SignIn from "./SignIn.js";
import SignUp from "./Signup.js";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Sign(props) {
  const history = useHistory();

  if (props.isLogin) {
    history.push("/main");
  } else {
    history.push("/signin");
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <Switch>
            <Route path="/signup">
              <Link to="/signin">{"뒤로가기"}</Link>
            </Route>
          </Switch>
        </div>
        <div className={styles.logo}>
          <svg
            width="177"
            height="117"
            viewBox="0 0 177 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3501 114.4C8.13821 114.579 -3.05783 116.623 1.70247 110.805C2.71658 109.565 3.96885 109.31 5.39088 108.697C8.46206 107.373 7.91031 106.998 7.00263 104.048C4.56854 96.1369 3.6 88.1538 4.89496 79.9956C5.34559 77.1566 6.84093 74.375 6.97163 71.5649C7.10243 68.7528 7.00263 65.9196 7.00263 63.1032C7.00263 60.7265 6.16647 56.6204 7.56054 54.7036C9.00984 52.7108 7.44203 48.9311 7.59153 46.6139C7.90957 41.6842 9.58294 35.9774 13.2636 32.5421C14.9272 30.9895 13.4302 25.512 13.7286 23.2746C13.9042 21.9569 14.4656 20.5492 14.8134 19.2452C15.248 17.6156 18.3051 10.0707 20.3925 10.0707C22.2952 10.0707 22.6241 13.5286 22.6241 14.8129C22.6241 17.6407 24.5803 17.9452 27.0874 16.8896C29.3082 15.9545 28.3006 15.8862 28.8851 13.4181C29.4182 11.1675 29.9731 9.43866 32.4186 9.51276C34.4007 9.57283 35.8265 15.665 35.983 17.2305C36.3768 21.1687 43.4784 23.2838 46.4903 24.0185C54.182 25.8945 68.0566 25.8406 71.6583 34.5878C73.5819 39.2592 73.6013 46.5705 70.8835 50.7982C65.8443 58.6369 51.5163 54.7553 43.8868 56.9352C40.6821 57.8508 46.4451 61.902 47.1722 62.5143C48.3331 63.4919 51.72 63.5897 52.4724 62.2354C53.0778 61.1457 52.7219 55.6136 54.3011 59.1669C55.1936 61.175 54.983 63.372 54.983 65.5518C54.983 68.0837 51.7394 70.1953 49.4039 70.3251C47.0032 70.4585 51.0361 75.0761 51.6355 76.0282C53.5205 79.022 53.9807 83.7655 54.3941 87.2794C54.6123 89.1338 55.0907 90.1371 55.5409 92.0836C56.543 96.4164 55.5651 106.199 60.6861 107.271C62.1123 107.57 63.4592 108.225 64.9014 108.573C66.2107 108.889 71.5143 111.032 72.5882 110.154C74.2671 108.78 76.1836 102.56 76.1836 104.73C76.1836 106.558 76.1836 108.387 76.1836 110.216C76.1836 114.161 68.227 114.853 65.7073 114.958C59.383 115.222 53.1193 115.516 46.7693 115.516C39.9516 115.516 33.5736 113.628 26.9635 112.602C24.9928 112.297 23.2022 112.087 21.1984 112.168C18.1817 112.292 15.1781 112.898 12.1788 113.222C9.84558 113.475 15.3141 111.083 15.3713 111.053"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M91.2474 37.9662C91.2474 46.6246 90.3422 56.6842 94.161 64.746C95.0403 66.6025 96.4714 67.0576 98.3763 67.9075C101.181 69.1589 104.135 71.2307 107.117 71.9988C113.524 73.6491 120.241 76.0229 126.83 76.4621C129.264 76.6244 132.734 78.0556 134.764 79.3756C135.951 80.1468 139.414 81.9954 140.778 81.3593C143.08 80.2848 145.292 73.6935 146.481 71.4409C149.003 66.6622 149.365 62.0092 150.634 56.9352C151.581 53.148 152.618 49.2468 152.618 45.3121C152.618 40.8477 154.213 33.4036 151.781 29.3496C150.372 27.0014 146.942 27.0826 144.466 26.839C138.897 26.2912 133.661 25.1429 128.194 24.0494C121.924 22.7956 115.795 21.7868 109.38 21.7868C104.575 21.7868 99.7711 21.7868 94.9668 21.7868C92.5995 21.7868 92.8286 22.6218 92.3322 24.8553C91.4918 28.6375 90.1316 32.5062 90.1316 36.2925"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M151.502 27.9238C156.916 29.8288 162.829 31.8672 167.402 35.4246C168.531 36.3022 168.79 37.2388 169.603 38.4002C169.94 38.882 169.907 38.1493 170.223 38.0592C170.655 37.9358 171.785 38.8871 172.145 39.0821C176.358 41.3696 175.492 44.3704 175.492 48.6905C175.492 49.8555 176.375 56.5638 175.213 57.4931C173.642 58.7504 172.932 60.2138 170.905 60.9646C166.974 62.4203 163.487 65.0762 160.149 67.5355C157.288 69.6439 148.014 78.0426 144.807 75.9042"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M104.637 84.2729C105.477 82.1988 106.336 79.1003 107.737 77.299C108.537 76.2694 109.816 75.9899 110.216 74.7884"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M153.176 74.2305C158.049 77.8506 161.894 81.3689 164.334 87.0624"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M98.8398 37.6602L98.8691 38.3633C99.334 37.8164 99.9609 37.543 100.75 37.543C101.637 37.543 102.24 37.8828 102.561 38.5625C102.771 38.2578 103.045 38.0117 103.381 37.8242C103.721 37.6367 104.121 37.543 104.582 37.543C105.973 37.543 106.68 38.2793 106.703 39.752V44H105.619V39.8164C105.619 39.3633 105.516 39.0254 105.309 38.8027C105.102 38.5762 104.754 38.4629 104.266 38.4629C103.863 38.4629 103.529 38.584 103.264 38.8262C102.998 39.0645 102.844 39.3867 102.801 39.793V44H101.711V39.8457C101.711 38.9238 101.26 38.4629 100.357 38.4629C99.6465 38.4629 99.1602 38.7656 98.8984 39.3711V44H97.8145V37.6602H98.8398ZM108.057 40.7715C108.057 40.1504 108.178 39.5918 108.42 39.0957C108.666 38.5996 109.006 38.2168 109.439 37.9473C109.877 37.6777 110.375 37.543 110.934 37.543C111.797 37.543 112.494 37.8418 113.025 38.4395C113.561 39.0371 113.828 39.832 113.828 40.8242V40.9004C113.828 41.5176 113.709 42.0723 113.471 42.5645C113.236 43.0527 112.898 43.4336 112.457 43.707C112.02 43.9805 111.516 44.1172 110.945 44.1172C110.086 44.1172 109.389 43.8184 108.854 43.2207C108.322 42.623 108.057 41.832 108.057 40.8477V40.7715ZM109.146 40.9004C109.146 41.6035 109.309 42.168 109.633 42.5938C109.961 43.0195 110.398 43.2324 110.945 43.2324C111.496 43.2324 111.934 43.0176 112.258 42.5879C112.582 42.1543 112.744 41.5488 112.744 40.7715C112.744 40.0762 112.578 39.5137 112.246 39.084C111.918 38.6504 111.48 38.4336 110.934 38.4336C110.398 38.4336 109.967 38.6465 109.639 39.0723C109.311 39.498 109.146 40.1074 109.146 40.9004ZM117.186 42.5293L118.756 37.6602H119.863L117.59 44H116.764L114.467 37.6602H115.574L117.186 42.5293ZM122.084 44H121V37.6602H122.084V44ZM120.912 35.9785C120.912 35.8027 120.965 35.6543 121.07 35.5332C121.18 35.4121 121.34 35.3516 121.551 35.3516C121.762 35.3516 121.922 35.4121 122.031 35.5332C122.141 35.6543 122.195 35.8027 122.195 35.9785C122.195 36.1543 122.141 36.3008 122.031 36.418C121.922 36.5352 121.762 36.5938 121.551 36.5938C121.34 36.5938 121.18 36.5352 121.07 36.418C120.965 36.3008 120.912 36.1543 120.912 35.9785ZM126.455 44.1172C125.596 44.1172 124.896 43.8359 124.357 43.2734C123.818 42.707 123.549 41.9512 123.549 41.0059V40.8066C123.549 40.1777 123.668 39.6172 123.906 39.125C124.148 38.6289 124.484 38.2422 124.914 37.9648C125.348 37.6836 125.816 37.543 126.32 37.543C127.145 37.543 127.785 37.8145 128.242 38.3574C128.699 38.9004 128.928 39.6777 128.928 40.6895V41.1406H124.633C124.648 41.7656 124.83 42.2715 125.178 42.6582C125.529 43.041 125.975 43.2324 126.514 43.2324C126.896 43.2324 127.221 43.1543 127.486 42.998C127.752 42.8418 127.984 42.6348 128.184 42.377L128.846 42.8926C128.314 43.709 127.518 44.1172 126.455 44.1172ZM126.32 38.4336C125.883 38.4336 125.516 38.5938 125.219 38.9141C124.922 39.2305 124.738 39.6758 124.668 40.25H127.844V40.168C127.812 39.6172 127.664 39.1914 127.398 38.8906C127.133 38.5859 126.773 38.4336 126.32 38.4336ZM103.188 54.9004C103.188 55.8691 102.965 56.6484 102.52 57.2383C102.074 57.8242 101.477 58.1172 100.727 58.1172C99.9258 58.1172 99.3066 57.834 98.8691 57.2676L98.8164 58H97.8203V49H98.9043V52.3574C99.3418 51.8145 99.9453 51.543 100.715 51.543C101.484 51.543 102.088 51.834 102.525 52.416C102.967 52.998 103.188 53.7949 103.188 54.8066V54.9004ZM102.104 54.7773C102.104 54.0391 101.961 53.4688 101.676 53.0664C101.391 52.6641 100.98 52.4629 100.445 52.4629C99.7305 52.4629 99.2168 52.7949 98.9043 53.459V56.2012C99.2363 56.8652 99.7539 57.1973 100.457 57.1973C100.977 57.1973 101.381 56.9961 101.67 56.5938C101.959 56.1914 102.104 55.5859 102.104 54.7773ZM108.473 58C108.41 57.875 108.359 57.6523 108.32 57.332C107.816 57.8555 107.215 58.1172 106.516 58.1172C105.891 58.1172 105.377 57.9414 104.975 57.5898C104.576 57.2344 104.377 56.7852 104.377 56.2422C104.377 55.582 104.627 55.0703 105.127 54.707C105.631 54.3398 106.338 54.1562 107.248 54.1562H108.303V53.6582C108.303 53.2793 108.189 52.9785 107.963 52.7559C107.736 52.5293 107.402 52.416 106.961 52.416C106.574 52.416 106.25 52.5137 105.988 52.709C105.727 52.9043 105.596 53.1406 105.596 53.418H104.506C104.506 53.1016 104.617 52.7969 104.84 52.5039C105.066 52.207 105.371 51.9727 105.754 51.8008C106.141 51.6289 106.564 51.543 107.025 51.543C107.756 51.543 108.328 51.7266 108.742 52.0938C109.156 52.457 109.371 52.959 109.387 53.5996V56.5176C109.387 57.0996 109.461 57.5625 109.609 57.9062V58H108.473ZM106.674 57.1738C107.014 57.1738 107.336 57.0859 107.641 56.9102C107.945 56.7344 108.166 56.5059 108.303 56.2246V54.9238H107.453C106.125 54.9238 105.461 55.3125 105.461 56.0898C105.461 56.4297 105.574 56.6953 105.801 56.8867C106.027 57.0781 106.318 57.1738 106.674 57.1738ZM114.15 52.6328C113.986 52.6055 113.809 52.5918 113.617 52.5918C112.906 52.5918 112.424 52.8945 112.17 53.5V58H111.086V51.6602H112.141L112.158 52.3926C112.514 51.8262 113.018 51.543 113.67 51.543C113.881 51.543 114.041 51.5703 114.15 51.625V52.6328ZM118.832 58C118.77 57.875 118.719 57.6523 118.68 57.332C118.176 57.8555 117.574 58.1172 116.875 58.1172C116.25 58.1172 115.736 57.9414 115.334 57.5898C114.936 57.2344 114.736 56.7852 114.736 56.2422C114.736 55.582 114.986 55.0703 115.486 54.707C115.99 54.3398 116.697 54.1562 117.607 54.1562H118.662V53.6582C118.662 53.2793 118.549 52.9785 118.322 52.7559C118.096 52.5293 117.762 52.416 117.32 52.416C116.934 52.416 116.609 52.5137 116.348 52.709C116.086 52.9043 115.955 53.1406 115.955 53.418H114.865C114.865 53.1016 114.977 52.7969 115.199 52.5039C115.426 52.207 115.73 51.9727 116.113 51.8008C116.5 51.6289 116.924 51.543 117.385 51.543C118.115 51.543 118.688 51.7266 119.102 52.0938C119.516 52.457 119.73 52.959 119.746 53.5996V56.5176C119.746 57.0996 119.82 57.5625 119.969 57.9062V58H118.832ZM117.033 57.1738C117.373 57.1738 117.695 57.0859 118 56.9102C118.305 56.7344 118.525 56.5059 118.662 56.2246V54.9238H117.812C116.484 54.9238 115.82 55.3125 115.82 56.0898C115.82 56.4297 115.934 56.6953 116.16 56.8867C116.387 57.0781 116.678 57.1738 117.033 57.1738Z"
              fill="black"
            />
            <path
              d="M52.7515 68.0935C53.2506 66.0471 54.5321 63.3869 57.2148 64.2811C59.3425 64.9903 58.0891 67.5533 59.7564 65.5829C60.4327 64.7835 62.4163 62.5304 63.0418 64.0021C64.3962 67.1889 63.5577 66.8095 66.3273 64.684C67.0313 64.1437 67.6815 64.078 68.497 64.436C69.1794 64.7356 70.0467 66.7931 70.0467 66.0478C70.0467 64.872 71.6929 65.3039 72.5263 65.3039C74.2368 65.3039 73.9521 66.2562 73.9521 67.7835C73.9521 70.0984 79.2504 67.1772 79.5002 69.5502C79.6231 70.7178 77.3945 74.0532 77.4235 74.1065C77.823 74.8389 79.5508 74.5791 78.8493 75.9042C76.2278 80.856 74.8802 86.559 74.448 92.3936C74.2844 94.602 74.8221 101.679 71.5965 101.568C69.6301 101.5 67.7672 101.01 65.7694 101.01C62.7984 101.01 59.4638 100.83 56.6568 99.8944"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M110.216 1.1441C110.216 6.2641 112.621 10.5636 114.06 15.4948C114.57 17.2449 114.69 21.2794 117.345 20.547C125.147 18.3948 127.886 8.58068 133.091 3.37575"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Switch>
          <Route path="/signin">
            <SignIn
              setIsLogin={props.setIsLogin}
              setUserInfo={props.setUserInfo}
            />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
