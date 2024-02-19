import axios from "axios"

//Log the event
export const logEvent = async (type, level, message) => {
  try {
    await axios.post("http://localhost:5000/log/add", {
      type,
      log_level: level,
      message,
    })
  } catch (error) {
    alert(error)
  }
}
//Get all logs
export const getAllLogs = async () => {
  try {
    const response = await axios.get("http://localhost:5000/log/all")
    return response.data.logs
  } catch (error) {
    alert(error)
  }
}
