import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ServiceBox from "./serviceBox";
import axios from 'axios'
import Loading from "../loading";
import {Link} from 'react-router-dom'
import base_url from '../../base_url'


const UserLanding = () => {
    const {user} = useSelector(state => state.auth)
    const URL = `http://${base_url}:8000/api/users/appointments/`
    const userId = user.id
    const [numAppointments, setNumAppointments] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAppointments = async () => {
            await axios.get(URL + userId)
                .then(res => {
                    let returnedAppointments = res.data.appointments
                    let future =[]
                    returnedAppointments.forEach(appointment => {
                        let endDate = new Date(appointment.endDate)
                        const now = new Date().toLocaleString()
                        appointment.endDate = endDate.toLocaleString()
                        if (appointment.endDate > now) {
                            future = [...future, appointment]
                        }
                    })
                    setNumAppointments(future.length)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        }
        fetchAppointments()
    }, [])
    const services = ['Men\'s Haircut', 'Women\'s Haircut', 'Braids', 'Color', 'Facial', 'Nails']
    const imageURLs = [
        'https://images.unsplash.com/photo-1519019121902-896ed7312a9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        'https://images.pexels.com/photos/3993443/pexels-photo-3993443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1270&q=80',
        'https://images.unsplash.com/photo-1599206676335-193c82b13c9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1251&q=80'
    ]
    return (
        <div className="h-100 w-100 align-items-center m-0">
            {isLoading ? <Loading /> :
                <div className="justify-content-center align-items-center h-100">
                    <div className="row">
                        <div className="col-6 mx-auto  align-self-center text-center">
                            <h1 className="display-1"><b>Hello</b>, {user.firstName}</h1>
                            <p>You have <Link to="/userProfile">{numAppointments} appointments</Link></p>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-start h-100">
                        <div className="card-deck col-10">
                            {services.map((service, index) => <ServiceBox
                                key={index}
                                imageURL={imageURLs[index]}
                                service={service}
                            />)}
                        </div>


                    </div>

                </div>
            }
        </div>


    );
};

export default UserLanding;
