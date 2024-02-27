import axios from "axios"

//Get all directions
export const getAllWarehouses = async () => {
  try {
    const response = await axios.get("http://localhost:5000/warehouse/all")
    return response.data.warehouses
  } catch (error) {
    alert(error)
  }
}

export const addWarehouse = async (warehouse) => {
  try {
    const result = await axios.post("http://localhost:5000/warehouse/add", {
      warehouse,
    })
    return result
  } catch (error) {
    alert(error)
  }
}

export const deleteWarehouse = async (id) => {
  try {
    const result = await axios.post("http://localhost:5000/warehouse/remove", {
      id,
    })
    return result
  } catch (error) {
    alert(error)
  }
}



export const getWarehousesCapacity = async () => {
  try {
    const capacities = await axios.get(
      "http://localhost:5000/warehouse/capacity"
    )
    return capacities
  } catch (e) {
    alert(e)
  }
}

export const autofillWindows = async ({ windows, warehouse }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/warehouse/autofill",
      {
        windows,
        warehouse,
      }
    )
    return response
  } catch (error) {
    alert(error)
  }
}

export const getWindowsSet = async (setId) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/warehouse/windowsset",
      {
        id: setId,
      }
    )
    return response
  } catch (error) {
    alert(error)
  }
}
