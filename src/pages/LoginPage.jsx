import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Link,
  Toolbar,
  Block,
} from "framework7-react";

const LoginPage = () => {
  const [userName, setUserName] = useState({});
  const [userGender, setUserGender] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserName((values) => ({ ...values, [name]: value }));
    console.log(userName);
  };

  const toggleGender = (gender) => {
    setUserGender(gender);
    console.log(userGender);
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
          value={userName.username || ""}
          onChange={handleChange}
        />

        <div className='login-page__gender-container'>
          <div
            className={
              "login-page__male-button " +
              (userGender === "male" ? "is-active" : "")
            }
            onClick={() => toggleGender("male")}
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
            onClick={() => toggleGender("female")}
          >
            <img
              className='login-page__female-icon'
              src='../static/female_icon.png'
              alt='female_icon'
            />
          </div>
        </div>

        <button className='login-page__button'>Login</button>

        <p className='login-page__app-info'>
          Created by Asial Corporation <br />
          App Version: 1.0.0
        </p>
      </div>
    </Page>
  );
};
export default LoginPage;
