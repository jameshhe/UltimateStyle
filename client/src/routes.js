import UserLanding from "./components/landing/userLanding";
import StylistsList from "./components/search/stylistsList";
import ChangePassword from "./components/changePassword";
import StylistProfile from "./components/profile/stylistProfile";
import EditProfile from "./components/profile/editProfile";
import SendPassword from "./components/sendPassword";
import StylistLanding from "./components/stylistLanding";
import ServicesOffered from "./components/stylist/servicesOffered";
 import StylistCalendar from "./components/stylist/stylistCalendar";
import UserProfile from "./components/profile/userProfile";
import UpcomingApppointments from "./components/stylist/upcomingAppointments";
import PastAppointments from "./components/stylist/pastApointments";
import StylistInfo from "./components/stylist/StylistInfo";
import {ReviewForm} from "./components/profile/reviewForm";
export const ROUTES = [
    {path: "/editProfile", component: EditProfile},
    {path: "/userProfile", component: UserProfile},
    {path: "/userLanding", component: UserLanding},
    {path: "/stylists/search/:types/:queries", component: StylistsList},
    {path: "/changePassword/:id", component: ChangePassword},
    {path: "/stylist/stylistId=:id", component: StylistProfile},
    {path: "/resetPassword", component: SendPassword},
    {path: "/stylists/stylistLanding/stylistId=:id", component: StylistLanding},
    {path: "/services/servicesOffered/stylistId=:id", component: ServicesOffered},
    {path: "/stylists/stylistCalendar/stylistId=:id", component: StylistCalendar},
    {path: "/stylists/appointments/upcoming/stylistId=:id", component: UpcomingApppointments},
    {path: "/stylists/appointments/past/stylistId=:id", component: PastAppointments},
    {path: "/stylists/stylistId=:id/info", component: StylistInfo},
    {path: "/addReviews/stylistId=:id", component: ReviewForm}


]