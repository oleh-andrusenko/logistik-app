import React, { useState, createContext, useEffect } from "react"
import "./WindowController.css"
import Tab from "./Tab/Tab"
import DataPrepare from "./DataPrepare/DataPrepare"
import ToWarehouse from "./ToWarehouse/ToWarehouse"
import OutWarehouse from "./OutWarehouse/OutWarehouse"
export const WindowsContext = createContext()
function WindowController() {
  const [tab, setTab] = useState(0)
  const [windows, setWindows] = useState([])

  return (
    <WindowsContext.Provider value={[windows, setWindows]}>
      <div className='window-controller'>
        <div className='window-controller__title'>
          <h3>Керування вікнами</h3>
        </div>
        <div className='window-controller__tabs'>
          <Tab tab={tab} tabNum={0} setTab={setTab}>
            Підготовка даних
          </Tab>
          <Tab tab={tab} tabNum={1} setTab={setTab}>
            Поставити на склад
          </Tab>
          <Tab tab={tab} tabNum={2} setTab={setTab}>
            Виписати зі складу
          </Tab>
        </div>
        <div className='window-controller__content'>
          {tab === 0 && <DataPrepare />}
          {tab === 1 && <ToWarehouse />}
          {tab === 2 && <OutWarehouse />}
        </div>
      </div>
    </WindowsContext.Provider>
  )
}

export default WindowController
