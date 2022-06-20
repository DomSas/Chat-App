import GroupsPage from "../pages/GroupsPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import MessagesPage from "../pages/MessagesPage.jsx";

var routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/groups",
    component: GroupsPage,
    options: {
      clearPreviousHistory: true,
    },
  },
  {
    path: "/messages",
    component: MessagesPage,
  },
];

export default routes;
