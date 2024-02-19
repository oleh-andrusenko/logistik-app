import React, { useState } from "react"
import "./OutWarehouse.css"
function OutWarehouse() {
  const [numbers, setNumbers] = useState([])
  const [range, setRange] = useState({
    from: null,
    to: null,
  })

  const handleRange = (e) => {
    const target = e.currentTarget
    setRange({
      ...range,
      [target.name]: e.target.value,
    })
  }

  const fillNumbers = (fromNum, toNum) => {
    let tmpNums = []
    console.log(numbers)
    for (fromNum; fromNum <= toNum; fromNum++) {
      if (!numbers.includes(Number(fromNum))) {
        tmpNums.push(Number(fromNum))
      }
    }
    setNumbers(numbers.concat(tmpNums))
  }
  return (
    <div className='outwarehouse__container'>
      <div className='outwarehouse__settings'>
        <div className='outwarehouse__settings_range'>
          <input type='number' name='from' id='from' onChange={handleRange} />
          <input type='number' name='to' id='to' onChange={handleRange} />
        </div>
        <p className='outwarehouse__settings_total'>Всього: {numbers.length}</p>
        <div className='outwarehouse__settings_buttons'>
          <button
            className='ouwarehouse__settings_buttons_find'
            onClick={() => fillNumbers(range.from, range.to)}
          >
            Знайти
          </button>
          <button className='ouwarehouse__settings_buttons_out'>
            Виписати
          </button>
          <button onClick={() => setNumbers([])}>Очистити</button>
        </div>
      </div>
      <div className='outwarehouse__results'>
        <div className='outwarehouse__results_cells'>
          {numbers
            .sort(function (a, b) {
              return a - b
            })
            .map((number) => (
              <div>{number}</div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default OutWarehouse
