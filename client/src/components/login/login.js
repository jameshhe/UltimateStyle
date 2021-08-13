

import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../actions/authActions";
import classnames from "classnames";
import "../register/register.css"
import RegisterPopup from "../register/registerPopup";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            modalShow: false,
            isStylist: false,
            error: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if (this.state.isStylist === true){
            this.props.history.push(`/stylists/stylistLanding/stylistId=${this.props.auth.user.id}`); // push user to dashboard when they login
            } else {
                this.props.history.push("/userLanding");
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            console.log(nextProps.auth);
            if (this.state.isStylist === true){
            this.props.history.push(`/stylists/stylistLanding/stylistId=${nextProps.auth.user.id}`); // push user to dashboard when they login
            } else {
                this.props.history.push("/userLanding");
            }
        }
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }
    onCheck = e => {
        if (this.state.isStylist === false){
        this.setState(({isStylist: true}));
        } else {
            this.setState(({isStylist: false}));
        }
    }
    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
            isStylist: this.state.isStylist
        };
        this.props.login(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const error = this.state.error;
        console.log(error.error)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5 col-5 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <div>
                                    <p className="grey-text text-darken-1">
                                        Don't have an account yet?
                                        <a href="#" onClick={() => this.setState({modalShow: true})}> <u>Register</u> </a>Now!
                                        <RegisterPopup
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({modalShow: false})}
                                        />
                                    </p>
                                </div>
                                <h5 className="card-title text-center">Login</h5>
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <span className="text-danger">
                                            {error.error}</span>
                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            id="email"
                                            type="email"
                                            className={classnames("form-control", {
                                                invalid: error.email || error.emailnotfound
                                            })}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            id="password"
                                            type="password"
                                            className={classnames("form-control", {
                                                invalid: error.password || error.passwordincorrect
                                            })}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
           <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" checked={this.state.isStylist} onChange={this.onCheck}/>
    <label class="form-check-label" htmlFor="exampleCheck1">If you are a stylist or barber, please click here </label>
  </div>
                                    <hr/>
                                        <button
                                    type="button"
                                    className="btn btn-lg btn-primary btn-block text-uppercase"
                                    onClick={this.onSubmit}
                                >
                                    Login
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
export default connect(
    mapStateToProps,
    {login}
)(Login);