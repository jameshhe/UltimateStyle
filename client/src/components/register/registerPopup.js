import React from 'react';
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";

// The popup when user clicks on "register" on the landing page
const RegisterPopup = props => {
    return (
        <div>
            <Modal
                {...props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Register for Ultimate Style
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-auto">
                    <Link to="/user/register" className="btn btn-primary btn-lg mt-4 mb-4">Register as a Client</Link>
                    <h5 className="mx-auto text-center">Or</h5>
                    <Link to="/stylist/register" className="btn btn-primary btn-lg mt-4 mb-4">Register as a Stylist</Link>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default RegisterPopup;
