import React, { useState, useEffect } from "react"
import "./PrintToWarehouse.css"
import { NavLink, useParams } from "react-router-dom"
import { getWindowsSet } from "../../../actions/warehouse"

function PrintToWarehouse() {
  const [data, setData] = useState({
    warehouse: null,
    windows: [],
  })
  const [loading, setLoading] = useState(false)
  let { id } = useParams()

  async function loadData() {
    setLoading(true)
    const set = await getWindowsSet(id)
    setData(set.data.set)
    setLoading(false)
  }
  let elemStyles = null
  let containerStyles = null
  useEffect(() => {
    let elem = document.getElementById("navbar")
    let container = document.getElementById("container")
    elemStyles = elem.style
    containerStyles = container.style
    if (elem) {
      elem.style.display = "none"
      container.style.width = "100%"
      container.style.left = 0
    }
    loadData()
  }, [])

  return (
    <>
      {!loading && (
        <div className='print__container'>
          <div className='print__container_info'>
            <div className='print__container_title'>
              На склад: <b>{data.warehouse}</b>
            </div>
            <div className='print__container_logo'>
              <NavLink
                to='/'
                onClick={() => {
                  let elem = document.getElementById("navbar")
                  let container = document.getElementById("container")
                  elem.style = elemStyles
                  container.style = containerStyles
                }}
              >
                <img
                  src={require("../../../assets/img/Logo_Visage.jpg")}
                  alt=''
                />
              </NavLink>
            </div>
          </div>
          <div className='print__container_table'>
            <table>
              <tr>
                <th>#</th>
                <th>Дилер</th>
                <th>Напрямок</th>
                <th>Дата готовності</th>
                <th>Опис</th>
                <th>Піраміда</th>
                <th>Комірка</th>
              </tr>
              {data.windows.map((window) => (
                <tr>
                  <td>{window.number}</td>
                  <td>{window.dealer}</td>
                  <td>{window.direction}</td>
                  <td>{window.readyDate}</td>
                  <td>{window.description}</td>
                  <td>{window.pyramid}</td>
                  <td>{window.cell}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default PrintToWarehouse
