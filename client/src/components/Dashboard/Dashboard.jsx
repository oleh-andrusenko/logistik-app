import React from "react"
import "./Dashboard.css"
import Clock from "./Clock/Clock"
import WarehouseStats from "./WarehouseStats/WarehouseStats"

import CountsWidget from "./CountsWidget/CountsWidget"
function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <h3 className='dashboard__header_title'>Інформаційна панель</h3>
        <Clock />
      </div>
      <div className='dashboard__content'>
        <WarehouseStats />
        <CountsWidget />
      </div>
    </div>
  )
}

export default Dashboard
