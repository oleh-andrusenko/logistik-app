import React, { useContext } from "react"
import Input from "../Input/Input"
import { useState } from "react"
import { registration } from "../../../actions/user"
import { logEvent } from "../../../actions/log"
import "./Registration.css"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"

function Registration() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [level, setLevel] = useState(3)
  const nav = useNavigate()
  const [userState, setUserState] = useContext(AuthContext)
  return (
    <div className='registration'>
      <div className='registration__header'>
        Створення нового користувача системи
      </div>
      <Input
        value={login}
        setValue={setLogin}
        type='text'
        placeholder='Логін'
      />
      <Input
        value={password}
        setValue={setPassword}
        type='password'
        placeholder='Пароль'
      />
      <select
        className='level__selector'
        defaultValue={level}
        name='privilege'
        onChange={(event) => {
          setLevel(event.target.value)
        }}
      >
        <option value='3'>Менеджер</option>
        <option value='7'>Керівник</option>
        <option value='15'>Адмінінстратор</option>
      </select>

      <button
        className='registration__submit'
        onClick={async () => {
          if (login && password && level) {
            const res = await registration(login, password, level)
            if (res.code === 201) {
              toast.success("Користувача успішно створено!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
              await logEvent(
                "REG",
                1,
                `User ${login} with privilege level ${level} successfully created by ${userState.username}.`
              )
              nav("/")
            } else {
              toast.error("Даний користувач вже існує!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            }
          } else
            toast.error("Неправильні дані!", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
        }}
      >
        Створити
      </button>
    </div>
  )
}

export default Registration
