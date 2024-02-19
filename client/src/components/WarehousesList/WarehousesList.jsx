import React, { useState, useEffect } from "react"
import "./WarehousesList.css"
import { deleteWarehouse, getAllWarehouses } from "../../actions/warehouse"
import { ClipLoader } from "react-spinners"
import WarehouseModal from "../Modals/WarehouseModal/WarehouseModal"

function WarehousesList() {
  const [warehouses, setWarehouses] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const loadData = async () => {
    setWarehouses([])
    setLoading(true)
    const warehousesData = await getAllWarehouses()
    setWarehouses(warehousesData.reverse())
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='warehouse-container'>
      <h2>Склади</h2>
      <div className='warehouse__controls'>
        <div className='warehouse__count'>
          Всього складів: {warehouses.length}
        </div>

        <div className='warehouse__buttons'>
          <button
            className='warehouse__update'
            onClick={async () => {
              await loadData()
            }}
          >
            Оновити дані
          </button>
          <button
            className='warehouse__add'
            onClick={() => {
              setModal(true)
            }}
          >
            Додати склад
          </button>
        </div>
      </div>
      {!loading && (
        <table className="warehouse__table">
          <tr>
            <th>Назва</th>
            <th>Цех</th>
            <th>Пірамід</th>
            <th>Місць</th>
            <th>Вільно</th>
            <th>В</th>
            <th>Р</th>
          </tr>
          {warehouses.map((warehouse) => {
            return (
              <tr>
                <td>{warehouse.warehouse}</td>
                <td>{warehouse.factory}</td>
                <td>{warehouse.pyramids.length}</td>
                <td>{warehouse.pyramids.length * 36}</td>
                <td>{warehouse.pyramids.length * 36}</td>
                <td>
                  <a
                    onClick={async () => {
                      await deleteWarehouse(warehouse._id)
                      await loadData()
                    }}
                  >
                    <i className='bx bxs-trash'></i>
                  </a>
                </td>
                <td>
                  <a href='#'>
                    <i class='bx bxs-pencil'></i>
                  </a>
                </td>
              </tr>
            )
          })}
        </table>
      )}
     

      <WarehouseModal modal={modal} setModal={setModal} update={loadData} />
    </div>
  )
}

export default WarehousesList
