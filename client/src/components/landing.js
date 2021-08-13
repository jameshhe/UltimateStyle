import React, {useState} from "react";
import {Link} from "react-router-dom";
import RegisterPopup from "./register/registerPopup";
import {Button, Form, FormControl, Navbar} from "react-bootstrap";

const Landing = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="h-100 text-center justify-content-center align-items-center landing">
            <div className="">
                <img className="mx-auto" style={{ width: "350px", height: "225px"}} src={require("../UltimateStyle.png" )}/>
                {/*<h1 className="mx-auto">*/}
                {/*    <b>Welcome</b> to Ultimate Style*/}
                {/*</h1>*/}
                <h1 className="mx-auto display-2 text-white">
                    <b>REVIEW</b> AND <b>BOOK</b> STYLISTS MADE EASY
                </h1>
                <div className="mx-auto d-flex justify-content-center mt-lg-5">

                    {/*<Link*/}
                    {/*    to="/register"*/}
                    {/*    style={{*/}
                    {/*        width: "140px",*/}
                    {/*        borderRadius: "3px",*/}
                    {/*        letterSpacing: "1.5px",*/}
                    {/*        */}
                    {/*    }}*/}
                    {/*    className="btn btn-large btn-flat waves-effect blue black-text m-2"*/}
                    {/*>Register</Link>*/}

                    <Link
                        to="/login"
                        className="btn btn-light m-2"
                    >Log In</Link>
                    <button onClick={() => setModalShow(true)} className="btn btn-light m-2">
                        Register
                    </button>
                    <RegisterPopup
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </div>
    );


}

export default Landing;
