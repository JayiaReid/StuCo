import React, { useRef, useState, useEffect } from 'react';
import './lamp.css';
import Head1 from '../../../Components/Header/Head1';
import { useNavigate } from 'react-router-dom';
import Head0 from '../../../Components/Header/Head0';
import Ttimer from '../../../Components/Timer/Ttimer';
import Calculator from '../../../Components/Calculator/Calculator';
import TodoList from '../../../Components/ToDo/TodoList';
import Converter from '../../../Components/Converter/Converter';
import axios from 'axios';
import Notes from '../../../Components/Notes/Notes';

export default function Lamp() {
    const [showTodoList, setShowTodoList] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showConverter, setShowConverter]=useState(false);
    const [showNotes, setShowNotes]=useState(false);

    function light(){
        const bulb = document.querySelector('.bulb');
        bulb.classList.toggle('off');
        bulb.classList.toggle('on');
    }

    const [name, setName]=useState('');
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:5170').then(
            (response)=>{
                if(response.data.valid){
                    console.log(response.data)
                    const {user: {userID, name, email}} = response.data;
                    console.log(userID, email, name)
                    setName(name)
                } else {
                    setName("User")
                }
            }
        ).catch((err)=> console.error(err))
    },[])


    return (
        <div className='spaces' id="lamp">
            <Head1/>
            <Head0 
                toggleTodoList={() => setShowTodoList(!showTodoList)}
                toggleCalculator={() => setShowCalculator(!showCalculator)}
                toggleConverter={() => setShowConverter(!showConverter)}
                toggleNotes={()=>setShowNotes(!showNotes)}
                bg="black"
            />
            <div className="container stopswing">
                <div className="bulb" onClick={light} >
                    <div className="filaments" ></div>
                </div>
            
            </div>
            {/* <div className='floor'> */}
                
            {/* </div> */}
            <span id='lamp_bottom'>
                <Ttimer name={name}/>
            </span>
            
            {showTodoList && <TodoList inputBg='red'/>}
            {showCalculator && <Calculator buttonClassName='calclamp'/>}
            {showConverter && <Converter bgcolor="red"/>}
            {showNotes && <Notes bg="red"/>}
            
            {/* <div className="floor">
                
            </div> */}
        </div>
    );
}
