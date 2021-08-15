import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../UltimateStyle.png";

import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { logoutUser } from "../actions/authActions";
const URL = `${process.env.REACT_APP_BACKEND}`;

const Navigation = () => {
  const [name, setName] = useState("");
  const searchURL = "/stylists/search/";
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="border-bottom"
      fixed="top"
    >
      <Navbar.Brand href="/userLanding">
        {" "}
        <img
          src={logo}
          width="64"
          height="32"
          className="d-inline-block align-top"
          alt="Ultimate Style"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Services" id="basic-nav-dropdown">
            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
            <NavDropdown.Item href={searchURL + "services/haircuts"}>
              Haircuts
            </NavDropdown.Item>
            <NavDropdown.Item href={searchURL + "services/waxing"}>
              Waxing
            </NavDropdown.Item>
          </NavDropdown>
          {user.user.role === "stylist" ? (
            <div>
              <Nav.Link
                href={`/stylists/appointments/upcoming/stylistId=${user.user.id}`}
              >
                Upcoming Appointments
              </Nav.Link>
              <Nav.Link
                href={`/stylists/appointments/past/stylistId=${user.user.id}`}
              >
                Past Appointments
              </Nav.Link>
              <Nav.Link
                href={`/services/servicesOffered/stylistId=${user.user.id}`}
              >
                Services Offered
              </Nav.Link>
              <Nav.Link
                href={`/stylists/stylistCalendar/stylistId=${user.user.id}`}
              >
                Calendar{" "}
              </Nav.Link>
              <Nav.Link href={`/stylists/stylistId=${user.user.id}/info`}>
                My Profile
              </Nav.Link>
            </div>
          ) : (
            <></>
          )}
          {user.isAuthenticated ? (
            <Nav.Link href="/UserProfile">My Profile</Nav.Link>
          ) : (
            <></>
          )}
        </Nav>
      </Navbar.Collapse>
      <Form inline>
        <FormControl
          onChange={(event) => setName(event.target.value)}
          value={name}
          type="text"
          placeholder="Search a Stylist"
        />
      </Form>
      <a className="ms-2" href={`${searchURL}name/${name}`}>
        <Button variant="dark">Search</Button>
      </a>
      {user.isAuthenticated ? (
        <button onClick={onLogout} className="btn btn-warning mx-2">
          Logout
        </button>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

export default Navigation;
