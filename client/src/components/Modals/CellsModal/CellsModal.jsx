import React from "react"
import "./CellsModal.css"
function CellsModal({ modal, setModal, cells }) {
  console.log(cells)
  return (
    <div>
      {modal && (
        <div className='cells-modal' onClick={() => setModal(false)}>
          <div className='cells-modal__content'>
            {cells.map((cell) => {
              return (
                <div className='cells-modal__content_cell'>
                  <p>{cell.number}</p>
                  <p>{cell.windowNumber === null ? "-" : cell.windowNumber}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CellsModal
