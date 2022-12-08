import React from 'react'
import './Menu.css'
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className='divMenu'>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">Ingreso de Tareas</NavLink>
          </li>
          <li>
            <NavLink to="/Temporizador" exact activeClassName="active">Ingreso de Temporizadores</NavLink>
          </li>
        </ul>
    </div>
  )
}

export default Menu