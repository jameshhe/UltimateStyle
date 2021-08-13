import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from 'react-router-dom'
import StylistCalendar from "./stylist/stylistCalendar";
import AddServices from "./stylist/addServices";
import AddAvailability from "./stylist/AddAvailability";
import UpcomingAppointments from "./stylist/upcomingAppointments";
const appointmentsOrAdd = ({stylist}, {services}, {appointments}) => {
    console.log("servicios, ", services);
    console.log("appuntomentos, ", appointments);
    if (appointments.length <= 0){
            return (
                <div>
            <AddAvailability/>
            </div>);
    }
    if (services.length <= 0) {
        return (<div>
            You need to add services that you offer before you are able to have customers book appointments with
        <AddServices />
        </div>
        );
       } 
}
const StylistLanding = () => {
    const {user} = useSelector(state => state.auth);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(`http://localhost:8000/api/stylists/${user.id}`)
                .then(res => {
                    const stylistData = res.data.stylist
                    console.log(stylistData)
                    setServices(stylistData.services)
                })
        }
        fetchStylist()
    }, [services]);

    useEffect(() => {
        const fetchAppointments = async () => {
            await axios.get(`http://localhost:8000/api/stylists/appointments/${user.id}`)
                .then(res => {
                    const appts = res.data.appointments;
                    setAppointments(appts)
                })
        }  
        fetchAppointments()
      }, [appointments]);
    return (
        <div className="container justify-content-center align-items-center h-100" style={{marginTop: "3%"}}>
            <div className="row">
<div className="justify-content-center container valign-wrapper">
<h1> Hello {`${user.firstName}  ${user.lastName}`} welcome to Ultimate Style!
            </h1>
                <div className="container">
                </div>
              {appointmentsOrAdd({stylist: user}, {services: services}, {appointments: appointments})}
            <div>
                <div>
                <UpcomingAppointments/>
                </div>          
    <div className="row">
        <div className="col center-align">
                <Link
                    to={`/stylists/stylistCalendar/stylistId=${user.id}`}
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        padding: "12px"
                    }}
                    className="btn btn-large btn-flat waves-effect blue black-text"
                >Calendar</Link>
                <Link
                    to="/"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        padding: "12px"
                    }}
                    className="btn btn-large btn-flat waves-effect blue black-text"
                >Back to home</Link>
            </div>
        </div>
    </div>
</div>
            </div>

        </div>
    );
};

export default StylistLanding;

