import React from 'react';
import ReactLoading from 'react-loading'

const Loading = () => {
    return (
        <div className="h-100 row justify-content-center align-items-center">
            <ReactLoading type="cubes" color="#000" height="4rem" width="4rem" />
        </div>


    );
};

export default Loading;
