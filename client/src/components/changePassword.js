import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStore } from 'react-redux';
import base_url from '../base_url';

const ChangePassword = () => {
    const store = useStore();
    const userType = store.getState().auth;
    let { id } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const URL = `http://${base_url}:8000/api/users/resetPassword/`;
    const onSend = async event => {
        event.preventDefault();
        await axios
            .put(URL + { id }.id, {
                password: newPassword,
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className='container mt-5'>
                <div className='row align-items-center h-100'>
                    <div className='col-6 mx-auto'>
                        <form onSubmit={onSend}>
                            <div className='form-group'>
                                <label htmlFor='email'>
                                    Enter your new password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    value={newPassword}
                                    onChange={event =>
                                        setNewPassword(event.target.value)
                                    }
                                    className='form-control'
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
