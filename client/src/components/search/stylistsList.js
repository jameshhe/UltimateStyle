import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StylistInfo from './stylistInfo';
import Loading from '../loading';
import SearchFilter from './searchFilter';
import { Map } from './map';
import base_url from '../../base_url';

const StylistsList = () => {
    const URL = `http://${base_url}:8000/api/stylists/search`;
    const [stylists, setStylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const queries = useParams();

    useEffect(() => {
        const getStylists = async () => {
            await axios
                .get(URL, {
                    params: queries,
                })
                .then(res => {
                    setStylists(res.data.returnedStylists);
                    console.log(res.data.returnedStylists);
                    setIsLoading(false);
                    console.log('Stylists data fetched');
                })
                .catch(err => console.log(err));
        };
        getStylists();
    }, []);

    return (
        <div className='h-100 align-items-center m-0'>
            {isLoading ? (
                <Loading />
            ) : stylists.length === 0 ? (
                <h1 className='text-center align-self-center'>
                    No Stylists Available
                </h1>
            ) : (
                <div className='row'>
                    <div className='col-2 overflow-hidden'>
                        <SearchFilter queries={queries} />
                    </div>

                    <div className='p-0 border-left col-7 overflow-auto'>
                        <ul className='p-0 m-0'>
                            {stylists.map((stylist, index) => (
                                <StylistInfo key={index} stylist={stylist} />
                            ))}
                        </ul>
                    </div>

                    <div className='col-3 p-2 overflow-hidden'>
                        {console.log(stylists)}
                        {stylists.length > 0 && (
                            <Map
                                // Object.keys(stylist.location).length !== 0
                                stylists={stylists.filter(stylist => {
                                    return stylist.hasOwnProperty('location');
                                })}
                                location={{
                                    lat: 32.779167,
                                    lng: -96.808891,
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StylistsList;
