import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from "../loading"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";
import ReviewBox from "../profile/reviewBox";
import Rating from "../rating/rating"
const ServicesList = (props) => {
    const [services, setServices] = useState({});
    const stylistId = useParams();
    const URL = "http://localhost:8000/api";
    console.log("Services: ", services);
    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(`${URL}/stylists/${stylistId.id}`)
                .then(res => {
                    const stylistData = res.data.stylist
                    setServices(stylistData.services)
                })
        }
        fetchStylist()
    }, [services])
    if (services && services.length > 0){
    return (
        <div className='Services text-center' style={{marginTop: "3%"}}>
        <h5 className='card-title display-4'> Services </h5>
        <div className='card'>
            {services.map((service, i) => (
                <div className='m-3 border border-info rounded text-left' key={i}>
                    <div className='h3'>Service {i}</div>
                    <p className="font-weight-bold"> Service Name: {service.name}</p>
                    <p> Description: {service.description}</p>
                    <p> Cateogry: {service.category}</p>
                    <p> ${service.price}</p>

                </div>
            ))}
        </div>
    </div>
    );
            } else {
                return (
                    <div>
                        there are no services available currently. Please add one Below!
                    </div>
                )
            }
};

export default ServicesList;