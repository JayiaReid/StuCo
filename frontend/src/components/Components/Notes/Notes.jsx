import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import axios from 'axios';
import addIcon from '../../../assets/add.png';
import deleteIcon from '../../../assets/removes.png';
import './notes.css'

export default function Notes(props) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [displayedNoteId, setDisplayedNoteId] = useState(null);
    const nodeRef = useRef(null)

    const generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    function handleInput(e) {
        setNewNote(e.target.value);
    }

    function addNote() {
        const userInput = window.prompt("Enter title for note");
        if (!userInput) return; 
        const noteId = generateId();
        const noteContent = newNote.trim();
        if (!noteContent) return; 

        axios.post('http://localhost:5170/api/add-note', {noteID: noteId, noteTitle: userInput, content: noteContent})
        .then(response=>{
            console.log("note added")
            setNotes(n => [...n, { noteID: noteId, noteTitle: userInput, content: noteContent }]);
        }).catch(error=>{
            console.log(error)
        })
        setNewNote(""); 
    }

    function deleteNote(noteID) {
        axios.post("http://localhost:5170/api/delete-note", { noteID: noteID })
            .then(response => {
                console.log("Note deleted successfully");
                const updatedNotes = notes.filter(note => note.noteID !== noteID);
                setNotes(updatedNotes);
            })
            .catch(error => {
                console.error('Error deleting note:', error);
            });
    }

    const getSavedNotes=()=>{

        axios.get('http://localhost:5170/api/get-notes')
        .then((result)=>{
            setNotes(result.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getSavedNotes();
    }, [])

    return (
        <Draggable axis="both" handle="#notes" nodeRef={nodeRef}>
            <div id="notes" ref={nodeRef} style={{height: "auto", position: "absolute"}}>
                <div className="addNote" style={{background: "none", width: "100%"}}>
                    <textarea
                        placeholder="enter note here"
                        id="noteInput"
                        className="task-input"
                        value={newNote}
                        onChange={handleInput}
                        style={{ background: props.bg, padding: "1em" }} />
                    <img style={{ position: "absolute", top: "75px", right: "15px"}} src={addIcon} className="addbtn" onClick={addNote}/>
                </div>
                <div id="noteslist" style={{height: "auto", width: "100%"}}>
                    {notes.map(note => (
                        <div style={{background: props.bg, padding: "0.5em", margin: "5px"}} key={note.noteID} onClick={() => setDisplayedNoteId(note.noteID)}>
                            <h5 style={{fontStyle: "italic"}}>{note.noteTitle}</h5>
                            {displayedNoteId === note.noteID && <p>{note.noteContent}</p>}
                            <img style={{height: "30px"}} className="noteimg" src={deleteIcon} onClick={() => deleteNote(note.noteID)}/>
                        </div>
                    ))}
                </div>
            </div>
        </Draggable>
    );
}
