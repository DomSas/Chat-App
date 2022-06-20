import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Messagebar,
  Messages,
  Message,
  f7,
  f7ready,
} from "framework7-react";
import { useSelector } from "react-redux";
import {
  getMessagesFromDatabase,
  listenToDatabaseChange,
  sendMessageToDatabase,
} from "../js/db";

const MessagesPage = () => {
  const groupsSelector = useSelector((state) => state.groups);
  const userSelector = useSelector((state) => state.user);
  const [messageText, setMessageText] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const messagebar = useRef(null);

  useEffect(() => {
    f7ready(() => {
      messagebar.current = f7.messagebar.get(".messagebar");
    });
  });

  useEffect(() => {
    listenToDatabaseChange();
  }, []);

  useEffect(async () => {
    setMessagesData(
      await getMessagesFromDatabase(groupsSelector.selectedGroup)
    );
  }, [groupsSelector]);

  const getTypeOfMessage = (senderID) => {
    return senderID === userSelector.uid ? "sent" : "received";
  };

  //   Framework7 functions for messages
  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      getTypeOfMessage(previousMessage.userID) !==
        getTypeOfMessage(message.userID) ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      getTypeOfMessage(nextMessage.userID) !==
        getTypeOfMessage(message.userID) ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      getTypeOfMessage(nextMessage.userID) !==
        getTypeOfMessage(message.userID) ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  const sendMessage = () => {
    const text = messageText.replace(/\n/g, "<br>").trim();
    const messagesToSend = [];
    if (text.length) {
      messagesToSend.push({
        text,
      });
    }
    if (messagesToSend.length === 0) {
      return;
    }

    sendMessageToDatabase({
      name: userSelector.name,
      image: userSelector.image,
      group: groupsSelector.selectedGroup,
      text: text,
      userID: userSelector.uid,
    });

    setMessageText("");

    if (text.length) messagebar.current.focus();
  };

  return (
    <Page name='login' className='messages-page'>
      <Navbar>
        <NavLeft>
          <Link back>Back</Link>
        </NavLeft>
        <NavTitle>{groupsSelector.selectedGroup}</NavTitle>
      </Navbar>

      <Messagebar
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
      >
        <Link
          iconIos='f7:arrow_up_circle_fill'
          iconAurora='f7:arrow_up_circle_fill'
          iconMd='material:send'
          slot='inner-end'
          onClick={sendMessage}
        />
      </Messagebar>

      <Messages>
        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={getTypeOfMessage(message.userID)}
            image={message.image}
            name={message.name}
            avatar={message.avatar}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
          >
            {message.text && (
              <span
                slot='text'
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            )}
          </Message>
        ))}
      </Messages>
    </Page>
  );
};

export default MessagesPage;
