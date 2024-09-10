import React, { useState } from 'react';
import './Calculator.css';
import Draggable from 'react-draggable';

function Calculator({ buttonClassName }) {
    const [result, setResult] = useState("");
    const nodeRef = React.useRef(null); //to avoid findDOM error

    const handleButtonClick = (e) => {
        setResult(result.concat(e.target.name));
    }

    const handleEqualClick = () => {
        try {
            setResult(eval(result).toString());
        } catch (error) {
            setResult("Error");
        }
    }

    const handleClear = () => {
        setResult("");
    }

    const handleBackspace = () => {
        setResult(result.slice(0, result.length - 1));
    }

    return (
        <Draggable
            axis="both"
            handle=".calculator"
            nodeRef={nodeRef}>
            <div className="calculator" ref={nodeRef}>
                <div className="display-screen">
                    <div id="display">{result}</div>
                </div>
                <table className='buttons'>
                    <tbody>
                        <tr>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name="C" onClick={handleClear}>C</button></td>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name="/" onClick={handleButtonClick}>÷</button></td>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name="*" onClick={handleButtonClick}>×</button></td>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name="backspace" onClick={handleBackspace}>&lt;</button></td>
                        </tr>
                        <tr>
                            <td><button className={`${buttonClassName} btn-number`} name="7" onClick={handleButtonClick}>7</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="8" onClick={handleButtonClick}>8</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="9" onClick={handleButtonClick}>9</button></td>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} onClick={handleButtonClick} name="-">-</button></td>
                        </tr>
                        <tr>
                            <td><button className={`${buttonClassName} btn-number`} name="4" onClick={handleButtonClick}>4</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="5" onClick={handleButtonClick}>5</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="6" onClick={handleButtonClick}>6</button></td>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name="+" onClick={handleButtonClick}>+</button></td>
                        </tr>
                        <tr>
                            <td><button className={`${buttonClassName} btn-number`} name="1" onClick={handleButtonClick}>1</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="2" onClick={handleButtonClick}>2</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="3" onClick={handleButtonClick}>3</button></td>
                            <td rowSpan="2"><button className={`${buttonClassName} operatorBtn highlight`} name="equal" id="equal" onClick={handleEqualClick}>=</button></td>
                        </tr>
                        <tr>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name="(">(</button></td>
                            <td><button className={`${buttonClassName} btn-number`} name="0" onClick={handleButtonClick}>0</button></td>
                            <td><button className={`${buttonClassName} operatorBtn highlight`} name=")">)</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Draggable>
    );
}

export default Calculator;
