import React, { useState, useEffect } from "react"
import "./WindowSetter.css"
import {
  clearWarehouse,
  getAllWarehouses,
  randomFill,
} from "../../actions/warehouse"
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
          <button
            disabled
            // onClick={async () => {
            //   try {
            //     const clipboardData = await navigator.clipboard.readText()
            //     const d = clipboardData.split("\\\\r\\\\n")
            //     console.log(d)
            //     let tmp = []
            //     for (let i = 0; i < d.length; i++) {
            //       tmp.push(JSON.parse(d[i]))
            //     }
            //     setWindows(tmp)
            //   } catch (e) {
            //     alert(e)
            //   }
            // }}
          >
            Взяти дані з буферу обміну
          </button>
          <button
            onClick={async () => {
              const res = await randomFill(selectedWarehouse.warehouse)
              console.log(res)
            }}
          >
            Заповнити
          </button>
          <button
            onClick={async () => {
              await clearWarehouse(selectedWarehouse.warehouse)
            }}
          >
            Очистити
          </button>
        </div>
        <SetWindow />
      </div>
    </div>
  )
}

export default WindowSetter
