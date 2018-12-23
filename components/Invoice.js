import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render() {
    const { costoAlojamiento, costoConsumo } = this.props
    return (
      <Modal className="modal-container">
        <h2>Costo<hr/></h2>
        <p>Alojamiento: ${costoAlojamiento}</p>
        <p>Consumo: ${costoConsumo}</p>
        <p>Costo total: ${costoConsumo+costoAlojamiento}</p>
        <Button handleClick={this.props.onClose} title="Agregar" />

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