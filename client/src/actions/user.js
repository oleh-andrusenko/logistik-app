import axios from "axios"

//Add user
export const registration = async (login, password, level) => {
  try {
    const response = await axios.post("http://localhost:5000/user/register", {
      username: login,
      password,
      level,
    })
    return response.data
  } catch (error) {
    alert(error)
  }
}
//Login as user
export const login = async (login, password) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      username: login,
      password,
    })
    localStorage.setItem("jwtToken", response.data.token)
    return response.data
  } catch (error) {
    return 400
  }
}
//Auth with token
export const auth = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/user/auth", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "*",
      },
    })
    localStorage.setItem("jwtToken", response.data.token)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
//Get list of users
export const getAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/user/")
    return response.data.users
  } catch (error) {
    alert(error)
  }
}
//Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.post("http://localhost:5000/user/remove", {
      id: userId,
    })
    return response
  } catch (error) {
    alert(error)
  }
}

export const getAllUsersCount = async () => {
  try {
    const response = await axios.get("http://localhost:5000/user/all")
    return response.data.users.length
  } catch (error) {
    alert(error)
  }
}
