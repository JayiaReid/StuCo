import '../Home/Login.css'
import Study from '../../../assets/studying.mp4'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export default function SignUp(){

    const [f_name, setF_name]=useState('');
    const [l_name, setL_name]=useState('');
    const [passwrd, setpasswrd]=useState('');
    const [email, setEmail]=useState('');
    const [DOB, setdob]=useState('');
    const [userID, setUserID]=useState(0);
    const nav=useNavigate();
    
    const Navigation =()=>{
        nav('/')
    }

    const handleUser =()=>{
        alert("going to login page")
        Navigation()
    }

    const startsWithZero = (number) => {
        const numberString = number.toString(); 
        return numberString.charAt(0) === '0'; 
    };
    const numberLength = (number) => {
        const numberString = number.toString(); 
        return numberString.length; 
    };

    axios.defaults.withCredentials = true;
    const submit=(e)=>{
        e.preventDefault();


        //validation
        if(f_name==''||l_name==''||passwrd==''|| email==''||DOB==''|| userID==0 ){
            alert("All fields should be filled out")
        }
        else if(startsWithZero(userID)==false || numberLength(userID)!=5){
            alert("invalid user ID")
        }
        else{

            // setUserID(generateUserID)

            axios.post("http://localhost:5170/sign-up", 
        {
            userID: userID,
            f_name: f_name,
            l_name: l_name,
            passwrd: passwrd,
            email: email,
            DOB: DOB
        }). then((response)=>{
            if(response.status == 200){
                alert("Welcome to StuCo: Login and Enjoy!")
                Navigation();

            } else {
                const {message}=response.data;
                alert("Sign Up failed: Duplicate userID or invalid credentials")
            }
        })
        }
    }
    
    return(
        <div id="signUp">
           <form autoComplete="on" >
                 <span className="Alogo">
                     <video autoPlay muted loop className="Alogo">
                         <source src={Study} type="video/mp4"/>
                     </video>
                 </span>
                <h3> <span style={{color: "#ffbf00"}}>StuCo:</span> <span style={{color: "#54f7f8"}}>Study</span> <span style={{color: "#ff0000"}}>Spaces</span></h3>


                 <div className="cred">
                    <input id="f_name" 
                    className="inputs" 
                    type="text" 
                    placeholder="Enter First Name" 
                    onChange={(e)=> setF_name( e.target.value )}
                    />
                </div>
                <div className="cred">
                    <input id="l_name" 
                    className="inputs" 
                    type="text" 
                    placeholder="Enter Last Name" 
                    onChange={(e)=> setL_name( e.target.value )}
                    />
                </div>
                <div className="cred">
                    <input id="s_email" 
                    className="inputs" 
                    type="text" 
                    placeholder="Enter Email" 
                    onChange={(e)=> setEmail( e.target.value )}
                    />
                </div>
                <br/>
                <div className="cred">
                    <label 
                    htmlFor='DOB'
                    style={{color: "#ffbf00"}}>Enter Date of Birth</label>
                    <input id="DOB" 
                    name='DOB'
                    className="inputs" 
                    type='date'
                    placeholder="Enter your Date of Birth" 
                    onChange={(e)=> setdob( e.target.value )}
                    />
                </div>
                <br/>
                <div className="cred">
                    <input id="s_pwd" 
                    type="password" 
                    className="inputs" 
                    placeholder="Enter Password" 
                    onChange={(e)=> setpasswrd(e.target.value)}
                    required/>
                </div>
                <div className="cred">
                    <input id="userID" 
                    type="number" 
                    className="inputs" 
                    placeholder="Enter a user ID, a five digit number starting with 0" 
                    onChange={(e)=> setUserID( e.target.value)}
                    required/>
                </div>
                <button className='over' type="submit" id="signin-btn" onClick={submit}>SIGN UP</button>
                <br/>
                <p className="DK" title='go back to login' onClick={handleUser}>Already Have An Account?</p>
            </form>
        </div>
    );
}