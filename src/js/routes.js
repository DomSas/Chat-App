import GroupsPage from "../pages/GroupsPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

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
];

export default routes;
