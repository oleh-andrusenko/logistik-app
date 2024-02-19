import axios from "axios"

export const getCounts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/dashboard/counts")
    return response
  } catch (error) {
    alert(error)
  }
}
