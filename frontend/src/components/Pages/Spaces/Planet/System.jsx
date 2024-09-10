import Head0 from "../../../Components/Header/Head0.jsx";
import Timer from "../../../Components/Timer/Stopwatch.jsx";
import Head1 from "../../../Components/Header/Head1.jsx";
import './System.css'
import Calculator from "../../../Components/Calculator/Calculator.jsx";
import TodoList from "../../../Components/ToDo/TodoList.jsx";
import { useState, useEffect } from "react";
import Converter from "../../../Components/Converter/Converter.jsx";
import Notes from "../../../Components/Notes/Notes.jsx";
import axios from "axios";

function System(){
    const [showTodoList, setShowTodoList] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showConverter, setShowConverter]=useState(false);
    const [showNotes, setShowNotes]=useState(false);

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

    return(
        <div className="spaces" id="main">
           <Head1/> 
           <Head0 
                toggleTodoList={() => setShowTodoList(!showTodoList)}
                toggleCalculator={() => setShowCalculator(!showCalculator)}
                toggleConverter={() => setShowConverter(!showConverter)}
                toggleNotes={()=>setShowNotes(!showNotes)}
            />
            
            {showTodoList && <TodoList inputBg='#ffc400'/>}
            {showCalculator && <Calculator buttonClassName="calcplanet"/>}
            {showConverter && <Converter bgcolor="#ffc400"/>}
            {showNotes && <Notes bg="#ffc400"/> }
            <Timer/>
            <div id="planet">
                <div id="satel"></div>
            </div>
            
        </div>
    );
}

export default System