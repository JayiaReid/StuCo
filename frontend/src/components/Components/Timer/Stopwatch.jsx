import './timer.css'
import React, { useState, useEffect, useRef } from 'react';
import stopIcon from '../../../assets/alarm.png';
import startIcon from '../../../assets/timer.png';
import restartIcon from '../../../assets/hourglass.png';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeref = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeref.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeref.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);

        hours = String(hours).padStart(2, "0");
        mins = String(mins).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${mins}:${seconds}`;
    }

    return (
            <div id="timer">
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    <img onClick={start} src={startIcon} alt="Start"/>
                    <img onClick={stop} src={stopIcon} alt="Stop"/>
                    <img onClick={reset} src={restartIcon} alt="Restart"/>
                </div>
            </div>
    );
}

export default Stopwatch;
