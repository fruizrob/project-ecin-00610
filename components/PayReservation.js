import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render(){
    const costo = 0;
    return (
      <Modal className="modal-container">
        <h2>Pagar Reserva</h2>
        <select>
          <option>texto 1</option>
          <option>texto 2</option>
          <option>texto 3</option>
        </select>
        <p>Costo: ${costo}</p>
        <Button handleClick={this.props.onClose} title="Pagar" />

        <style jsx>{`
          h2, select {
            margin: 15px;
          }
        `}</style>

      </Modal>
    )
  }
}