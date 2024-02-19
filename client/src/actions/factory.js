import axios from "axios"

export const getAllFactories = async () => {
  try {
    const response = await axios.get("http://localhost:5000/factory/all")
    return response.data.factories
  } catch (error) {
    alert(error)
  }
}