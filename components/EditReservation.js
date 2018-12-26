import Modal from './Modal'
import Button from './Button'
import Input from './Input'

export default class extends React.Component {
  render() {
    return (
      <Modal className="modal-container">
        <h2>Editar<hr/></h2>
        <p>Habitacion <input /></p>
        <p>Tipo <input /></p>
        <Button handleClick={this.props.onClose} title="Editar" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          input {
            width: 50%;
          }
          h2{
            text-align: center;
            margin: 15px;
            width: 90%;
          }
        `}</style>

      </Modal>
    )
  }
}