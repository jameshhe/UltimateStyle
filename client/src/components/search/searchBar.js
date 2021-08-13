import React, {useState} from 'react';
import {Link} from "react-router-dom";

const SearchBar = () => {
    // Stylist name searched
    const [name, setName] = useState('');

    return (
        <div className="input-group mb-3">
            <input type="text"
                   className="form-control"
                   placeholder="Stylist"
                   aria-label="Stylist"
                   aria-describedby="basic-addon2"
                   value={name}
                   onChange={event => setName(event.target.value)}
            />
            <div className="input-group-append">
                <Link to={`/stylists/search=${name}`} className="btn btn-outline-secondary">Search</Link>
            </div>
        </div>
    );
};

export default SearchBar;
