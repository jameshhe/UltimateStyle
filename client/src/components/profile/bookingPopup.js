import React from 'react';
import {Modal} from "react-bootstrap";
import axios from 'axios'
import {useHistory} from "react-router";
import {useSelector} from "react-redux";

const BookingPopup = ({show, onHide, appointment}) => {

    const history = useHistory()
    const bookURL = 'http://localhost:8000/api/users/appointments/book/'
    const store = useSelector(state => state.auth)
    const userId = store.user.id

    const onBookAppointment = async () => {
        await axios.put(bookURL+appointment._id, {userId: userId})
            .then(res => {
                console.log(res)
                alert('Appointment booked successfully!')
                history.push('/userLanding')
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Finalize Booking
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-auto">
                    <p>Stylist {appointment.stylistName}</p>
                    <p>{appointment.startDate} to {appointment.endDate}</p>
                    <button className="btn btn-warning" onClick={onBookAppointment}>Book Appointment!</button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BookingPopup;
