import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ServiceBox from "./serviceBox";
import axios from "axios";
import Loading from "../loading";
import { Link } from "react-router-dom";

const UserLanding = () => {
  // const { user } = useSelector((state) => state.auth);

  const [user, setUser] = useState({});
  const token = localStorage.jwtToken;
  const URL = `${process.env.REACT_APP_BACKEND}/api/users/appointments/`;
  const userId = user.id;
  const [numAppointments, setNumAppointments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      await axios
        .get(URL + userId)
        .then((res) => {
          let returnedAppointments = res.data.appointments;
          let future = [];
          returnedAppointments.forEach((appointment) => {
            let endDate = new Date(appointment.endDate);
            const now = new Date().toLocaleString();
            appointment.endDate = endDate.toLocaleString();
            if (appointment.endDate > now) {
              future = [...future, appointment];
            }
          });
          setNumAppointments(future.length);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchAppointments();
  }, [user]);
  const services = [
    "Men's Haircut",
    "Women's Haircut",
    "Braids",
    "Color",
    "Facial",
    "Nails",
  ];
  const imageURLs = [
    "https://images.unsplash.com/photo-1603899968034-1a56ca48d172?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    "https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1270&q=80",
    "https://images.unsplash.com/photo-1599206676335-193c82b13c9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1251&q=80",
  ];
  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="text-center">
            <h1 className="display-1 mt-5">
              <b>Hello</b>, {user.firstName}
            </h1>
            <p>
              You have{" "}
              <Link to="/userProfile">{numAppointments} appointments</Link>
            </p>
          </div>
          <div className="card-group">
            {services.map((service, index) => (
              <ServiceBox
                key={index}
                imageURL={imageURLs[index]}
                service={service}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLanding;
