import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../loading';
import base_url from '../../base_url';

const EditProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    let history = useHistory();

    const { user } = useSelector(state => state.auth);

    const userId = { user }.user.id;
    const token = localStorage.jwtToken;
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    useEffect(() => {
        const fetchUser = async () => {
            await axios
                .get(`http://${base_url}:8000/api/users/me`, config)
                .then(res => {
                    const userData = res.data.user;
                    setIsLoading(false);
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setAddress(userData.address);
                    setNumber(userData.number);
                })
                .catch(err => console.log(err));
        };
        fetchUser();
    }, []);

    // Save the profile
    const onSubmit = async event => {
        event.preventDefault();
        await axios
            .put(
                `http://${base_url}:8000/api/users/${userId}`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    number: number,
                },
                config
            )
            .then(res => {
                alert('Profile Updated!');
                history.push('/userProfile');
            })
            .catch(err => console.log(err));
    };

    // first name, last name
    // get rid of email

    return (
        <div className='container'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='row'>
                    <div className='col-lg-10 col-xl-9 mx-auto'>
                        <div className='card card-signin flex-row my-5'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'>
                                    Edit Profile
                                </h5>
                                <form
                                    className='form-signin'
                                    onSubmit={onSubmit}
                                >
                                    <div className='form-label-group'>
                                        <input
                                            type='firstName'
                                            onChange={event =>
                                                setFirstName(event.target.value)
                                            }
                                            className='form-control'
                                            value={firstName}
                                            id='firstName'
                                            placeholder='First Name'
                                        />
                                        <label htmlFor='firstName'>
                                            Enter New First Name
                                        </label>
                                    </div>

                                    <div className='form-label-group'>
                                        <input
                                            type='lastName'
                                            onChange={event =>
                                                setLastName(event.target.value)
                                            }
                                            className='form-control'
                                            value={lastName}
                                            id='lastName'
                                            placeholder='Last Name'
                                        />
                                        <label htmlFor='lastName'>
                                            Enter New Last Name
                                        </label>
                                    </div>

                                    <div className='form-label-group'>
                                        <input
                                            type='text'
                                            onChange={event =>
                                                setAddress(event.target.value)
                                            }
                                            className='form-control'
                                            value={address}
                                            id='address'
                                            placeholder='Address'
                                        />
                                        <label htmlFor='address'>
                                            Enter New Address
                                        </label>
                                    </div>

                                    <div className='form-label-group'>
                                        <input
                                            type='text'
                                            onChange={event =>
                                                setNumber(event.target.value)
                                            }
                                            className='form-control'
                                            value={number}
                                            id='number'
                                            placeholder='Phone Number'
                                        />
                                        <label htmlFor='number'>
                                            Enter New Phone Number
                                        </label>
                                    </div>

                                    <hr />

                                    <Link
                                        className='btn btn-secondary mr-2'
                                        to='/userLanding'
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        className='btn btn-primary mr-2'
                                        type='submit'
                                    >
                                        Save
                                    </button>
                                    <Link
                                        to='/resetPassword'
                                        className='btn btn-danger'
                                    >
                                        Change Password
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
