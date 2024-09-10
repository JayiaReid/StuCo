import '../Home/Login.css'
import Study from '../../../assets/studying.mp4'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export default function Login({onLogin}){

    const [userID, setUserID]=useState('');
    const [passwrd, setpasswrd]=useState('');
    // const [loggedIn, setLoggedIn]=useState(false);
    

    //alternate logins
    const [DKuserID, setDKuserID]=useState(false);
    const [DKpasswrd, setDKpasswrd]=useState(false);
    const [full_name, setfull_name]=useState('');
    const [DOB, setDOB]=useState('');
    const nav = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);
    
    const handleUserType = () =>{

        let result = confirm("If you are a student and your school is associated with us, you should have an account click on 'Don't Know UserID?' for more info. If your school is not associated with us or you would like to make a personal account, proceed?")

        if(result){
            nav('sign-up')
        }
    }
    
    const Navigation =()=>{
        alert("navigating to instructions")
        nav('/instructions')
    }

    const passwrdUnknown =()=>{
        // setDKpasswrd(true);
        alert('This should be the same password for your school account so contact IT department at your school for assistance')
    }
    axios.defaults.withCredentials = true;
    const submit=(e)=>{
        e.preventDefault();


        if(DKuserID==false && DKpasswrd==false){
            if(isNaN(userID)){
            alert("invalid userID");
            setUserID('');
            console.log("error");
            }else{
            // console.log(userID, passwrd);
            axios.post("http://localhost:5170/login", { 
            userID: userID, 
            passwrd: passwrd
            })
            .then((response)=>{
                console.log("Status code:", response.status);
                    console.log(response); 
                    const { token, message, login } = response.data;
                    if(response.status === 200){
                        // setCookie('token', token);
                        onLogin(token)
                        alert(message);
                        Navigation();
                        
                    }
            })
            .catch(error => {
                console.error(error);
                alert("Invalid Credentials")
            });
            }
            

        }
        else if(DKuserID){
            if(full_name=='' || DOB==''){
                alert("Enter Information");
                // setUserID('');
                console.log("error");
            }else{
                console.log(full_name, DOB, passwrd);
                axios.post("http://localhost:5170/login-2", { 
                full_name: full_name, 
                DOB: DOB,
                passwrd: passwrd,
                // token: cookies.token
                })
                .then((response)=>{
                    console.log("Status code:", response.status);
                    console.log(response); 
                    const { token, message, login } = response.data;
                    if(response.status === 200){
                        // setCookie('token', token);
                        onLogin(token)
                        alert(message);
                        Navigation();
                        
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("Invalid Credentials")
                });
            }
        }
    }
    
    return(
        <div id="login">
           <form autoComplete="on" >
                 <span className="Alogo">
                     <video autoPlay muted loop className="Alogo">
                         <source src={Study} type="video/mp4"/>
                     </video>
                 </span>
                <h3> <span style={{color: "#ffbf00"}}>StuCo:</span> <span style={{color: "#54f7f8"}}>Study</span> <span style={{color: "#ff0000"}}>Spaces</span></h3>
                {DKuserID==false && <p className="DK" title="click here for alternate login and more info" onClick={()=> setDKuserID(true)}>Don't Know User ID? </p>}
                {DKuserID==false && <div className="cred">
                    <input id="uname" 
                    className="inputs" 
                    type="text" 
                    placeholder="User ID" 
                    onChange={(e)=> setUserID( e.target.value )}
                    />
                </div>}
                {DKuserID && <p className='l_message'> If your school is associated with us an account would have already been created with us; contact them or use alternate login. 
                On the other hand, if you have a personal account your userID is a number chosen by you on signup. If you have not made an account sign up <span><Link style={{color: "#ffbf00"}} to='/sign-up'>here</Link></span></p>}
                {DKuserID && <p className="DK" title="click here to go back to original login" onClick={()=> setDKuserID(false)}>Know User ID? </p>}
                { DKuserID && <div className="cred">
                    <input id="full_name" 
                    className="inputs" 
                    type="text" 
                    placeholder="Enter First and Last Name" 
                    onChange={(e)=> setfull_name( e.target.value )}
                    />
                </div>}
                {
                    DKuserID && <div className="cred">
                    <input id="DOB" 
                    className="inputs" 
                    type='date'
                    placeholder="Enter your Date of Birth" 
                    onChange={(e)=> setDOB( e.target.value )}
                    />
                </div>
                }
                <br/>
                <p className="DK" onClick={passwrdUnknown}>Don't Know Password?</p>
                <div className="cred">
                    <input id="pwd" 
                    type="password" 
                    className="inputs" 
                    placeholder="password" 
                    onChange={(e)=> setpasswrd(e.target.value)}
                    required/>
                </div>

                
                <button className='over' type="submit" id="login-btn" onClick={submit}>SIGN IN</button>
                <br/>
                <p className="DK" onClick={handleUserType}>Don't Have An Account?</p>

            </form>
        </div>
    );
}