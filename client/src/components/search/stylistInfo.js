import React from 'react';
import Rating from "../rating/rating";
import {CustomPlaceholder} from "react-placeholder-image";
import {Link} from "react-router-dom";

// Information span for each stylist
const StylistInfo = ({stylist}) => {

    return (
        <div className="container-fluid my-2">
            <Link to={`/stylist/stylistId=${stylist._id}`} style={{textDecoration: 'none'}}>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        {
                            stylist.photo === 'no-photo.jpg' ?
                                <CustomPlaceholder
                                    width="200"
                                    height="200"
                                    backgroundColor="#123456"
                                    textColor="#ffffff"
                                    text={`Stylist ${stylist.firstName}`}
                                /> :
                                <img src={stylist.photo} className="stylistImage" alt="Stylist"/>
                        }

                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-8">
                                <h4>{stylist.firstName} {stylist.lastName}</h4>
                                <p className="text-muted">{stylist.businessName}</p>
                            </div>
                            <div className="col-4">
                                <Rating rating={stylist.average}/>
                                <p className="text-muted d-inline ml-1">({stylist.reviews.length})</p>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-warning align-self-end">Book an appointment</button>
                        </div>
                    </div>


                </div>
                <hr/>
            </Link>

        </div>
    );
};

export default StylistInfo;
