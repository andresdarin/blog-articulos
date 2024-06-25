import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <header className="header" >
            <NavLink to="/inicio">
                <h1 className='T1'>Travel</h1>
            </NavLink>
            <h3 className='T2'>✈</h3>
        </header>
    )
}
