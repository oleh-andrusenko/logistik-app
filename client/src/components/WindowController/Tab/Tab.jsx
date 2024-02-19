import React, { useContext } from "react"
import "./Tab.css"
import { WindowsContext } from "../WindowController"
function Tab({ tab, tabNum, setTab, children }) {
  const [windows] = useContext(WindowsContext)
  return (
    <button
      className={
        tab === tabNum
          ? "window-controller__tabs_tab active"
          : "window-controller__tabs_tab"
      }
      disabled={tabNum === 1 && windows.length === 0 ? "disabled" : ""}
      onClick={() => setTab(tabNum)}
    >
      {children}
    </button>
  )
}

export default Tab
