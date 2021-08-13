import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";

const StylistInfo = () => {
    const [stylist, setStylist] = useState({});
    const stylistId = useParams()

    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(`http://localhost:8000/api/stylists/${stylistId.id}`)
                .then(res => {
                    const stylistData = res.data.stylist
                    console.log(stylistData)
                    setStylist(stylistData)
                })
        }
        fetchStylist()
    }, [stylist]);

    return (
    <div className="h-100">
            {
                    <div className="container">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-body">
                                <div className="row mb-4">
                                    <div className="col-3 mt-4">
                                        {
                                            stylist.photo === 'no-photo.jpg' ?
                                                <CustomPlaceholder
                                                    width="200"
                                                    height="200"
                                                    backgroundColor="#123456"
                                                    textColor="#ffffff"
                                                    text={`Stylist ${stylist.firstName}`}
                                                /> :
                                                <img src={stylist.photo} className="w-100 h-100" alt="Stylist"/>
                                        }
                                    </div>
                                    <div className="col-9">
                                        <h2 className="text-center display-4 mb-4">{`${stylist.firstName} ${stylist.lastName}`}</h2>
                                        <h5>Contact Information</h5>
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Phone Number: {stylist.number === '' ? 'None' : stylist.number}</li>
                                            <li className="list-group-item">Email: {stylist.email === '' ? 'None' : stylist.email}</li>
                                            <li className="list-group-item">Address: {stylist.address === '' ? 'None' : stylist.address}</li>
                                        </ul>
                                    </div>

                                </div>
                                </div>
                                </div>
                                </div>
                                
            }
</div>
    );
};

export default StylistInfo;