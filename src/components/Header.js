import React from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'


function Header() {
    const go_to_mypage= ()=> {
        
    }
    const go_to_myhome=()=> {
        
    }
    return (
        <div className='header'>
            <span className='logo'></span>
            <span className='search'>
                <input type="text" className="search_bar" onChange={ } />
                <button className='search_btn'>search</button>
            </span>
            <span className='nav_bar'>
                <FontAwesomeIcon className='mypage_btn' icon={ } onClick={go_to_mypage}/>
                <FontAwesomeIcon className='myhome_btn' icon={ } onClick={go_to_myhome} />
                <FontAwesomeIcon className='logout_btn' icon={ } />
                
            </span>
        </div>
    )
}

export default Header
