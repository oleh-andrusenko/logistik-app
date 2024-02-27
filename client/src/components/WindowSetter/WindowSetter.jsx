import React, { useState, useEffect } from "react"
import "./WindowSetter.css"
import { getAllWarehouses } from "../../actions/warehouse"
import SetWindow from "../SetWindow/SetWindow"
function WindowSetter() {
  const [loading, setLoading] = useState(true)
  const loadData = async () => {
    setLoading(true)
    const warehousesData = await getAllWarehouses()
    setWarehouses(warehousesData)
    setSelectedWarehouse(warehousesData[0])
    setLoading(false)
  }
  const handleWarehouseChange = (e) => {
    const selected = warehouses.filter(
      (warehouse) => warehouse._id === e.target.value
    )
    setSelectedWarehouse(selected[0])
  }
  const [windows, setWindows] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState()
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='setter'>
      <h3>Поставити на склад</h3>
      <div className='setter__container'>
        <div className='setter__settings'>
          <label htmlFor='warehouse'>Оберіть склад:</label>
          <select id='warehouse' onChange={handleWarehouseChange}>
            {warehouses.map((warehouse) => {
              return (
                <option value={warehouse._id}>{warehouse.warehouse}</option>
              )
            })}
          </select>
          <button disabled>Взяти дані з буферу обміну</button>
        </div>
        <SetWindow />
      </div>
    </div>
  )
}

export default WindowSetter
