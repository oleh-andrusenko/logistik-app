import React, { useState } from "react"
import "./Clock.css"
import ServerCheck from "../ServerCheck/ServerCheck"
function Clock() {
  const [time, setTime] = useState()
  const [date, setDate] = useState()
  setInterval(() => {
    const now = new Date()
    setTime(now.toLocaleTimeString("ua-UK", { timezone: "GMT+2" }))
    setDate(now.toLocaleDateString("ua-UK", { timezone: "GMT+2" }))
  }, 1000)
  return (
    <div className='clock'>
      <p className='clock__time'>{time}</p>
      <p className='clock__date'>
        {date}
        <ServerCheck />
      </p>
    </div>
  )
}

export default Clock
