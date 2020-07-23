import React from 'react';

const Error = ({ error }) => (
    <div>
        <h3>{error}</h3>
        <button>Please Try Again</button>
    </div>
);

export default Error;