import ChangePassword from "./components/changePassword";
import UserLanding from "./components/landing/userLanding";
import EditProfile from "./components/profile/editProfile";
import ReviewForm from "./components/profile/reviewForm";
import StylistProfile from "./components/profile/stylistProfile";
import UserProfile from "./components/profile/userProfile";
import SendPassword from "./components/sendPassword";
import PastAppointments from "./components/stylist/pastApointments";
import ServicesOffered from "./components/stylist/servicesOffered";
import StylistCalendar from "./components/stylist/stylistCalendar";
import UpcomingApppointments from "./components/stylist/upcomingAppointments";
import StylistLanding from "./components/stylistLanding";
import AddAvailability from "./components/stylist/AddAvailability";
export const PRIVATE_ROUTES = [
  { path: "/editProfile", component: EditProfile },
  { path: "/userProfile", component: UserProfile },
  { path: "/userLanding", component: UserLanding },
  { path: "/changePassword/:id", component: ChangePassword },
  { path: "/stylist/stylistId=:id", component: StylistProfile },
  { path: "/resetPassword", component: SendPassword },
  { path: "/stylists/stylistLanding/stylistId=:id", component: StylistLanding },
  {
    path: "/services/servicesOffered/stylistId=:id",
    component: ServicesOffered,
  },
  {
    path: "/stylists/stylistCalendar/stylistId=:id",
    component: StylistCalendar,
  },
  {
    path: "/stylists/appointments/upcoming/stylistId=:id",
    component: UpcomingApppointments,
  },
  {
    path: "/stylists/appointments/past/stylistId=:id",
    component: PastAppointments,
  },
  {
    path: "/stylists/addAvailability/stylistId=:id",
    component: AddAvailability,
  },
  { path: "/addReview/stylistId=:id", component: ReviewForm },
];
