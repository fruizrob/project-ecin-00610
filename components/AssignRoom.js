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

  render() {
    return (
      <Modal className="modal-container">

        <h2>Asignar Habitación<hr/></h2>
        <p>Habitación <input /></p>
        <p>Tipo <input /></p>
        <p><input type="checkbox" /> - Cuna extra</p>
        <p><input type="checkbox" /> - Niños</p>
        <p><input type="checkbox" /> - Cama extra</p>
        <select> { this.createRows() } </select>
        <br/>
        
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