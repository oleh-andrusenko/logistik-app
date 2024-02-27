import axios from "axios"

export const checkHealth = async () => {
  try {
    const response = await axios.get("http://localhost:5000/dashboard/health")
    return response.data.code
  } catch (error) {
    return 400
  }
}
