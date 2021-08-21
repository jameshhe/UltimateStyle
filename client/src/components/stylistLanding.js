import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddAvailability from "./stylist/AddAvailability";
// const appointmentsOrAdd = ({ stylist }, { services }, { appointments }) => {
//   console.log("servicios, ", services);
//   console.log("appuntomentos, ", appointments);
//   if (appointments.length <= 0) {
//     return (
//       <div>
//         <AddAvailability />
//       </div>
//     );
//   }
//   if (services.length <= 0) {
//     return (
//       <div>
//         You need to add services that you offer before you are able to have
//         customers book appointments with
//         <AddServices />
//       </div>
//     );
//   }
// };
const StylistLanding = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchStylist = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND}/api/stylists/${user.id}`)
        .then((res) => {
          const stylistData = res.data.stylist;
          console.log(stylistData);
          setServices(stylistData.services);
        });
    };
    fetchStylist();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND}/api/stylists/appointments/${user.id}`
        )
        .then((res) => {
          const appts = res.data.appointments;
          setAppointments(appts);
        });
    };
    fetchAppointments();
  }, [appointments]);
  return (
    <div className="text-center row justify-content-center align-items-center h-100">
      <div className="col">
        <h1>
          Hello {`${user.firstName}  ${user.lastName}`}, Welcome to Ultimate
          Style!
        </h1>
        <div className="container"></div>
        <div>
          <div>
            <AddAvailability />
          </div>
          {/* <div className="row">
            <div className="col center-align">
              <Link
                to={`/stylists/stylistCalendar/stylistId=${user.id}`}
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  padding: "12px",
                }}
                className="btn btn-large btn-flat waves-effect blue black-text"
              >
                Calendar
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StylistLanding;
