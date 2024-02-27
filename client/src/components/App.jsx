import React, { useState, useEffect } from "react"
import Navbar from "./Navbar/Navbar"
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import Registration from "./Auth/Registration/Registration"
import Login from "./Auth/Login/Login"
import Home from "./Home/Home"
import "./App.css"
import { auth } from "../actions/user"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import UsersList from "./UsersList/UsersList"
import EventList from "./EventList/EventList"
import DealersList from "./DealersList/DealersList"
import DirectionsList from "./DirectionsList/DirectionsList"
import WarehousesList from "./WarehousesList/WarehousesList"
import WidgetsPanel from "./WidgetsPanel/WidgetsPanel"
import WindowSetter from "./WindowSetter/WindowSetter"
import WarehouseMap from "./WarehouseMap/WarehouseMap"
import WindowController from "./WindowController/WindowController"
import PrintToWarehouse from "./Print/PrintToWarehouse/PrintToWarehouse"

export const AuthContext = React.createContext()
function App() {
  const [userState, setUserState] = useState({
    token: null,
    username: null,
    level: null,
    isAuthenticated: false,
  })
  async function fetchData(savedToken) {
    const data = await auth(savedToken)
    console.log(data)
    setUserState({
      token: data.token,
      username: data.user.username,
      level: data.user.privilege_level,
      isAuthenticated: true,
    })
  }
  useEffect(() => {
    const storageToken = localStorage.getItem("jwtToken")
    if (storageToken !== null) {
      fetchData(storageToken)
    }
  }, [])
  return (
    <AuthContext.Provider value={[userState, setUserState]}>
      <BrowserRouter>
        <div className='app'>
          <Navbar>
            <Routes>
              <Route path='/registration' element={<Registration />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='*' element={<WidgetsPanel />} />
              {userState.level === 15 && (
                <>
                  <Route path='/users' element={<UsersList />} />
                  <Route path='/logs' element={<EventList />} />
                  <Route path='/dealers' element={<DealersList />} />
                  <Route path='/directions' element={<DirectionsList />} />
                  <Route path='/warehouses' element={<WarehousesList />} />
                  <Route path='/towarehouse' element={<WindowSetter />} />
                  <Route path='/warehousemap' element={<WarehouseMap />} />
                  <Route path='/whcontroller' element={<WindowController />} />
                  <Route
                    path='/whcontroller/:id'
                    element={<PrintToWarehouse />}
                  />
                </>
              )}
            </Routes>
          </Navbar>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </AuthContext.Provider>
  )
}

export default App
