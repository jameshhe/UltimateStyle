import React, { useState } from 'react';
import axios from 'axios';
import base_url from '../base_url';

const SendPassword = () => {
    const url = `http://${base_url}:8000/api/users/forgotPassword`;
    const [email, setEmail] = useState('');

    const onSend = async event => {
        event.preventDefault();
        await axios
            .post(url, {
                email: email,
            })
            .then(res => alert('Reset password link sent successfully!'))
            .catch(err => {
                alert('Failed to send the link. Please try again!');
                console.log(err);
            });
        setEmail('');
    };

    return (
        <div className='container mt-5'>
            <div className='row align-items-center h-100'>
                <div className='col-6 mx-auto'>
                    <form onSubmit={onSend}>
                        <div className='form-group'>
                            <label htmlFor='email'>
                                Enter your email below
                            </label>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Send reset link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendPassword;
