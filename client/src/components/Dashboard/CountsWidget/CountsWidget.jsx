import React, { useEffect, useState } from "react"
import "./CountsWindget.css"
import WidgetItem from "../WidgetItem/WidgetItem"
import { getCounts } from "../../../actions/dashboard"
import BeatLoader from "react-spinners/BeatLoader"

function CountsWidget() {
  const [loading, setLoading] = useState(false)
  const [counts, setCounts] = useState({
    warehouses: null,
    dealers: null,
    users: null,
    windows: null,
    directions: null,
    factories: null,
  })

  async function loadCounts() {
    setLoading(true)
    const { data } = await getCounts()
    setCounts(data)
    setLoading(false)
  }

  useEffect(() => {
    loadCounts()
  }, [])
  
  return (
    <div className='counts-widget'>
      {loading && <BeatLoader color='#234bd5' style={{ margin: "auto" }} />}
      {!loading && (
        <>
          <WidgetItem
            icon='bx bxs-building'
            title='Склади'
            counter={counts.warehouses}
          />
          <WidgetItem
            icon='bx bx-windows'
            title='Вікна'
            counter={counts.windows}
          />
          <WidgetItem
            icon='bx bxs-user-voice'
            title='Дилери'
            counter={counts.dealers}
          />
          <WidgetItem
            icon='bx bxs-directions'
            title='Напрямки'
            counter={counts.directions}
          />
          <WidgetItem
            icon='bx bxs-user'
            title='Користувачі'
            counter={counts.users}
          />
          <WidgetItem
            icon='bx bxs-factory'
            title='Виробництва'
            counter={counts.factories}
          />

          <div
            className='counts-widget__refresh'
            onClick={async () => {
              await loadCounts()
            }}
          >
            <i class='bx bx-refresh'></i>
          </div>
        </>
      )}
    </div>
  )
}

export default CountsWidget
