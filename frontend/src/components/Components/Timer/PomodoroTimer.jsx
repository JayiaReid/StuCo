import 'animate.css';
import './timer.css';
import React, { useState, useEffect, useRef } from 'react';
import stopIcon from '../../../assets/pause.png';
import startIcon from '../../../assets/pstart.png';
import restartIcon from '../../../assets/refresh.png';

//game in between break
function PomodoroTimer(props) {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [pomodoro, setPomodoro] = useState(0);
    const [check, setCheck] = useState(false);
    const intervalIdRef = useRef(null);
    const startTimeref = useRef(0);
    const pomodoroDuration = 1500; // 25 minutes in seconds
    const [percent, setPercent]=useState(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                const now = Date.now();
                const elapsed = now - startTimeref.current;
                setElapsedTime(prevElapsedTime => prevElapsedTime + elapsed);
                startTimeref.current = now;
            }, 1000);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    useEffect(() => {
        const l_content = document.querySelector('#l_content');
        const circle=document.querySelector('#loader');

        if (elapsedTime >= pomodoroDuration * 1000) {
            setElapsedTime(0);
            setCheck(false);
            setPomodoro(prevPomodoro => prevPomodoro + 1);
            setIsRunning(false);
            alert("Pomodoro is finished! Take a walk and come back!");
        }else{
            if(isRunning){
                circle.style.animation = 'spin 1s infinite linear'
                l_content.style.animation = 'spin 1s infinite linear reverse'
                setPercent(100-((elapsedTime / (pomodoroDuration * 1000)) * 100))
                circle.style.background = `conic-gradient(from 0deg at 50% 50%, 
                    #26fbfb 0%,
                    #a9ffff ${percent}%,
                    #000000 ${percent}%)`
            }else{
                circle.style.animation = 'spin 100000s infinite linear'
                l_content.style.animation = 'spin 100000s infinite linear reverse'
                setPercent(0)
                circle.style.background = `conic-gradient(from 0deg at 50% 50%, 
                    #26fbfb 0%,
                    #a9ffff ${percent}%,
                    #000000 ${percent}%)`
            }

            
        
            // setPercent(100-((elapsedTime / (pomodoroDuration * 1000)) * 100))

            circle.style.background = `conic-gradient(from 0deg at 50% 50%, 
            #26fbfb 0%,
            #a9ffff ${percent}%,
            #000000 ${percent}%)`
            
        
        }
    }, [elapsedTime, isRunning]);

    function start() {
        setIsRunning(true);
        startTimeref.current = Date.now();
    }

    function stop() {
        setIsRunning(false);
        
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setPomodoro(0);
        setCheck(false);
        setPercent(100)
    }

    function formatTime() {
        let seconds = Math.floor((pomodoroDuration - elapsedTime / 1000) % 60);
        let mins = Math.floor((pomodoroDuration - elapsedTime / 1000) / 60);

        seconds = String(seconds).padStart(2, "0");
        mins = String(mins).padStart(2, "0");

        return `00:${mins}:${seconds}`;
    }

    function handlePomodoro() {
        setCheck(true);
    }

    return (
        <div id="ptimer" onMouseOver={handlePomodoro}>
            <h2 className="animate__animated animate__bounce">{props.name}'s Pomodoros: {pomodoro}</h2>
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <img onClick={start} src={startIcon} alt="Start"/>
                <img onClick={stop} src={stopIcon} alt="Stop"/>
                <img onClick={reset} src={restartIcon} alt="Restart"/>
            </div>
        </div>
    );
}

export default PomodoroTimer;
