import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render(){
    return (
      <Modal className="modal-container">
        <h2>Asignar Personal<hr/></h2>
        <input />
        <select>
          <option>texto 1</option>
          <option>texto 2</option>
          <option>texto 3</option>
        </select>
        <Button handleClick={this.props.onClose} title="Agregar"/>
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          h2, input, select {
            margin: 15px;
          }
        `}</style>

      </Modal>
    )
  }
}

// #C70039 -> Rojo
// #FFC300 -> Amarrillo