import React, { useState, useEffect } from "react"
import "./WarehouseModal.css"
import { getAllFactories } from "../../../actions/factory"
import { addWarehouse } from "../../../actions/warehouse"
import { toast } from "react-toastify"

function WarehouseModal({ modal, setModal, update }) {
  const toastSettings = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
  const [factories, setFactories] = useState([])
  const [wh, setWh] = useState({
    warehouse: "",
    factory: null,
    count: 25,
  })
  const loadData = async () => {
    const factoriesData = await getAllFactories()
    setFactories(factoriesData)
    setWh({
      ...wh,
      factory: factoriesData[0].factory,
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  const handleNameChange = (e) => {
    setWh({ ...wh, warehouse: e.target.value })
  }
  const handleFactoryChange = (e) => {
    setWh({ ...wh, factory: e.target.value })
  }
  const handleCountChange = (e) => {
    setWh({ ...wh, count: e.target.value })
  }
  return (
    <div
      className={modal ? "warehouse__modal active" : "warehouse__modal"}
      onClick={() => {
        setModal(false)
      }}
    >
      <div
        className='warehouse__modal_content'
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Створення складу</h3>
        <label htmlFor='name'>Назва складу:</label>
        <input
          type='text'
          id='name'
          placeholder='Введіть назву складу'
          onChange={handleNameChange}
          value={wh.warehouse}
        />
        <label htmlFor='count'>Кількість пірамід:</label>{" "}
        <input
          type='number'
          defaultValue={5}
          min={5}
          max={50}
          id='count'
          placeholder='Мін. 5, макс. 50.'
          onChange={handleCountChange}
          value={wh.count}
        />
        <p className='warehouse__modal_total'>Всього місць: {wh.count * 36}</p>
        <label htmlFor='factory'>Цех:</label>
        <select id='factory' onChange={handleFactoryChange} value={wh.factory}>
          {factories.map((factory) => {
            return <option value={factory.factory}>{factory.factory}</option>
          })}
        </select>
        <button
          className='modal__add'
          onClick={async () => {
            const response = await addWarehouse(wh)
            if (response.data.code === 201) {
              toast.success(`${response.data.message}!`, toastSettings)
              update()
              setModal(false)
              setWh({
                warehouse: "",
                factory: factories[0].factory,
                count: 5,
              })
            } else {
              console.log(response)
              toast.error(`${response.data.message}!`, toastSettings)
            }
          }}
        >
          Додати
        </button>
        <button className='modal__close' onClick={() => setModal(false)}>
          X
        </button>
      </div>
    </div>
  )
}

export default WarehouseModal
