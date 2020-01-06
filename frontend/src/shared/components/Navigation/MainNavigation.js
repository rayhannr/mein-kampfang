import  React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './MainNavigation.css'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UI/Backdrop'

const MainNavigation = props => {
    const [drawerVisible, setDrawerVisible] = useState(false)

    const openDrawer = () => {
        setDrawerVisible(true)
    }

    const closeDrawer = () => {
        setDrawerVisible(false)
    }

    return(
        <React.Fragment>
            { drawerVisible && <Backdrop onClick={closeDrawer} /> }
            <SideDrawer show={drawerVisible} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h2 className="main-navigation__title">
                    <Link to="/">MeinKampfang</Link>
                </h2>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation
