import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavLeft,
  Link,
  BlockTitle,
  List,
  ListItem,
  NavRight,
  Popover,
} from "framework7-react";
import { logoutFirebase } from "../js/db";
import { useSelector } from "react-redux";

const GroupsPage = () => {
  const [chatGroups, setChatGroups] = useState([]);
  const groupsSelector = useSelector((state) => state.groups);
  const userNameSelector = useSelector((state) => state.user.name);
  const userImageSelector = useSelector((state) => state.user.image);

  useEffect(() => {
    setChatGroups(groupsSelector);
  });

  return (
    <Page name='groups' className='groups-page'>
      <Navbar>
        <NavLeft>
          <Link onClick={logoutFirebase}>Logout</Link>
        </NavLeft>
        <NavTitle>Groups</NavTitle>
        <NavRight>
          <Link popoverOpen='.groups-page__popover-menu'>
            <img
              className='groups-page__user-image'
              src={userImageSelector}
              alt='user_img'
            />
          </Link>
        </NavRight>
      </Navbar>

      {Object.entries(chatGroups).map(([category, name], index) => (
        <BlockTitle key={index} className='groups-page__group-list-container'>
          <p className='groups-page__group-list-title'>{category}</p>
          <List mediaList inset className='groups-page__group-list'>
            {name.map((item) => (
              <ListItem
                key={item.name}
                link='#'
                title={item.name}
                subtitle={item.description}
              >
                <img slot='media' src={item.image} width='44' />
              </ListItem>
            ))}
          </List>
        </BlockTitle>
      ))}

      <Popover className='groups-page__popover-menu'>
        <div className='groups-page__user-profile-container'>
          <img
            className='groups-page__user-profile-image'
            src={userImageSelector}
            alt='user_img'
          />
          <h2 className='groups-page__user-profile-name'>{userNameSelector}</h2>
        </div>
      </Popover>
    </Page>
  );
};

export default GroupsPage;
