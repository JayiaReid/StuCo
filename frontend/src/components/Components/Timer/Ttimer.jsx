import React, { useState, useEffect, useRef } from 'react';
import stopIcon from '../../../assets/pause-button.png';
import startIcon from '../../../assets/play-button.png';
import restartIcon from '../../../assets/reload.png';
import Draggable from 'react-draggable';

function Ttimer(props) {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerDuration, setTimerDuration] = useState(0); // User input for timer duration in seconds
    const intervalIdRef = useRef(null);
    const startTimeref = useRef(0);
    const nodeRef = React.useRef(null); //to avoid findDOM error

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                const now = Date.now();
                const elapsed = now - startTimeref.current;
                setElapsedTime(prevElapsedTime => prevElapsedTime + elapsed);
                startTimeref.current = now;
            }, 1000);
            const bulb = document.querySelector('.bulb');
            bulb.classList.add('on');
            bulb.classList.remove('off');
        }else{
            const bulb = document.querySelector('.bulb');
            bulb.classList.add('off');
            bulb.classList.remove('on');
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    useEffect(() => {
        if (elapsedTime > 0 && elapsedTime >= timerDuration * 1000) {
            setElapsedTime(0);
            setIsRunning(false);
            alert("Timer is finished!");
            stop();
        }
    }, [elapsedTime, timerDuration]);

    function start() {
        if (timerDuration === 0) {
            const inputTime = prompt("Enter the timer duration in seconds:");
            const parsedTime = parseInt(inputTime);
            if (isNaN(parsedTime) || parsedTime <= 0) {
                alert("Invalid input! Please enter a valid number greater than 0.");
                return;
            }
            setTimerDuration(parsedTime);
        }
        setIsRunning(true);
        startTimeref.current = Date.now();
        const swing =document.querySelector('.container');
        swing.classList.add('moveswing');
        swing.classList.remove("stopswing");
        const bulb = document.querySelector('.bulb');
        bulb.classList.add('on');
        bulb.classList.remove('off');
    }

    function stop() {
        setIsRunning(false);
        const swing =document.querySelector('.container');
        swing.classList.add("stopswing");
        const bulb = document.querySelector('.bulb');
        bulb.classList.add('off');
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setTimerDuration(0);
    }

    function formatTime() {

        var remainingTime = Math.floor(timerDuration - elapsedTime / 1000);
        let hours = Math.floor((remainingTime /3600));
        remainingTime%=3600;
        let mins = Math.floor((remainingTime) /60);
        let seconds = Math.floor(remainingTime % 60);
        
        seconds = String(seconds).padStart(2, "0");
        mins = String(mins).padStart(2, "0");
        hours = String(hours).padStart(2, "0");

        return `${hours}:${mins}:${seconds}`;
    }

    return (
        // <Draggable
        //     axis='both'
        //     handle='#ttimer'nodeRef={nodeRef}>
        <div id="ttimer" ref={nodeRef}>
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <img onClick={start} src={startIcon} alt="Start"/>
                <img onClick={stop} src={stopIcon} alt="Stop"/>
                <img onClick={reset} src={restartIcon} alt="Restart"/>
            </div>
         </div>
    );
}

export default Ttimer;
