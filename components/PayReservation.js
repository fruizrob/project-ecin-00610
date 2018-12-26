import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  // For para la lista de pisos
  createRows = () => {
    let rows = []

    for (let i = 0; i < 20; i++) {
      rows.push(<option key={i}> { `Piso: ${ i + 1 }` } </option>)
    }
    return rows
  }

  render(){
    const costo = 0;
    return (
      <Modal className="modal-container">
        <h2>Pagar Reserva</h2>
        <select>
          { this.createRows() }
        </select>
        <p>Costo: ${costo}</p>
        <Button handleClick={this.props.onClose} title="Pagar" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          h2, select {
            margin: 15px;
          }
        `}</style>

      </Modal>
    )
  }
}