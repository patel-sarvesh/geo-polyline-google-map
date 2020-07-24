import React from 'react';
import './slider.css';

const Slider = ({ min, max, onChange, value }) => (
    <input 
        className="slider"
        type="range" 
        min={min} max={max} 
        id="opacity"
        name="opacity"
        onChange={onChange} 
        value={value} 
    />
);

export default Slider;