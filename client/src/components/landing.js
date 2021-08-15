import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterPopup from "./register/registerPopup";
import logo from "../UltimateStyle.png";

const Landing = () => {
  const [modalShow, setModalShow] = useState(false);
  const img_url =
    "https://images.unsplash.com/photo-1595284843477-f609b0f91e3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80";
  return (
    <div
      style={{
        backgroundImage: `url(${img_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="h-100 text-center justify-content-center align-items-center"
    >
      <img
        className="mt-5 mx-auto"
        style={{ width: "350px", height: "225px" }}
        src={logo}
      />
      {/* <h1 className="mx-auto text-white">
        <b>Welcome</b> to Ultimate Style
      </h1>
      <h5 className="mx-auto text-white">
        <b>BOOK</b> AND <b>REVIEW</b> STYLISTS MADE EASY
      </h5> */}
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

        <Link to="/login" className="btn btn-light m-2">
          Log In
        </Link>
        <button
          onClick={() => setModalShow(true)}
          className="btn btn-light m-2"
        >
          Register
        </button>
        <RegisterPopup show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default Landing;
