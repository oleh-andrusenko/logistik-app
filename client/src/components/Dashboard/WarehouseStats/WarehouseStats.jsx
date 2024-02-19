import React, { useEffect, useState } from "react"
import { getWarehousesCapacity } from "../../../actions/warehouse"
import "./WarehouseStats.css"
import { useNavigate } from "react-router-dom"
import BeatLoader from "react-spinners/BeatLoader"
function WarehouseStats() {
  const [loading, setLoading] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const [capacity, setCapacity] = useState({
    totalAll: null,
    freeAll: null,
    percents: null,
  })

  async function loadData() {
    setLoading(true)
    let totalAll = 0
    let freeAll = 0
    const { data } = await getWarehousesCapacity()

    data.forEach((item) => {
      totalAll += item.total
      freeAll += item.free
    })
    setWarehouses(data)
    setCapacity({
      totalAll,
      freeAll,
      percents: 100 - Math.round((freeAll / totalAll) * 100),
    })
    setLoading(false)
  }
  useEffect(() => {
    loadData()
  }, [])

  const navigator = useNavigate()
  return (
    <div className={loading ? `warehouse-stats df` : "warehouse-stats"}>
      {loading && <BeatLoader color='#234bd5' />}
      {!loading && (
        <>
          <div className='warehouse-stats__chart'>
            <h4>Заповненість складів</h4>
            <div class='capacity'>
              <div className='capacity__nums'>
                <p className='capacity__nums_percents'>
                  <span
                    className={
                      capacity.percents <= 30
                        ? "green-text"
                        : capacity.percents <= 80
                        ? "orange-text"
                        : "red-text"
                    }
                  >
                    {capacity.percents}%
                  </span>
                </p>
                <p className='capacity__nums_text'>місць на складах зайнято</p>
              </div>
              <div class='capacity__line'>
                <div
                  class='capacity__line_free'
                  style={{ width: `${100-capacity.percents}%` }}
                  title={`${100-capacity.percents}%`}
                ></div>
                <div
                  class='capacity__line_loaded'
                  style={{ width: `${capacity.percents}%` }}
                  title={`${capacity.percents}%`}
                ></div>
              </div>
              <div className='capacity__description'>
                <p className='capacity__description_item'>
                  <b>Зайнято:&nbsp; </b>
                  {capacity.totalAll - capacity.freeAll}
                </p>
                <p className='capacity__description_item'>
                  <b>Вільно:&nbsp; </b> {capacity.freeAll}
                </p>
              </div>
            </div>
          </div>
          <div className='warehouse-stats__info'>
            <div className='warehouse-stats__info_list'>
              <table>
                <tr>
                  <th>Склад</th>
                  <th>Всього</th>
                  <th>Вільно</th>
                </tr>
                {warehouses.map((warehouse) => (
                  <tr>
                    <td>{warehouse.warehouse} </td>
                    <td>{warehouse.total}</td>
                    <td>{warehouse.free}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* <button onClick={() => navigator("/warehouses")}>Всі склади</button> */}
          </div>
          <div
            className='warehouse-stats__info_refresh'
            onClick={async () => {
              await loadData()
            }}
          >
            <i class='bx bx-refresh'></i>
          </div>
        </>
      )}
    </div>
  )
}

export default WarehouseStats
