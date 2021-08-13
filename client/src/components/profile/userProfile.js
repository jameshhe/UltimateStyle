import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CustomPlaceholder } from 'react-placeholder-image';
import ReviewBox from './reviewBox';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppointmentsList from './appointmentsList';
import base_url from '../../base_url';

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.jwtToken;

    const [user, setUser] = useState({});

    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const store = useSelector(state => state.auth);
    const userId = store.user.id;

    const URL = `http://${base_url}:8000/api/users/appointments/`;

    useEffect(() => {
        const fetchUser = async () => {
            await axios
                .get(`http://${base_url}:8000/api/users/me`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then(res => {
                    setUser(res.data.user);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            await axios
                .get(URL + userId)
                .then(res => {
                    let returnedAppointments = res.data.appointments;
                    let past = [];
                    let future = [];
                    returnedAppointments.forEach(appointment => {
                        let startDate = new Date(appointment.startDate);
                        let endDate = new Date(appointment.endDate);
                        const now = new Date().toLocaleString();
                        appointment.startDate = startDate.toLocaleString();
                        appointment.endDate = endDate.toLocaleString();
                        if (appointment.endDate < now) {
                            past = [...past, appointment];
                        } else {
                            future = [...future, appointment];
                        }
                    });
                    setPastAppointments(past);
                    setFutureAppointments(future);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        };
        fetchAppointments();
    }, []);

    return (
        <div className='h-100'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='container'>
                    <div className='card card-signin flex-row my-5'>
                        <div className='card-body'>
                            <div className='row mb-4'>
                                <div className='col-10'>
                                    <h2 className='text-center display-4 mb-4'>{`${user.firstName} ${user.lastName}`}</h2>
                                    <h5>Contact Information</h5>
                                    <ul className='list-group list-group-flush'>
                                        <li className='list-group-item'>
                                            Phone Number:{' '}
                                            {user.number === ''
                                                ? 'None'
                                                : user.number}
                                        </li>
                                        <li className='list-group-item'>
                                            Email:{' '}
                                            {user.email === ''
                                                ? 'None'
                                                : user.email}
                                        </li>
                                        <li className='list-group-item'>
                                            Address:{' '}
                                            {user.address === ''
                                                ? 'None'
                                                : user.address}
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-2 justify-content-end'>
                                    <Link
                                        to='/editProfile'
                                        className='btn btn-info'
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>

                            <Tabs>
                                <TabList>
                                    <Tab>Upcoming Appointments</Tab>
                                    <Tab>Past Appointments</Tab>
                                </TabList>

                                <TabPanel>
                                    <AppointmentsList
                                        appointments={futureAppointments}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <AppointmentsList
                                        appointments={pastAppointments}
                                    />
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
