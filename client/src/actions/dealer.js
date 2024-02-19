import axios from "axios"

//Get all dealers
export const getAllDealers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/dealer/all")
    return response.data.dealers
  } catch (error) {
    alert(error)
  }
}
//Add dealer
export const addDealer = async (dealer) => {
  try {
    const result = await axios.post("http://localhost:5000/dealer/add", {
      dealer,
    })
    return result
  } catch (error) {
    alert(error)
  }
}
//Delete dealer
export const deleteDealer = async (dealerId) => {
  try {
    const response = await axios.post("http://localhost:5000/dealer/remove", {
      id: dealerId,
    })
    return response
  } catch (error) {
    alert(error)
  }
}
