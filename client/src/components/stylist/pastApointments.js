import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from "../loading"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";
import ReviewBox from "../profile/reviewBox";
import Rating from "../rating/rating";
import { useInput } from '../hooks/InputHook';
import {addService} from "../../actions/stylistActions";
import AppointmentsCard from "./appointmentsCard";

const PastAppointments = () => {
    const [appointments2, setAppointments] = useState([]);
    const stylistId = useParams();
  const currentDate = new Date().toISOString();
  const { value:name, bind:bindName, reset:resetName } = useInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useInput('');
  const { value:price, bind: bindPrice, reset: resetPrice } = useInput('');
  const { value:category, bind: bindCateogry, reset: resetCategory} = useInput('');
  useEffect(() => {
    const fetchAppointments = async () => {
        await axios.get(`http://localhost:8000/api/stylists/appointments/${stylistId.id}`)
            .then(res => {
                const appts = res.data.appointments.filter(event => { return Date.parse(event.startDate) <= Date.parse(currentDate)});
                setAppointments(appts.filter(appt => appt.pending === false))
            })
    }
    
    fetchAppointments()
  }, [appointments2])
if (appointments2 && appointments2.length > 0){
    return (
        <div className='Services text-center border border-primary' style={{marginTop: "3%"}}>

        <h5 className='card-title display-4'> Past Apppointments </h5>
        <AppointmentsCard appointments={appointments2} currentDate={currentDate}/>
    </div>
    );
            } else {
                return (
                    <div style={{marginTop: "3%"}}>
                        You have no previous appointments. Once you do, they will be shown here
                    </div>
                )
            }
}
export default PastAppointments;