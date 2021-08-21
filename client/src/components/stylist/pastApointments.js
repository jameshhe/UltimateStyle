import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { useInput } from "../hooks/InputHook";
import AppointmentsCard from "./appointmentsCard";

const PastAppointments = () => {
  const [appointments2, setAppointments] = useState([]);
  const stylistId = useParams();
  const currentDate = new Date().toISOString();
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput("");
  const { value: price, bind: bindPrice, reset: resetPrice } = useInput("");
  const {
    value: category,
    bind: bindCateogry,
    reset: resetCategory,
  } = useInput("");
  useEffect(() => {
    const fetchAppointments = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND}/api/stylists/appointments/${stylistId.id}`
        )
        .then((res) => {
          const appts = res.data.appointments.filter((event) => {
            return Date.parse(event.startDate) <= Date.parse(currentDate);
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
          <div
            className="Services text-center border border-primary"
            style={{ marginTop: "3%" }}
          >
            <h5 className="card-title display-4"> Past Apppointments </h5>
            <AppointmentsCard
              appointments={appointments2}
              currentDate={currentDate}
            />
          </div>
        ) : (
          <h2>
            You don't have any previous appointments. Once you do, they will
            show up here
          </h2>
        )}
      </div>
    </div>
  );
};
export default PastAppointments;
