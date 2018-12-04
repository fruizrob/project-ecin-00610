import Modal from '../components/Modal'

export default class extends React.Component {
  render(){
    return (
      <Modal className="modal-container">
        <h2>Asignar Personal</h2>
        <input />
        <select>
          <option>texto 1</option>
          <option>texto 2</option>
          <option>texto 3</option>
        </select>
        <button onClick={this.props.onClose}>Agregar</button>

        <style jsx>{`

        `}</style>

      </Modal>
    )
  }
}

// #C70039 -> Rojo
// #FFC300 -> Amarrillo