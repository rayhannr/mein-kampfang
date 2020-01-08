import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import './NavLinks.css'
import {AuthContext} from '../../context/auth-context'

const NavLinks = props => {
    const auth = useContext(AuthContext)

    return(
        <ul className="nav-links">
            <li><NavLink to="/" exact>All Users</NavLink></li>
            <li><NavLink to="/all-places" exact>All Places</NavLink></li>
            {auth.isLogin && <li><NavLink to={`/${auth.userId}/places`}>My Places</NavLink></li> }
            {auth.isLogin && <li><NavLink to="/places/new">Add Place</NavLink></li> }
            {!auth.isLogin && <li><NavLink to="/login">Login</NavLink></li> }
            {auth.isLogin && <li><button onClick={auth.logout}>Logout</button></li> }
        </ul>
    )
}

export default NavLinks