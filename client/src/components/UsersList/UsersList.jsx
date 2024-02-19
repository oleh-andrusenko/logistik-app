import React, { useContext, useEffect, useState } from "react"
import "./UsersList.css"
import { deleteUser, getAllUsers } from "../../actions/user"
import { logEvent } from "../../actions/log"
import { NavLink, useNavigate } from "react-router-dom"
import BeatLoader from "react-spinners/BeatLoader"
import { AuthContext } from "../App"
import { toast } from "react-toastify"
function UsersList() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [userState] = useContext(AuthContext)
  const navigator = useNavigate()

  async function loadData() {
    setUsers([])
    setLoading(true)
    const data = await getAllUsers()
    for (let i = 0; i < data.length; i++) {
      setUsers((prevState) => {
        return [
          {
            id: data[i]._id,
            username: data[i].username,
            level: data[i].privilege_level,
          },
          ...prevState,
        ]
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='userlist'>
      <h1 className='userlist__title'>Список користувачів</h1>
      <div className='userlist__control'>
        <div className='userlist__control_total'>
          <b>Всього користувачів: </b> {users.length}
        </div>
        <NavLink to='/registration' className='userlist__control_add'>
          {" "}
          + Додати{" "}
        </NavLink>
      </div>
      {users.length && (
        <table className='userlist__table'>
          <tr>
            <th>ID</th>
            <th>Ім'я користувача</th>
            <th>Рівень привілеїв</th>
            <th></th>
          </tr>

          {users.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.level}</td>
                <td>
                  <a
                    onClick={async () => {
                      const delUser = { username: user.username, id: user.id }
                      await deleteUser(user.id)
                      await logEvent(
                        "DEL",
                        2,
                        `User: ${delUser.username} with id: ${delUser.id} was deleted by ${userState.username}.`
                      )
                      await loadData()
                      toast.success(
                        `Користувача ${delUser.username} успішно видалено.`,
                        {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        }
                      )
                    }}
                  >
                    <i
                      style={{ color: "red", fontSize: 18 }}
                      className='bx bxs-trash-alt'
                    ></i>
                  </a>
                </td>
              </tr>
            )
          })}
        </table>
      )}
    </div>
  )
}

export default UsersList
