import Modal from './Modal'
import Button from './Button'
import Input from './Input'

export default class extends React.Component {
  render() {
    return (
      <Modal className="modal-container">
        <h2>Editar</h2>
        <p>Habitacion</p>
        <input />
        <p>Tipo</p>
        <input />
        <Button handleClick={this.props.onClose} title="Editar" />

        <style jsx>{`
          h2, input {
            text-align: center;
            margin: 15px;
          }
        `}</style>

      </Modal>
    )
  }
}