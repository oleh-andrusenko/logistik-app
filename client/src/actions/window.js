import axios from "axios"

export const setInWarehouse = async (window) => {
  try {
    const response = axios.post("http://localhost:5000/window/set", window)
    return response
  } catch (error) {
    alert(error)
  }
}
