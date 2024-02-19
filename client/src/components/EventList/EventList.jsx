import React, { useState, useEffect } from "react"
import "./EventList.css"
import { getAllLogs } from "../../actions/log"
import BeatLoader from "react-spinners/BeatLoader"


function EventList() {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState([])
  useEffect(() => {
    async function fetchData() {
      const data = await getAllLogs()
      for (let i = 0; i < data.length; i++) {
        setLogs((prevState) => {
          return [
            {
              id: data[i]._id,
              timestamp: data[i].timestamp,
              type: data[i].type,
              log_level: data[i].log_level,
              message: data[i].message,
            },
            ...prevState,
          ]
        })
      }
    }
    fetchData()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className='logs'>
      <div className='logs__header'>Журнал подій</div> 
      <div className='logs__count'>Всього подій: {logs.length}</div>
      {loading ? (
        <BeatLoader className='loader' color='#074978' />
      ) : (
        <table>
          <tr>
            <th>Дата</th>
            <th>Час</th>
            <th>Тип</th>
            <th>Рівень</th>
            <th>Повідомлення</th>
          </tr>
          {logs.map(function (log) {
            return (
              <tr key={log.id}>
                <td className='center date'>{log.timestamp.split("T")[0]}</td>
                <td className='center time'>
                  {log.timestamp.split("T")[1].slice(0, -1)}
                </td>
                <td className='center type'>{log.type}</td>
                <td className='center level'>{log.log_level}</td>
                <td className='message'>{log.message}</td>
              </tr>
            )
          })}
        </table>
      )}
    </div>
  )
}

export default EventList
