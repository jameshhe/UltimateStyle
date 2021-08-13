import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import axios from 'axios'
import BookingPopup from "./bookingPopup";

const ServicePopup = ({show, onHide, appointments}) => {
    const [nextModalShow, setNextModalShow] = useState(false);

    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Available Times
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-auto">
                    <ul className="list-group">
                        {appointments.map((appointment, index) =>
                            <li key={index} className="list-group-item">
                                <BookingPopup
                                    show={nextModalShow}
                                    onHide={() => setNextModalShow(false)}
                                    appointment={appointment}
                                />
                                <button onClick={() => setNextModalShow(true)} className="btn btn-info">
                                    {
                                        appointment.startDate
                                    }
                                </button>

                            </li>
                        )}
                    </ul>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ServicePopup;
