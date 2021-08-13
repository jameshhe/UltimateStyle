import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./register.css"

class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            name: "",
            email: "",
            password: "",
            password2: "",
            error: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to RegisterUser page, should redirect them to dashboard
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5 col-5 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="form-label-group col-6">
                                            <input type="text" onChange={this.onChange} error={error.firstName}
                                                   value={this.state.firstName} id="firstName" className={classnames("form-control", {
                                                invalid: error.firstName
                                            })} placeholder="First Name" required autoFocus />
                                            <label htmlFor="firstName">First Name</label>
                                            <span className="red-text">{error.firstName}</span>
                                        </div>
                                        <div className="form-label-group col-6">
                                            <input type="text" onChange={this.onChange} error={error.lastName}
                                                   value={this.state.lastName} id="lastName" className={classnames("form-control", {
                                                invalid: error.lastName
                                            })} placeholder="Last Name" required autoFocus />
                                            <label htmlFor="lastName">Last Name</label>
                                            <span className="red-text">{error.lastName}</span>
                                        </div>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="text" onChange={this.onChange} error={error.name}
                                               value={this.state.name} id="name" className={classnames("form-control", {
                                            invalid: error.name
                                        })} placeholder="Username" required autoFocus />
                                            <label htmlFor="name">Username</label>
                                            <span className="red-text">{error.name}</span>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="email" onChange={this.onChange}
                                               value={this.state.email}
                                               error={error.email} id="email"
                                               placeholder="Email address" className={classnames("form-control", {
                                            invalid: error.email
                                        })} required />
                                            <label htmlFor="email">Email address</label>
                                            <span className="red-text">{error.email}</span>
                                    </div>

                                    <hr/>

                                        <div className="form-label-group">
                                            <input type="password" onChange={this.onChange}
                                                   value={this.state.password}
                                                   error={error.password} id="password"
                                                   placeholder="Password" className={classnames("form-control", {
                                                invalid: error.password
                                            })} required />
                                                <label htmlFor="password">Password</label>
                                                <span className="red-text">{error.password}</span>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" onChange={this.onChange}
                                                   value={this.state.password2}
                                                   error={error.password2} id="password2" placeholder="Password"
                                                   className={classnames("form-control", {
                                                       invalid: error.password2
                                                   })} required />
                                                <label htmlFor="password2">Confirm password</label>
                                                <span className="red-text">{error.password2}</span>
                                        </div>

                                        <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                                type="submit">Register
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
RegisterUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(RegisterUser));