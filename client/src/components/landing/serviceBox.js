import React from 'react';
import {Link} from "react-router-dom";

const ServiceBox = ({imageURL, service}) => {
    const searchURL = '/api/stylists/search/services'
    return (

        <div className="card m-3">
            <Link to={`${searchURL}/${service}`}>
                <img className="card-img-top" src={imageURL} alt="Card image cap"/>
                <div className="card-body">
                    <p className="card-text text-center border-dark">{service}</p>
                </div>
            </Link>

        </div>
    );
};

export default ServiceBox;
