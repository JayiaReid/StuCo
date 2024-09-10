import Draggable from "react-draggable";
import React, { useState } from "react";
import './Converter.css'
export default function Converter(props){
    const nodeRef = React.useRef(null); //to avoid findDOM error
    const [fromVal, setFromVal]=useState(0);
    const [toVal, setToVal]=useState(0);
    const [convType, setConvType]=useState("");
    const [convFrom, setConvFrom]=useState("");
    const [convTo, setConvTo]=useState("");
    const [conversion, setConversion]=useState([
        {measure: "Meter", category: "length" },
        {measure: "Centimeter", category: "length" },
        {measure: "Inches", category: "length" },
        {measure: "Foot", category: "length" },
        {measure: "Mile", category: "length" },
        {measure: "Kilometer", category: "length" },
        {measure: "Celcius", category: "Temperature" },
        {measure: "Kelvin", category: "Temperature" },
        {measure: "Fahrenheit", category: "Temperature" },
        {measure: "Square Meter", category: "Area" },
        {measure: "Square Kilometer", category: "Area" },
        {measure: "Acre", category: "Area" },
        {measure: "Cubic Metre", category: "Volume" },
        {measure: "Cubic Kilometre", category: "Volume" },
        {measure: "Cubic Centimetre", category: "Volume" },
        {measure: "Litre", category: "Volume" },
        {measure: "Millilitre", category: "Volume" },
        {measure: "Gallon", category: "Volume" },
        {measure: "Kilogram", category: "Weight" },
        {measure: "Gram", category: "Weight" },
        {measure: "Milligram", category: "Weight" },
        {measure: "Pound", category: "Weight" },
        {measure: "Ounce", category: "Weight" },
    ]);

    function convert(e) {
        const inputValue = parseFloat(e.target.value);
        let result = inputValue;
    
        // Perform conversion based on the selected units
        if (convFrom === "Meter" && convTo === "Kilometer") {
            result = inputValue / 1000;
        } else if (convFrom === "Kilometer" && convTo === "Meter") {
            result = inputValue * 1000;
        } else if (convFrom === "Meter" && convTo === "Centimeter") {
            result = inputValue * 100;
        } else if (convFrom === "Centimeter" && convTo === "Meter") {
            result = inputValue / 100;
        } else if (convFrom === "Centimeter" && convTo === "Inches") {
            result = inputValue / 2.54;
        } else if (convFrom === "Inches" && convTo === "Centimeter") {
            result = inputValue * 2.54;
        } else if (convFrom === "Meter" && convTo === "Inches") {
            result = inputValue * 39.3701;
        } else if (convFrom === "Inches" && convTo === "Meter") {
            result = inputValue / 39.3701;
        } else if (convFrom === "Meter" && convTo === "Foot") {
            result = inputValue * 3.28084;
        } else if (convFrom === "Foot" && convTo === "Meter") {
            result = inputValue / 3.28084;
        } else if (convFrom === "Meter" && convTo === "Mile") {
            result = inputValue * 0.000621371;
        } else if (convFrom === "Mile" && convTo === "Meter") {
            result = inputValue / 0.000621371;
        } else if (convFrom === "Celcius" && convTo === "Kelvin") {
            result = inputValue + 273.15;
        } else if (convFrom === "Kelvin" && convTo === "Celcius") {
            result = inputValue - 273.15;
        } else if (convFrom === "Celcius" && convTo === "Fahrenheit") {
            result = (inputValue * 9/5) + 32;
        } else if (convFrom === "Fahrenheit" && convTo === "Celcius") {
            result = (inputValue - 32) * 5/9;
        } else if (convFrom === "Square Meter" && convTo === "Square Kilometer") {
            result = inputValue / 1000000;
        } else if (convFrom === "Square Kilometer" && convTo === "Square Meter") {
            result = inputValue * 1000000;
        } else if (convFrom === "Square Meter" && convTo === "Acre") {
            result = inputValue * 0.000247105;
        } else if (convFrom === "Acre" && convTo === "Square Meter") {
            result = inputValue / 0.000247105;
        } else if (convFrom === "Cubic Metre" && convTo === "Cubic Kilometre") {
            result = inputValue / 1000000000;
        } else if (convFrom === "Cubic Kilometre" && convTo === "Cubic Metre") {
            result = inputValue * 1000000000;
        } else if (convFrom === "Cubic Metre" && convTo === "Cubic Centimetre") {
            result = inputValue * 1000000;
        } else if (convFrom === "Cubic Centimetre" && convTo === "Cubic Metre") {
            result = inputValue / 1000000;
        } else if (convFrom === "Litre" && convTo === "Millilitre") {
            result = inputValue * 1000;
        } else if (convFrom === "Millilitre" && convTo === "Litre") {
            result = inputValue / 1000;
        } else if (convFrom === "Gallon" && convTo === "Litre") {
            result = inputValue * 3.78541;
        } else if (convFrom === "Litre" && convTo === "Gallon") {
            result = inputValue / 3.78541;
        } else if (convFrom === "Kilogram" && convTo === "Gram") {
            result = inputValue * 1000;
        } else if (convFrom === "Gram" && convTo === "Kilogram") {
            result = inputValue / 1000;
        } else if (convFrom === "Milligram" && convTo === "Gram") {
            result = inputValue / 1000;
        } else if (convFrom === "Gram" && convTo === "Milligram") {
            result = inputValue * 1000;
        } else if (convFrom === "Pound" && convTo === "Gram") {
            result = inputValue * 453.592;
        } else if (convFrom === "Gram" && convTo === "Pound") {
            result = inputValue / 453.592;
        } else if (convFrom === "Ounce" && convTo === "Gram") {
            result = inputValue * 28.3495;
        } else if (convFrom === "Gram" && convTo === "Ounce") {
            result = inputValue / 28.3495;
        }
        
        setToVal(result);
    }
    
    //conversions
    /*1000m : 1km
    100m : 1cm
    1mm: 0.001m
    1 inch = 2.54 cm 
    1 mile = 1.60935 km*/

    return(
        <Draggable axis="both" handle="#conv" nodeRef={nodeRef}>
            <form id="conv" ref={nodeRef} >
                
                <select
                id="conv_type"
                onChange={(e)=>{setConvType(e.target.value)}}
                required style={{backgroundColor: props.bgcolor, color: "black"}}
                >
                    <option value="" id="conv_type_p">Select Unit</option>
                    <option value="Volume">Volume</option>
                    <option value="length">Length</option>
                    <option value="Weight">Weight</option>
                    <option value="Temperature">Temperature</option>
                    <option value="Area">Area</option>
                </select><br/>
                <select onChange={(e)=>{setConvFrom(e.target.value)}}>
                    <option value="">From</option>
                    {conversion.map((val, index)=>(
                        val.category === convType?(
                            <option key={index} value={val.measure} className="conv_options">
                                {val.measure}
                            </option>
                        ):null
                    ))}
                </select><br/>
                <input name="conv_from"
                id="conv_from"
                placeholder={convFrom}
                type="number"
                onChange={convert} style={{backgroundColor: props.bgcolor}}
                /><br/>
                <select onChange={(e)=>{setConvTo(e.target.value)}}>
                    <option value="">To</option>
                    {conversion.map((val, index)=>(
                        val.category === convType?(
                            <option key={index} value={val.measure} className="conv_options">
                                {val.measure}
                            </option>
                        ):null
                    ))}
                </select><br/>
                <input name="conv_to"
                id="conv_to"
                placeholder={convTo}
                type="number" 
                readOnly
                value={toVal}
                style={{backgroundColor: props.bgcolor}}/>
            </form>
        </Draggable>
    );
}