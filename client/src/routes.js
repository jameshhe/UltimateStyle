import Landing from "./components/landing";
import Login from "./components/login/login";
import RegisterStylist from "./components/register/registerStylist";
import RegisterUser from "./components/register/registerUser";
import StylistsList from "./components/search/stylistsList";
import SendPassword from "./components/sendPassword";
import StylistInfo from "./components/stylist/StylistInfo";
export const ROUTES = [
  { path: "/", component: Landing },
  { path: "/home", component: Landing },
  { path: "/login", component: Login },
  { path: "/user/register", component: RegisterUser },
  { path: "/stylist/register", component: RegisterStylist },
  { path: "/resetPassword", component: SendPassword },
  { path: "/stylists/search/:types/:queries", component: StylistsList },
  { path: "/stylists/stylistId=:id/info", component: StylistInfo },
];
