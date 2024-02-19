import React from "react"
import "./NavbarItem.css"
import { NavLink } from "react-router-dom"
function NavbarItem({ link, icon, title }) {
  return (
    <li
      className={
        link !== "/admin"
          ? "navigation__menu_item"
          : "navigation__menu_item admin"
      }
    >
      <NavLink to={link}>
        <i className={icon}></i>
        {title}
      </NavLink>
    </li>
  )
}

export default NavbarItem
