import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render() {
    let costoAlojamiento = 0;
    let costoConsumo = 0;
    return (
      <Modal className="modal-container">
        <h2>Costo<hr/></h2>
        <p>Alojamiento: ${costoAlojamiento}</p>
        <p>Consumo: ${costoConsumo}</p>
        <p>Costo total: ${costoConsumo+costoAlojamiento}</p>
        <Button handleClick={this.props.onClose} title="Agregar" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          h2, input, select {
            margin: 15px;
            min-width: 200px;
          }
        `}</style>

      </Modal>
    )
  }
}

// #C70039 -> Rojo
// #FFC300 -> Amarrillo