import React, { useEffect, useState } from "react"
import "./UserStats.css"
import { getAllUsersCount } from "../../../actions/user"
import BeatLoader from "react-spinners/BeatLoader"
import { useNavigate } from "react-router-dom"

function UserStats() {
  const [users, setUsers] = useState(0)
  const [loading, setLoading] = useState(false)
  async function loadData() {
    setLoading(true)
    const count = await getAllUsersCount()
    setUsers(count)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])
  const navigator = useNavigate()
  return (
    <div className={loading ? `user-stats df` : "user-stats"}>
      {loading && <BeatLoader color='#234bd5' />}
      {!loading && (
        <>
          <div className='user-stats__icon' onClick={() => navigator("/users")}>
            <div>
              <i class='bx bxs-user'></i>
              <i class='bx bx-list-ul'></i>
            </div>
          </div>
          <div className='user-stats__info'>
            <p className='user-stats__info_title'>Користувачів</p>
            <p className='user-stats__info_count'>{users}</p>
          </div>
          <div
            className='user-stats__info_refresh'
            onClick={async () => await loadData()}
          >
            <i class='bx bx-refresh'></i>
          </div>
        </>
      )}
    </div>
  )
}

export default UserStats
