import React, { useContext, useState, useEffect } from "react"
import "./DataPrepare.css"
import { WindowsContext } from "../WindowController"
function DataPrepare() {
  const [isDataCorrect, setIsDataCorrect] = useState(false)
  const [show, setShow] = useState(false)
  const [windows, setWindows] = useContext(WindowsContext)

  useEffect(() => {
    setWindows(windows)
    windows.length ? setIsDataCorrect(true) : setIsDataCorrect(false)
  }, [])

  const prepareData = async () => {
    try {
      setIsDataCorrect(false)
      const clipboardData = await navigator.clipboard.readText()
      const d = clipboardData.split("\r\n")

      let tmp = []
      for (let i = 0; i < d.length - 1; i++) {
        let t = d[i].split("\t")
        if (t.length === 5) {
          if (t[0].includes("-")) {
            const firstNum = Number(t[0].split("-")[0])
            const lastNum = Number(t[0].split("-")[1])
            for (let i = firstNum; i <= lastNum; i++) {
              tmp.push({
                number: i,
                dealer: t[2],
                direction: t[1],
                readyDate: t[3].split(".").join("-"),
                description: t[4],
              })
            }
          } else {
            tmp.push({
              number: Number(t[0]),
              dealer: t[2],
              direction: t[1],
              readyDate: t[3].split(".").join("-"),
              description: t[4],
            })
          }
          setWindows(tmp)
          setIsDataCorrect(true)
        } else {
          alert("Неправильний формат даних!")
          setWindows([])
          setIsDataCorrect(false)
          return
        }
      }
    } catch (e) {
      alert(e)
      setIsDataCorrect(false)
    }
  }

  return (
    <div className='prepare-data__container'>
      <div className='prepare-data__buttons'>
        <button
          className='prepare-data__button'
          onClick={async () => await prepareData()}
        >
          Взяти дані з буферу обміну
        </button>
        <button
          disabled={!isDataCorrect ? "disabled" : ""}
          className='prepare-data__viewbutton'
          onClick={() => setShow(!show)}
        >
          Переглянути дані
        </button>

        <button
          disabled={!isDataCorrect ? "disabled" : ""}
          className='prepare-data__clear'
          onClick={() => {
            setShow(false)
            setIsDataCorrect(false)
            setWindows([])
          }}
        >
          Очистити
        </button>
        <div className='prepare-data__guide'>
          Для коректної роботи системи необхідно виконати попередню обробку
          даних. Для цього:
          <ol>
            <li>
              Виділіть необхідні клітинки у таблиці об'ємів та скопіюйте їх.
              Число стовпців має бути рівним 5!
            </li>
            <li>
              Натисніть кнопку взяти дані з буферу обміну та переконайтеся, що
              на екран не з'явилися помилки.
            </li>
            <li>
              Після того як дані будуть оброблені кнопка перегляду стане
              активною.
            </li>
          </ol>
        </div>
      </div>

      <div className='prepare-data__preview'>
        {show ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Напрямок</th>
                <th>Дилер</th>
                <th>Дата готовності</th>
                <th>Опис</th>
              </tr>
            </thead>
            {windows.map((window) => {
              return (
                <tr>
                  <td>{window.number}</td>
                  <td>{window.direction}</td>
                  <td>{window.dealer}</td>
                  <td>{window.readyDate}</td>
                  <td>{window.description}</td>
                </tr>
              )
            })}
          </table>
        ) : (
          <p className='prepare-data__empty'>
            Для передогляду даних виконайте попередню їх обробку та натисність
            відповідну кнопку...
          </p>
        )}
      </div>
    </div>
  )
}

export default DataPrepare
