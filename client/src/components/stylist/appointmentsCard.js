import React, {useEffect, useState} from 'react';



const AppointmentsCard = (props) => {


return (<>
<div>
            <ul className="list-group">
                {props.appointments.map((appointment, index) =>
                    <li key={index} className="list-group-item m-2">
                        <h2>{appointment.title}</h2>
                        <p>Your appointment is with {appointment.userName} </p>
                <p>From {new Date(Date.parse(appointment.startDate)).toLocaleDateString()} at {new Date(Date.parse(appointment.startDate)).toLocaleTimeString()} to {new Date(Date.parse(appointment.endDate)).toLocaleDateString()} at {new Date(Date.parse(appointment.endDate)).toLocaleTimeString()}</p>
                        <p>Location: {appointment.location}</p>
                    </li>
                )}
            </ul>
        </div>
</>
)

}

export default AppointmentsCard;