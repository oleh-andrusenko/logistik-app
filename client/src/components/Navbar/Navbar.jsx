import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../App"
import "./Navbar.css"
import { logEvent } from "../../actions/log"
import NavbarItem from "../NavbarItem/NavbarItem"
function Navbar(props) {
  const logout = {
    token: null,
    username: null,
    level: null,
    isAuthenticated: false,
  }
  const [userState, setUserState] = useContext(AuthContext)
  return (
    <div className='wrapper' id='wrapper'>
      <div className='navigation' id='navbar'>
        <div className='navigation__logo'>
          <NavLink to='/'>
            <i className='bx bxs-truck'></i>
            Logistik
          </NavLink>
        </div>
        <ul className='navigation__menu'>
          <NavbarItem link='/' title='Головна' icon='bx bxs-home' />
          <NavbarItem
            link='/warehouses'
            title='Склад'
            icon='bx bxs-building-house'
          />
          <NavbarItem
            link='/outwarehouse'
            title='Виписати'
            icon='bx bxs-right-top-arrow-circle'
          />
          <NavbarItem
            link='/whcontroller'
            title='Поставити'
            icon='bx bxs-arrow-from-top'
          />
          <NavbarItem
            link='/warehousemap'
            title='Мапа складу'
            icon='bx bx-sitemap'
          />
          <NavbarItem link='/water' title='Облік води' icon='bx bx-water' />
          <NavbarItem
            link='/cartridges'
            title='Облік картриджів'
            icon='bx bxs-printer'
          />
          <NavbarItem
            link='/admin'
            title='Адміністрування'
            icon='bx bxs-terminal'
          />
          <ul className='navigation__submenu'>
            <NavbarItem
              link='/logs'
              title='Журнал подій'
              icon='bx bx-book-open'
            />
            <NavbarItem
              link='/users'
              title='Користувачі'
              icon='bx bx-list-ul'
            />
            <NavbarItem link='/' title='Налаштування' icon='bx bxs-cog' />
            <NavbarItem link='/addwindow' title='Вікна' icon='bx bx-windows' />
            <NavbarItem
              link='/directions'
              title='Напрямки'
              icon='bx bxs-directions'
            />
          </ul>
        </ul>
        {userState.isAuthenticated && (
          <div className='navigation__control'>
            <div className='navigation__user'>
              <i className='bx bxs-user'></i>
              {userState.username}
            </div>
            <div className='navigation__logout'>
              <a
                onClick={() => {
                  logEvent("AUTH", 2, `User ${userState.username} logged out!`)
                  setUserState(logout)
                  localStorage.removeItem("jwtToken")
                }}
              >
                <i className='bx bxs-log-in'></i>
                Вийти
              </a>
            </div>
          </div>
        )}
      </div>
      <div className='container' id='container'>
        {props.children}
      </div>
    </div>

    // <div className='navbar'>
    //   <div className='navbar__logo'>
    //
    //   </div>

    //   <div className='navbar__control'>
    //     {!userState.isAuthenticated && (
    //       <NavLink className='navbar__login' to='/login'>
    //         Увійти
    //       </NavLink>
    //     )}
    //     {userState.isAuthenticated && (
    //       <div className='navbar__control_item'>
    //         <i
    //           className='bx bxs-user-circle'
    //           style={{ color: "#FFF1D0", marginRight: "5px", marginTop: "5px" }}
    //         ></i>
    //         <p>{userState.username}</p>
    //       </div>
    //     )}
    //     {userState.isAuthenticated && (
    //       <div className='navbar__control_item'>
    //         <i
    //           className='bx bx-log-in'
    //           style={{ color: "#FFF1D0", marginRight: "5px", marginTop: "5px" }}
    //         ></i>
    //         <a
    //
    //         >
    //           <NavLink to='/'>Log out</NavLink>
    //         </a>
    //       </div>
    //     )}
    //   </div>
    // </div>
  )
}

export default Navbar
