import React, { useContext } from "react"
import "./Home.css"
import { AuthContext } from "../App"
import { NavLink } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"
function Home() {
  const [userState, setUserState] = useContext(AuthContext)

  return (
    <div className='home'>
      {!userState.isAuthenticated && (
        <div className='greeting'>
          <h1>Вітаємо у системі Logistik!</h1>
          <p>
            Для початку роботи з системою та відображення усіх функцій пройдіть
            авторизацію.
          </p>
          <NavLink to='/login' className='greeting__login'>
            Увійти
          </NavLink>
          <img
            className='greeting__image'
            src={require("../../assets/img/welcome.png")}
          />
        </div>
      )}
      {userState.isAuthenticated && <Dashboard />}
    </div>
  )
}

export default Home
