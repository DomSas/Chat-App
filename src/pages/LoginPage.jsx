import React, { useState } from "react";
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
  const [inputs, setInputs] = useState();

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
    </Page>
  );
};
export default LoginPage;
