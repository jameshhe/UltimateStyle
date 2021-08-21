import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import AppointmentsCard from "./appointmentsCard";
const UpcomingApppointments = () => {
  const [appointments2, setAppointments] = useState([]);
  const stylistId = useParams();
  const currentDate = new Date();
  useEffect(() => {
    const fetchAppointments = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND}/api/stylists/appointments/${stylistId.id}`
        )
        .then((res) => {
          const appts = res.data.appointments.filter((event) => {
            return Date.parse(event.startDate) >= Date.parse(currentDate);
          });
          setAppointments(appts.filter((appt) => appt.pending === false));
        });
    };

    fetchAppointments();
  }, [appointments2]);

  return (
    <div className="text-center row align-items-center justify-content-center">
      <div className="col">
        {appointments2.length > 0 ? (
          <div className="Services text-center border border-primary">
            <h5 className="card-title display-4"> Upcoming Apppointments </h5>
            <AppointmentsCard
              appointments={appointments2}
              currentDate={currentDate}
            />
          </div>
        ) : (
          <h2>You don't have any upcoming appointments.</h2>
        )}
      </div>
    </div>
  );
};
export default UpcomingApppointments;
