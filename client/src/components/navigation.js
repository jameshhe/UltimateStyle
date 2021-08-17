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
      <Navbar.Brand
        href={
          user.user.role === "stylist"
            ? `/stylists/stylistLanding/stylistId=${user.user.id}`
            : `/userLanding`
        }
      >
        <img
          src={logo}
          width="70"
          height="45"
          className="d-inline-block align-top ms-4 mb-1"
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
            <NavDropdown title="My Information" id="basic-nav-dropdown">
              {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
              <NavDropdown.Item
                href={`/stylists/appointments/upcoming/stylistId=${user.user.id}`}
              >
                Upcoming Appointments
              </NavDropdown.Item>
              <NavDropdown.Item
                href={`/stylists/appointments/past/stylistId=${user.user.id}`}
              >
                Past Appointments
              </NavDropdown.Item>
              <NavDropdown.Item
                href={`/services/servicesOffered/stylistId=${user.user.id}`}
              >
                Services Offered
              </NavDropdown.Item>
              <NavDropdown.Item
                href={`/stylists/stylistCalendar/stylistId=${user.user.id}`}
              >
                Calendar
              </NavDropdown.Item>
              <NavDropdown.Item
                href={`/stylists/stylistId=${user.user.id}/info`}
              >
                My Profile
              </NavDropdown.Item>
            </NavDropdown>
          ) : user.isAuthenticated ? (
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
