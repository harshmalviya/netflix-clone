import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth } from "../firebase";
import './Menu.css'
function Menu() {
    const signOutAccountHandler = (event) => {
        auth.signOut();
      }
    return (
        <div className="menu">
            <div className="menuprofiles">
            <div className="menuitem">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                <p>User 1</p>
            </div>
            <div className="menuitem">
                <img src="https://i.imgur.com/YkyLA3e.png" alt="" />
                <p>User 2</p>
            </div>
            <div className="menuitem">
                <img src="https://i.imgur.com/yhnwhe1.png" alt="" />
                <p>Children</p>
            </div>
            <NavLink to='/users'>Manage Profiles</NavLink>
            </div>
            <div className="menulinks">
            <NavLink to='/profile'>Account</NavLink>
            <a href="http://www.netflix/helpcentre.com" target='_blank' rel="noreferrer">Help Centre</a>
            <a href="/" onClick={signOutAccountHandler}>Sign out of netflix</a>
            </div>
        </div>
    )
}

export default Menu
