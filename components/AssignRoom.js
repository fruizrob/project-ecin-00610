import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render() {
    return (
      <Modal className="modal-container">
        <h2>Asignar Habitación</h2>
        <p>Habitación</p>
        <input />
        <p>Tipo</p>
        <input />
        <input type="checkbox" />Cuna extra
        <input type="checkbox" />Niños
        <input type="checkbox" />Cama extra
        <p>Piso</p>
        <input />
        <Button handleClick={this.props.onClose} title="Asignar" />

        <style jsx>{`
          p {
            margin 2px;
          }
          h2, input {
            margin: 15px;
          }
        `}</style>

      </Modal>
    )
  }
}

// #C70039 -> Rojo
// #FFC300 -> Amarrillo