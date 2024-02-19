import React, { useState, useEffect, useContext } from "react"
import "./DealersList.css"
import { addDealer, deleteDealer, getAllDealers } from "../../actions/dealer"
import { logEvent } from "../../actions/log"
import { toast } from "react-toastify"
import { AuthContext } from "../App"
function DealersList() {
  const [userState] = useContext(AuthContext)
  const [dealers, setDealers] = useState([])
  const [dealer, setDealer] = useState()
  const [shown, setShown] = useState(false)
  async function loadData() {
    setDealers([])
    const data = await getAllDealers()
    for (let i = 0; i < data.length; i++) {
      setDealers((prevState) => {
        return [
          {
            id: data[i]._id,
            dealer: data[i].dealer,
          },
          ...prevState,
        ]
      })
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <div className='dealers'>
      <div className='dealers__header'>Список дилерів</div>
      <div className='dealers__info'>
        <div className='dealers__count'>Всього дилерів: {dealers.length}</div>
        {!shown ? (
          <button
            className='dealers__add btn-add'
            onClick={() => {
              setShown(true)
            }}
          >
            Додати дилера
          </button>
        ) : (
          <div className='dealers__addform'>
            <input
              type='text'
              placeholder='Дилер'
              className='dealers_input'
              onChange={(event) => {
                setDealer(event.target.value)
              }}
            />
            <button
              className='btn-add'
              onClick={async () => {
                const resp = await addDealer(dealer)
                console.log(resp)
                if (resp.status === 200) {
                  setShown(false)
                  toast.success("Дилера успішно додано", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  })
                  loadData()
                } else {
                  toast.error(
                    "Сталася якась помилка! Перевірте дані та повторіть спробу!",
                    {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    }
                  )
                }
              }}
            >
              +
            </button>
            <div
              className='close-btn'
              onClick={() => {
                setShown(false)
              }}
            >
              x
            </div>
          </div>
        )}
      </div>

      <table>
        <tr>
          <th>ID</th>
          <th>Дилер</th>
          <th></th>
        </tr>
        {dealers.map(function (dealer) {
          return (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td>{dealer.dealer}</td>
              <td>
                <a
                  onClick={async () => {
                    const dealerId = dealer.id
                    await deleteDealer(dealerId)
                    await logEvent(
                      "DEL",
                      2,
                      `Dealer: ${dealer.dealer} with id: ${dealer.id} was deleted by ${userState.username}.`
                    )
                    loadData()
                    toast.success(`Дилера ${dealer.dealer} успішно видалено.`, {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    })
                  }}
                >
                  <i style={{ color: "red" }} className='bx bxs-trash-alt'></i>
                </a>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default DealersList
