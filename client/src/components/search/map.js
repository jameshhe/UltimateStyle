import React, { useState, useEffect, useRef } from 'react';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import './map.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const YOUR_API_KEY = 'AIzaSyCHjOs8sCJfI1C0HnzD5C1BahEx_XRQJvw';

const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
};

export const LocationPin = ({
    stylist,
    lng,
    lat,
    onClickLocation,
    clicked,
}) => (
    <div onClick={e => onClickLocation({ lat, lng })} className='pin'>
        <Icon icon={locationIcon} className='pin-icon' />
        <div className={`pin-text ${clicked ? 'bg-white p-3' : null}`}>
            <p className='h6'>{stylist.firstName + ' ' + stylist.lastName}</p>
            {clicked && <hr />}
            <p className='h6'>{stylist.businessName}</p>
            {clicked && <small>{stylist.number}</small>}
            {clicked && <small>{stylist.email}</small>}
            {clicked && <hr />}
            {clicked ? (
                <>
                    <p className='h6'>Services</p>
                    <hr />
                    <ul>
                        {stylist.services.map((service, i) => {
                            return <li key={i}>{service.name}</li>;
                        })}
                    </ul>
                    <hr />
                    <Link
                        to={`/stylist/stylistId=${stylist._id.toString()}`}
                        className='btn btn-block btn-primary'
                    >
                        More info
                    </Link>
                </>
            ) : null}
        </div>
    </div>
);

export const Map = ({ location, stylists }) => {
    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState(10);
    const [target, setTarget] = useState({});

    const handleClick = (location, stylist) => {
        console.log(location);
        setCenter([location.lat, location.lng]);
        setTarget(stylist);
    };

    const isMount = useIsMount();

    return (
        <div className='map'>
            <div className='google-map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: YOUR_API_KEY }}
                    center={center.length > 0 ? center : location}
                    defaultZoom={5}
                    zoom={zoom}
                    onDrag={e => setTarget({})}
                >
                    {stylists.map((stylist, i) => {
                        return (
                            stylist.location && (
                                <LocationPin
                                    key={i}
                                    lat={stylist.location.coordinates[1]}
                                    lng={stylist.location.coordinates[0]}
                                    stylist={stylist}
                                    clicked={
                                        target && target._id == stylist._id
                                    }
                                    onClickLocation={location =>
                                        handleClick(location, stylist)
                                    }
                                />
                            )
                        );
                    })}
                </GoogleMapReact>
            </div>
        </div>
    );
};
