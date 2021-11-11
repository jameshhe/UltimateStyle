import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import BookingPopup from "./bookingPopup";

const ServicePopup = ({ show, onHide, appointments }) => {
  const [nextModalShow, setNextModalShow] = useState(
    Array(appointments.length).fill(false, 0)
  );

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title>Available Times</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <ul className="list-group">
            {appointments.map((appointment, index) => (
              <li key={index} className="list-group-item">
                <BookingPopup
                  show={nextModalShow[index]}
                  onHide={() => {
                    let newArray = [...nextModalShow];
                    newArray[index] = false;
                    setNextModalShow(newArray);
                  }}
                  appointment={appointment}
                />
                <button
                  onClick={() => {
                    let newArray = [...nextModalShow];
                    newArray[index] = true;
                    setNextModalShow(newArray);
                  }}
                  className="btn btn-info"
                >
                  {appointment.startDate}
                </button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ServicePopup;
