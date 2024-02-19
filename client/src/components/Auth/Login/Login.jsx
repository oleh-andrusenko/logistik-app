import React, { useContext, useState } from "react"
import Input from "../Input/Input"
import { login } from "../../../actions/user"
import { logEvent } from "../../../actions/log"
import { AuthContext } from "../../App"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { toast } from "react-toastify"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigator = useNavigate()
  const [userState, setUserState] = useContext(AuthContext)

  return (
    <div className='login'>
      <div className='login__header'>Вхід у систему Logistik</div>
      <Input
        value={username}
        setValue={setUsername}
        type='text'
        placeholder='Логін'
      />
      <Input
        value={password}
        setValue={setPassword}
        type='password'
        placeholder='Пароль'
      />

      <button
        className={
          !username && !password ? "login__submit" : "login__submit effect"
        }
        disabled={username && password ? false : true}
        onClick={async () => {
          const res = await login(username, password)
          console.log(res)
          if (res !== 400) {
            setUserState({
              username: res.user.username,
              token: res.token,
              level: res.user.privilege_level,
              isAuthenticated: true,
            })
            await logEvent(
              "AUTH",
              2,
              `User ${username} successfully logged in.`
            )
            navigator("/")
            toast.success("Авторизація успішна!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          } else
            toast.error("Невірні дані для входу!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          logEvent("AUTH", 2, `Invalid credentials for user: ${username}`)
        }}
      >
        Увійти
      </button>
    </div>
  )
}

export default Login
