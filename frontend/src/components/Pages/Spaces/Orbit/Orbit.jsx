
import './Orbit.css'; 
import Head0 from '../../../Components/Header/Head0.jsx';
import Head1 from '../../../Components/Header/Head1.jsx';
import React, { useState, useEffect, useRef } from 'react';
import PomodoroTimer from '../../../Components/Timer/PomodoroTimer.jsx';
import Calculator from '../../../Components/Calculator/Calculator.jsx';
import TodoList from '../../../Components/ToDo/TodoList.jsx';
import axios from 'axios';
import Converter from '../../../Components/Converter/Converter.jsx';
import Notes from '../../../Components/Notes/Notes.jsx';

//pomodoro: prompt amount of pomodoro
export default function Orbit(){
    const [showTodoList, setShowTodoList] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showConverter, setShowConverter]=useState(false);
    const [showNotes, setShowNotes]=useState(false)

    const [name, setName]=useState('User');
    const [loginStatus, setLoginStatus]=useState(false);
    
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:5170').then(
            (response)=>{
                if(response.data.valid){
                    console.log(response.data)
                    const {user: {userID, name, email}} = response.data;
                    console.log(userID, email, name)
                    setName(name)
                    setLoginStatus(true)
                }
            }
        ).catch((err)=> console.error(err))

        if(loginStatus == false){
            setName('User')
        }
    },[])


    return(
        <div className='spaces' id='orbit'>
            <Head0 
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                toggleTodoList={() => setShowTodoList(!showTodoList)}
                toggleCalculator={() => setShowCalculator(!showCalculator)}
                toggleConverter={() => setShowConverter(!showConverter)}
                toggleNotes={()=> setShowNotes(!showNotes)}
                bg="transparent"
            />
            <Head1/>
            {showTodoList && <TodoList inputBg='#54f7f8'/>}
            {showCalculator && <Calculator/>}
            {showConverter && <Converter bgcolor="#54f7f8"/>}
            {showNotes && <Notes bg='#54f7f8'/>}

            <div id='loader'>
                <span id='l_content'>
                    <PomodoroTimer name={name}/>
                </span>
                
            </div>

            
           
        </div>
    );
    
}
