import axios from "axios"

//Get all directions
export const getAllDirections = async () => {
  try {
    const response = await axios.get("http://localhost:5000/direction/all")
    return response.data.directions
  } catch (error) {
    alert(error)
  }
}
//Add direction
export const addDirection = async (direction) => {
  try {
    const result = await axios.post("http://localhost:5000/direction/add", {
      direction,
    })
    return result
  } catch (error) {
    alert(error)
  }
}
//Delete direction
export const deleteDirection = async (directionId) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/direction/remove",
      {
        id: directionId,
      }
    )
    return response
  } catch (error) {
    alert(error)
  }
}
