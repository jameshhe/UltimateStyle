import React from "react";
import { Link } from "react-router-dom";

const ServiceBox = ({ imageURL, service }) => {
  const searchURL = "/api/stylists/search/services";
  return (
    <div className="col">
      <div className="card border-dark mx-2 h-100">
        <Link
          to={`${searchURL}/${service}`}
          className="text-black"
          style={{ textDecoration: "none" }}
        >
          <div className="card-header border-dark">{service}</div>
          <img
            className="card-img-top"
            src={imageURL}
            alt="Card image cap"
            height="150"
          />
        </Link>
      </div>
    </div>
  );
};

export default ServiceBox;
