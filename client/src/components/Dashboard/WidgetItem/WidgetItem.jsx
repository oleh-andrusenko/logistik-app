import React from "react"
import "./WidgetItem.css"
function WidgetItem({ icon, title, counter }) {
  return (
    <div className='widget-item'>
      <i class={`${icon} widget-item__icon`}></i>
      <div>
        <p className='widget-item__title'>{title}</p>
        <p className='widget-item__counter'>{counter}</p>
      </div>
      
    </div>
  )
}

export default WidgetItem
