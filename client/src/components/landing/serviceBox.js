import React from "react";
import { Link } from "react-router-dom";

const ServiceBox = ({ imageURL, service }) => {
  const searchURL = "/api/stylists/search/services";
  return (
    <div className="col">
      <div className="card w-50 h-100">
        <Link to={`${searchURL}/${service}`}>
          <img
            className="card-img-top"
            src={imageURL}
            alt="Card image cap"
            height="150"
          />
          <div className="card-body">
            <h5 className="card-title text-center border-dark">{service}</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServiceBox;
