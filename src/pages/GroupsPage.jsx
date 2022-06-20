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
import { useDispatch, useSelector } from "react-redux";
import { addGroups } from "../state/slices/groupsSlice";

const GroupsPage = () => {
  const [chatGroups, setChatGroups] = useState([]);
  const dispatch = useDispatch();
  const groupsSelector = useSelector((state) => state.groups);
  const userSelector = useSelector((state) => state.user);

  useEffect(() => {
    setChatGroups(groupsSelector);
  }, [groupsSelector]);

  const openMessagesPage = (groupName) => {
    dispatch(
      addGroups({
        selectedGroup: groupName,
      })
    );
  };

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
              src={userSelector.image}
              alt='user_img'
            />
          </Link>
        </NavRight>
      </Navbar>

      {chatGroups.allGroups
        ? Object.entries(chatGroups.allGroups).map(
            ([category, name], index) => (
              <BlockTitle
                key={index}
                className='groups-page__group-list-container'
              >
                <p className='groups-page__group-list-title'>{category}</p>
                <List mediaList inset className='groups-page__group-list'>
                  {name.map((item) => (
                    <ListItem
                      key={item.name}
                      link='/messages'
                      title={item.name}
                      subtitle={item.description}
                      onClick={() => openMessagesPage(item.name)}
                    >
                      <img slot='media' src={item.image} width='44' />
                    </ListItem>
                  ))}
                </List>
              </BlockTitle>
            )
          )
        : ""}

      <Popover className='groups-page__popover-menu'>
        <div className='groups-page__user-profile-container'>
          <img
            className='groups-page__user-profile-image'
            src={userSelector.image}
            alt='user_img'
          />
          <h2 className='groups-page__user-profile-name'>{userSelector.name}</h2>
        </div>
      </Popover>
    </Page>
  );
};

export default GroupsPage;
