import React, { useState, useEffect } from "react"
import "./SetWindow.css"
import { getAllWarehouses } from "../../actions/warehouse"
import { getAllDealers } from "../../actions/dealer"
import { getAllDirections } from "../../actions/direction"
import { setInWarehouse } from "../../actions/window"

function SetWindow() {
  const [max, setMax] = useState()
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState({
    dealers: [],
    directions: [],
    warehouses: [],
  })
  const [window, setWindow] = useState({
    warehouse: null,
    dealer: null,
    direction: null,
    number: null,
    description: "",
    pyramid: null,
    cell: null,
  })
  
  async function loadOptions() {
    setLoading(true)
    const warehousesData = await getAllWarehouses()
    const dealersData = await getAllDealers()
    const directionsData = await getAllDirections()
    setOptions({
      dealers: dealersData,
      warehouses: warehousesData,
      directions: directionsData,
    })
    setLoading(false)
    setWindow({
      warehouse: warehousesData[0].warehouse,
      dealer: dealersData[0].dealer,
      direction: directionsData[0].direction,
    })
    setMax(warehousesData[0].pyramids.length)
  }

  function handleChanges(e) {
    const target = e.currentTarget
    setWindow({
      ...window,
      [target.name]: target.value,
    })
    if (target.name === "warehouse") {
      setMax(
        options.warehouses.filter(
          (warehouse) => warehouse.warehouse === target.value
        )[0].pyramids.length
      )
    }
  }
  useEffect(() => {
    loadOptions()
  }, [])
  return (
    <>
      {!loading && (
        <div className='setform'>
          <select id='warehouse' name='warehouse' onChange={handleChanges}>
            {options.warehouses.map((warehouse) => {
              return (
                <option value={warehouse.warehouse}>
                  {warehouse.warehouse}
                </option>
              )
            })}
          </select>
          <select id='dealer' name='dealer' onChange={handleChanges}>
            {options.dealers.map((dealer) => {
              return <option value={dealer.dealer}>{dealer.dealer}</option>
            })}
          </select>
          <select id='direction' name='direction' onChange={handleChanges}>
            {options.directions.map((direction) => {
              return (
                <option value={direction.direction}>
                  {direction.direction}
                </option>
              )
            })}
          </select>
          <input
            type='number'
            id='window'
            name='number'
            placeholder='Номер вікна'
            onChange={handleChanges}
          />
          <input
            type='number'
            id='pyramid'
            name='pyramid'
            onChange={handleChanges}
            min={1}
            max={max}
            placeholder={`Номер піраміди 1-${max}`}
          />
          <input
            type='number'
            name='cell'
            id='cell'
            min={1}
            onChange={handleChanges}
            max={36}
            placeholder='Номер комірки (1-36)'
          />
          <input
            type='text'
            name='description'
            placeholder='Опис'
            onChange={handleChanges}
          />
          <button
            onClick={async () => {
              const response = await setInWarehouse(window)
              alert(response.data.code)
            }}
          >
            Поставити
          </button>
        </div>
      )}
    </>
  )
}

export default SetWindow
