import React, { useState, useEffect } from "react";
import { Page, Navbar, NavTitle, NavLeft, Link } from "framework7-react";
import { getGroups, logoutFirebase } from "../js/db";

const GroupsPage = () => {
  useEffect(() => {
    // console.log("aa");
  }, []);

  return (
    <Page name='groups' className='groups-page'>
      <Navbar>
        <NavLeft>
          <Link onClick={logoutFirebase}>Logout</Link>
        </NavLeft>
        <NavTitle>Groups</NavTitle>
      </Navbar>

    </Page>
  );
};

export default GroupsPage;
