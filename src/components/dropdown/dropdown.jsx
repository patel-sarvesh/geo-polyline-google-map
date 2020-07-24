import React from 'react';
import './dropdown.css';

const DropDown = ({ onChange, value, options }) => (
    <select onChange={onChange} value={value || ''}>
        { options.map(elevation => <option key={elevation} value={elevation}>{elevation}</option>) }
    </select>
);

export default DropDown;