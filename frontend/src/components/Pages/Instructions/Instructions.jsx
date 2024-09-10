import './instructions.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Instructions(){

    const [name, setName]=useState('User');

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:5170/').then(
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

    const nav = useNavigate();

    return(
        <div id='i_page'>
            <div id='i_container'>
                <h2><i>Hello {name}, Here are a few pointers for using this application: </i></h2>
                <span>
                    <h5 style={{color: "#57BE92"}}>Usage: </h5>
                        <ul>
                            <li>This application is meant for students to have tools in one application while studying</li>
                            <li>You can use this application and its utilities for as long as you'd like</li>
                            <li>You are able to store your lists, calculations, conversions and notes as long as you are logged in</li>
                        </ul>
                </span>
                
                    <span id='i_ub'>
                        <h5 style={{color: "#ffbf00"}}>Utilities Bar:</h5>
                        <p>There is a utilities bar on the right of the page with the following options</p>
                        <ul> 
                            <li>Home: Go to login page</li>
                            <li>Calculator</li>
                            <li>ToDo list</li>
                            <li>Notes App (coming soon)</li>
                            <li>Conversion Calculator</li>
                            <li>Guide</li>
                        </ul>
                        <p>NB: click on each Icon to toggle it, with the exception of the Home Icon ofc. These are accessible in all spaces</p> 
                    </span>
                    <span id='i_sb'>
                        <h5 style={{color: '#54f7f8'}}>Spaces Bar:</h5>
                        <p>This is the continuously scrolling bar at the top of the page.</p>
                        <p>It contains the options for the spaces which are all different depending on the type of studying you want:</p>
                        <ul> 
                            <li>Blue: This is the orbit pomodoro space which contains a timer of 25 mins with a break in between each session</li>
                            <li>Yellow: This is the planet stopwatch space which contains a stopwatch that the length of your study session is not predefined but you can keep track of time </li>
                            <li>Red: This is the lamp timer space which allows your to predefine the length of your study session</li>
                        </ul>
                    </span> 
                    <div id='i_exit'>
                        <button id='exit_i_btn'onClick={()=> {nav('/orbit')}}>Go to Spaces</button>
                    </div>
                    
            </div>
        </div>
    );
}