import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../../../assets/app.png';
import convIcon from '../../../assets/measuring-tape.png';
import toIcon from '../../../assets/checklist.png'
import calcIcon from '../../../assets/calculator.png'
import HomeIcon from '../../../assets/home.png'
import noteIcon from '../../../assets/note.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Head0({ bg, toggleTodoList, toggleCalculator, toggleConverter, toggleNotes, loginStatus, setLoginStatus}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [spaceDropdown, openSpaceDropdown]= useState(false);
    const nav=useNavigate()


    function showMenu() {
        setIsMenuOpen(true);
    }

    function exitMenu() {
        setIsMenuOpen(false);
    }

    function studySpaceOptionsOpen(){
        openSpaceDropdown(!spaceDropdown);
    }

    return (
        <nav>
            <ul id='head0' style={{background: bg, height: "100%"}} className={isMenuOpen ? 'animated-open' : 'animated'}>
                <li><Link className='links' to='/'><img title='Login page' src={HomeIcon}/></Link></li>
                <li onClick={toggleCalculator}><Link className='links'><img title='toggle calculator' src={calcIcon}/></Link></li>
                <li onClick={toggleTodoList}><Link className='links'><img title='toggle to-do list' src={toIcon}/></Link></li>
                <li onClick={toggleConverter}><Link className='links'><img title='toggle converter' src={convIcon}/></Link></li>
                <li onClick={toggleNotes}><Link className='links'><img title='toggle Notes' src={noteIcon}/></Link></li>
                <li> <Link className='links' to='/instructions'><img title='See Guide' src={menuIcon}/></Link></li>
            </ul>
        </nav>
    );
}
