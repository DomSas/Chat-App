import React, { useState, useEffect } from "react";
import { Page, f7 } from "framework7-react";
import { loginFirestore } from "../js/db";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState();

  const login = () => {
    // console.log(process.env.REACT_APP_SECRET_NAME)

    loginFirestore();

    console.log(userName + " " + userGender);
    f7.views.current.router.navigate("/groups", {
      transition: "f7-dive",
      clearPreviousHistory: true,
    });
  };

  return (
    <Page name='login' className='login-page'>
      <div className='login-page__header-container'>
        <img
          className='login-page__logo'
          src='../static/LW_logo.png'
          alt='LW_logo'
        />
        <p className='login-page__introduction'>
          <b>Let&apos;s Write</b> helps you connect <br /> with likeminded peers
          around the globe!
        </p>
      </div>

      <div className='login-page__form-container'>
        <input
          className='login-page__username-input'
          type='text'
          name='username'
          placeholder='Username'
          value={userName || ""}
          onChange={(event) => setUserName(event.target.value)}
        />

        <div className='login-page__gender-container'>
          <div
            className={
              "login-page__male-button " +
              (userGender === "male" ? "is-active" : "")
            }
            onClick={() => setUserGender("male")}
          >
            <img
              className='login-page__male-icon'
              src='../static/male_icon.png'
              alt='male_icon'
            />
          </div>
          <div
            className={
              "login-page__female-button " +
              (userGender === "female" ? "is-active" : "")
            }
            onClick={() => setUserGender("female")}
          >
            <img
              className='login-page__female-icon'
              src='../static/female_icon.png'
              alt='female_icon'
            />
          </div>
        </div>

        <a className='login-page__button' href='/groups' onClick={login}>
          Login
        </a>

        <p className='login-page__app-info'>
          Created by Asial Corporation <br />
          App Version: 1.0.0
        </p>
      </div>
    </Page>
  );
};
export default LoginPage;
