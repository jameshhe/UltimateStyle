import React from 'react';
import Rating from "./rating";

const RatingFilter = ({queries}) => {
    const ratings = [5,4,3,2,1]
    const searchURL = "/stylists/search"

    return (
        <div>
            <ul style={{listStyleType: "none"}}>
                {ratings.map((rating, index) => (
                    <li key={index}>
                        {
                            (<a href={`${searchURL}/name=${queries['name']}&service=${queries['service']}&min=${rating}`}>
                                <Rating rating={rating} /> & Up
                            </a>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RatingFilter;
