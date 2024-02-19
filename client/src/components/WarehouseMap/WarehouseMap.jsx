import React, { useState, useEffect } from "react"
import "./WarehouseMap.css"
import { getAllWarehouses } from "../../actions/warehouse"
import CellsModal from "../Modals/CellsModal/CellsModal"
function WarehouseMap() {
  const [shown, setShown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCells, setSelectedCells] = useState([])
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
  const [warehouses, setWarehouses] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState()
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='map'>
      <h2>Мапа складу</h2>
      <div className='map__settings'>
        <label htmlFor='warehouse'>Оберіть склад:</label>
        <select id='warehouse' onChange={handleWarehouseChange}>
          {warehouses.map((warehouse) => {
            return <option value={warehouse._id}>{warehouse.warehouse}</option>
          })}
        </select>
      </div>
      {!loading && (
        <div className='map__pyramids'>
          {selectedWarehouse.pyramids.map((pyramid) => {
            const nonNullable = pyramid.cells.filter((cell) =>
              Object.values(cell).includes(null)
            )
            return (
              <div
                className='map__pyramids_item'
                onClick={() => {
                  setSelectedCells(pyramid.cells)
                  setShown(true)
                }}
              >
                <p className='map__pyramids_item_number'>{pyramid.number}</p>
                <p className='map__pyramids_item_free'>
                  Вільно: {nonNullable.length}
                </p>
                <p className='map__pyramids_item_window'>
                  Всього: {pyramid.cells.length}
                </p>
              </div>
            )
          })}

          <CellsModal modal={shown} setModal={setShown} cells={selectedCells} />
        </div>
      )}
    </div>
  )
}

export default WarehouseMap
