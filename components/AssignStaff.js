import Modal from '../components/Modal'

export default class extends React.Component {
  render(){
    return (
      <Modal className="modal-container">
      
        <form action="">
          <h2>Asignar Personal</h2>
          <input />
          <select>
            <option>texto 1</option>
            <option>texto 2</option>
            <option>texto 3</option>
          </select>
          <button>Agregar</button>
        </form>

        <style jsx>{`

        `}</style>

      </Modal>
    )
  }
}