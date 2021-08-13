import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";
// Register User
const api = "http://localhost:8000";
axios.defaults.baseURL = api;
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(() => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register Stylist
export const registerStylist = (userData, history) => dispatch => {
    axios
        .post("/api/stylists/register", userData)
        .then(() => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//registerSylistUserWillBe updated once I figure out how to correctlyCheck the texas ID database
export const registerUserStylist = (userData, history) => dispatch => {
    axios
        .post(`/api/stylists/register/create`, userData)
        .then(() => history.push("/stylists/stylistLanding")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Change Password
export const changePassword = (userData, history) => dispatch => {
    axios
        .post("/api/users/changePassword", userData)
        .then(() => history.push("/home")) // re-direct to home after changing password
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const login = userData => dispatch => {
    if (userData.isStylist === true){
        axios
        .post("/api/stylists/login", userData)
        .then(res => {
            // Save to localStorage
// Set token to localStorage
            // console.log(res.data)
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
    } else {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
// Set token to localStorage
            // console.log(res.data)
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
    }
};
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
// Set token to localStorage
            // console.log(res.data)
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
};
export const loginStylist = userData => dispatch => {
    axios
        .post("/api/stylists/login", userData)
        .then(res => {
            // Save to localStorage
// Set token to localStorage
            // console.log(res.data)
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
};
// Set logged in user
export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

};