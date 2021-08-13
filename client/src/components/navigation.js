import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Button, Navbar, Nav, NavDropdown, Form, FormControl} from "react-bootstrap"
import {useDispatch, useSelector, useStore} from "react-redux";
import {logoutUser} from "../actions/authActions";
const URL = `http://localhost:8000`;  

const Navigation = () => {
    const [name, setName] = useState('');
    const searchURL = '/stylists/search/';
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logoutUser())
    };
    if (user.user.role === "stylist"){
        return (       
             <div>
            <Navbar bg="light" variant="light" expand="lg" className="border-bottom" fixed="top">
                <Navbar.Brand href={`/stylists/stylistLanding/stylistId=${user.user.id}`}>Ultimate Style</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={`/stylists/appointments/upcoming/stylistId=${user.user.id}`}>Upcoming Appointments</Nav.Link>
                        <Nav.Link href={`/stylists/appointments/past/stylistId=${user.user.id}`}>Past Appointments</Nav.Link>
                        <Nav.Link href={`/services/servicesOffered/stylistId=${user.user.id}`}>Services Offered</Nav.Link>
                        <Nav.Link href={`/stylists/stylistCalendar/stylistId=${user.user.id}`}>Calendar </Nav.Link>
                        <Nav.Link href={`/stylists/stylistId=${user.user.id}/info`}>My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {user.isAuthenticated ? <button onClick={onLogout} className="btn btn-warning mx-2">Logout</button> : <></>}
            </Navbar>
        </div>
        );
    } else {
    return (
        <div>
            {/*make nav bar bigger brigher*/}
            <Navbar bg="light" variant="light" expand="lg" className="border-bottom" fixed="top">
                <Navbar.Brand href="/userLanding">Ultimate Style</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
                            <NavDropdown.Item href={searchURL+'services/haircuts'}>Haircuts</NavDropdown.Item>
                            <NavDropdown.Item href={searchURL+'services/waxing'}>Waxing</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/UserProfile">My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <FormControl
                        onChange={event => setName(event.target.value)}
                        value={name}
                        type="text"
                        placeholder="Stylist"
                        className="mr-sm-2"
                    />
                </Form>
                <a href={`${searchURL}name/${name}`}><Button variant="dark">Search</Button></a>
                {user.isAuthenticated ? <button onClick={onLogout} className="btn btn-warning mx-2">Logout</button> : <></>}

            </Navbar>

        </div>
    );
    }
}

export default Navigation;