import React, { useContext, useEffect, useState } from "react"
import { WindowsContext } from "../WindowController"
import "./ToWarehouse.css"
import {
  getWarehousesCapacity,
  autofillWindows,
  getWindowsSet,
} from "../../../actions/warehouse"
import { useNavigate } from "react-router-dom"
function ToWarehouse() {
  const [windows, setWindows] = useContext(WindowsContext)
  const [warehouses, setWarehouses] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    warehouse: "",
    total: 0,
    free: 0,
  })
  const [loading, setLoading] = useState(false)
  const [doneWindows, setDoneWindows] = useState([])
  const [processing, setProcessing] = useState(false)
  const [printLink, setPrintLink] = useState("")
  const navigator = useNavigate()
  async function loadData() {
    setLoading(true)
    const { data } = await getWarehousesCapacity()
    setWarehouses(data)
    setSelectedWarehouse(data[0])
    setLoading(false)
  }
  useEffect(() => {
    setDoneWindows([])
    loadData()
  }, [])

  function handleWarehouseChange(e) {
    e.preventDefault()
    setDoneWindows([])
    const filtered = warehouses.filter(
      (warehouse) => warehouse.warehouse === e.target.value
    )
    setSelectedWarehouse(filtered[0])
  }

  return (
    <div className='autoset__container'>
      <div className='autoset__settings'>
        <h3 className='autoset__settings_title'>
          Автопостановка вікон на склад
        </h3>
        <div className='autoset__settings_select'>
          <div>
            <label htmlFor='autosetWarehouse'>Склад:</label>
            <select
              id='autosetWarehouse'
              className='autoset__settings_warehouse'
              onChange={handleWarehouseChange}
              value={selectedWarehouse.warehouse}
            >
              {warehouses.map((warehouse) => {
                return (
                  <option key={warehouse.warehouse} value={warehouse.warehouse}>
                    {warehouse.warehouse}
                  </option>
                )
              })}
            </select>
          </div>
          {!loading && (
            <div className='autoset__settings_free'>
              <p>{selectedWarehouse.free}</p>
              <p
                className={
                  windows.length <= selectedWarehouse.free ? "green" : "red"
                }
              >
                {windows.length}
              </p>
            </div>
          )}
        </div>
        <button
          disabled={windows.length <= selectedWarehouse.free ? "" : "disabled"}
          className='autoset__settings_save'
          onClick={async () => {
            setDoneWindows([])
            setProcessing(true)
            const data = await autofillWindows({
              windows,
              warehouse: selectedWarehouse.warehouse,
            })
            setDoneWindows(data.data.resultArray)
            setPrintLink(data.data.id)
            setProcessing(false)
            await loadData()
          }}
        >
          Поставити
        </button>

        <button
          disabled={doneWindows.length !== 0 ? "" : "disabled"}
          onClick={() => {
            navigator(`/whcontroller/${printLink}`)
          }}
          className={"autoset__settings_print"}
        >
          Друкувати папери на склад
        </button>
        
      </div>
      <div className='autoset__preview'>
        {processing && (
          <div className='autoset__preview_loader'>Постановка на склад</div>
        )}
        {doneWindows.length !== 0 && (
          <table className='autoset__preview_table' id='printable'>
            <tr>
              <th>#</th>
              <th>Дилер</th>
              <th>Напрямок</th>
              <th>Дата готовності</th>
              <th>Опис</th>
              <th>Піраміда</th>
              <th>Комірка</th>
            </tr>
            {doneWindows.map((doneWindow) => (
              <tr>
                <td>{doneWindow.number}</td>
                <td>{doneWindow.dealer}</td>
                <td>{doneWindow.direction}</td>
                <td>{doneWindow.readyDate}</td>
                <td>{doneWindow.description}</td>
                <td>{doneWindow.pyramid}</td>
                <td>{doneWindow.cell}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  )
}

export default ToWarehouse
