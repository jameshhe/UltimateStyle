import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterPopup from "./register/registerPopup";
import logo from "../UltimateStyle.png";
import background from "../Background.jpg";

const Landing = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `${background}`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
      className="text-center row align-items-center h-100"
    >
      {/* <img
        className="mt-5 mx-auto"
        style={{ width: "350px", height: "225px" }}
        src={logo}
      /> */}
      <div className="col">
        <h1 className="display-1 mx-auto">
          Welcome to <b>Ultimate Style</b>
        </h1>
        <h5 className="display-5 mx-auto">
          Book and Review stylists made easy
        </h5>
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
            Get Started
          </Link>
          {/* <button
          onClick={() => setModalShow(true)}
          className="btn btn-light m-2"
        >
          Register
        </button> */}
          {/* <RegisterPopup show={modalShow} onHide={() => setModalShow(false)} /> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
