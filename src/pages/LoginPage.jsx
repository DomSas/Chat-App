import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../state/slices/userSlice";
import { addGroups } from "../state/slices/groupsSlice";
import { Page } from "framework7-react";
import { loginFirebase } from "../js/db";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState();
  const dispatch = useDispatch();
  const userNameSelector = useSelector((state) => state.user.name);
  const userGenderSelector = useSelector((state) => state.user.gender);

  useEffect(() => {
    setUserName(userNameSelector);
    setUserGender(userGenderSelector);
  }, [userNameSelector]);

  const loginButtonClick = () => {
    // console.log(process.env.REACT_APP_SECRET_NAME)
    const imageURL = `https://randomuser.me/api/portraits/${userGender}/${Math.floor(
      Math.random() * 100
    )}.jpg`;

    loginFirebase();
    dispatch(
      login({
        name: userName,
        gender: userGender,
        image: imageURL,
      })
    );
  };

  return (
    <Page name='login' className='login-page'>
      <div className='login-page__header-container'>
        <img
          className='login-page__logo'
          src='../static/LW_logo.png'
          alt='LW_logo'
        />
        {userNameSelector === "" ? (
          <p className='login-page__introduction'>
            <b>Let&apos;s Write</b> helps you connect <br /> with likeminded
            peers around the globe!
          </p>
        ) : (
          <p className='login-page__introduction'>
            Welcome back <b>{userNameSelector}</b>!<br />
            Click Enter to get in.
          </p>
        )}
      </div>

      <div className='login-page__form-container'>
        <input
          className='login-page__username-input'
          type='text'
          name='username'
          placeholder='Username'
          value={userName || userNameSelector || ""}
          onChange={(event) => setUserName(event.target.value)}
        />

        <div className='login-page__gender-container'>
          <div
            className={
              "login-page__male-button " +
              (userGender === "men" ? "is-active" : "")
            }
            onClick={() => setUserGender("men")}
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
              (userGender === "women" ? "is-active" : "")
            }
            onClick={() => setUserGender("women")}
          >
            <img
              className='login-page__female-icon'
              src='../static/female_icon.png'
              alt='female_icon'
            />
          </div>
        </div>
        {!userName || !userGender ? (
          <a
            className='login-page__button login-page__button--disabled'
          >
            Login
          </a>
        ) : userNameSelector === "" ? (
          <a
            className='login-page__button'
            href='/groups'
            onClick={loginButtonClick}
          >
            Login
          </a>
        ) : (
          <a className='login-page__button' href='/groups'>
            Enter
          </a>
        )}

        <p className='login-page__app-info'>
          Created by Asial Corporation <br />
          App Version: 1.0.0
        </p>
      </div>
    </Page>
  );
};
export default LoginPage;
