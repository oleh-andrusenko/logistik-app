import React, { useEffect, useState } from "react"
import "./ServerCheck.css"
import { checkHealth } from "../../../actions/health"
function ServerCheck() {
  const [server, setServer] = useState(false)

  async function check() {
    const response = await checkHealth()
    if (response === 200) {
      setServer(true)
    } else setServer(false)
  }

  useEffect(() => {
    check()
  }, [])

  setInterval(() => {
    check()
  }, 5000)
  return (
    <div className='server-check'>
      <div
        className={
          server ? "server-check__indicator" : "server-check__indicator"
        }
      >
        {server ? (
          <i class='bx bx-signal-5 green-text'></i>
        ) : (
          <i class='bx bx-no-signal red-text'></i>
        )}
      </div>
    </div>
  )
}

export default ServerCheck
