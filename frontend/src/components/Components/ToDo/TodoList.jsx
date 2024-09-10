
import React, { useState, useRef, useEffect} from 'react';
import './todo.css'
import Draggable from "react-draggable";
import deleteIcon from '../../../assets/removes.png';
import upIcon from '../../../assets/up-arrows.png';
import downIcon from '../../../assets/down-arrows.png';
import addIcon from '../../../assets/add.png';
import doneIcon from '../../../assets/check.png'
import axios from 'axios';

export default function TodoList({inputBg}){
    const [tasks, setTasks]=useState([]);
    const [newTask, setNewTask]=useState("");
    const nodeRef = React.useRef(null); //to avoid findDOM error
    // const [isDoneList, setIsDoneList]=useState([]);
    // const doneref = useRef(null)
    
    // Generate unique ID for tasks
    const generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    function handleInput(e){
        setNewTask(e.target.value)
    }

    function addTask() {
        if (newTask.trim() !== "") {
            const taskId = generateId();
            const taskContent = newTask.trim();
            
            // Send task data to backend
            axios.post('http://localhost:5170/api/add-task', { taskID: taskId, content: taskContent })
                .then(response => {
                    console.log('Task added successfully:', response.data);
                    // Update local state with the newly added task
                    setTasks(t => [...t, { taskID: taskId, content: taskContent, completed: false }]);
                })
                .catch(error => {
                    console.error('Error adding task:', error);
                });
        }
        setNewTask(""); 
    }


    function deleteTask(taskID){

        axios.post("http://localhost:5170/api/delete-task", {TaskID: taskID})
        .then(response=>{
            // console.log("task deleted sucessfully")
            const updatedTasks = tasks.filter(task => task.taskID !== taskID );
            setTasks(updatedTasks);
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    }

    const getSavedTasks=()=>{

        axios.get('http://localhost:5170/api/get-tasks')
        .then((result)=>{
            setTasks(result.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    function moveTaskUp(index){
        if(index>0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index-1]]=[updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }   
    }

    function moveTaskDown(index){
        if(index<tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // function setDone(taskID){
    //     setTasks((prevTasks)=>{
    //         const updatedTasks = prevTasks.map(task => {
    //             if (task.taskID === taskID) {
    //                 return { ...task, completed: true };
    //             }
    //             return task;
    //         });
    //         return updatedTasks;
    //     });
    // }

    useEffect(()=>{
        getSavedTasks();
    }, [])

    return(
        <Draggable
            axis="both"
            handle="#todoList"
            nodeRef={nodeRef}>    
        <div id="todoList" ref={nodeRef}>
            <div className="addToDo" 
                style={{backgroundColor: inputBg}}>
                <input type="text" id='todoInput' 
                placeholder="what is the plan for today?" 
                className="task-input" 
                value={newTask} 
                onChange={handleInput}/>
                <img src={addIcon} className="addbtn" onClick={addTask}/>
            </div>
            <ol id="todolist" style={{background: inputBg}}>
            {tasks.map((task) => 
                <li key={task.taskID} className={task.completed ? 'done' : ''}>
                    <span>{task.content}</span>
                    <img className="todoimgd" src={deleteIcon} onClick={() => deleteTask(task.taskID)}/>
                    <img className="todoimg" src={upIcon} onClick={() => moveTaskUp(task.taskID)}/>
                    <img className="todoimg" src={downIcon} onClick={() => moveTaskDown(task.taskID)}/>
                </li>
            )}

            </ol>
        </div>
        </Draggable>
    );
}
3