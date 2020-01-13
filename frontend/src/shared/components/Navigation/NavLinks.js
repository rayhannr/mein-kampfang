import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import Toggle from 'react-toggle'
import './Toggler.css'
import './NavLinks.css'
import {AuthContext} from '../../context/auth-context'
import {ThemeContext} from '../../context/theme-context'

const NavLinks = props => {
    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)

    return(
        <ul className="nav-links">
            <li><NavLink to="/" exact>All Places</NavLink></li>
            <li><NavLink to="/all-users" exact>All Users</NavLink></li>
            {auth.isLogin && <li><NavLink to={`/${auth.userId}/places`}>My Places</NavLink></li> }
            {auth.isLogin && <li><NavLink to="/places/new">Add Place</NavLink></li> }
            {!auth.isLogin && <li><NavLink to="/login">Login</NavLink></li> }
            {auth.isLogin && <li><button onClick={auth.logout}>Logout</button></li> }
            <li><div className="toggle-button"><Toggle className="react-toggle" checked={theme.isDark} onChange={theme.themeChanger} /><span>Dark</span></div></li>
        </ul>
    )
}

export default NavLinks