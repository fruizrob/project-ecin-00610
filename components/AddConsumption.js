import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render(){
    return (
      <Modal>
        <h2>Añadir consumo</h2>
        <p>Pedido</p>
        <select>
          <option>texto 1</option>
          <option>texto 2</option>
          <option>texto 3</option>
        </select>
        <p>Fecha: 08/12/2018</p>
        <Button handleClick={this.props.onClose} title="Añadir" />

        <style jsx>{`
            h2, select {
              text-align: center;
              margin: 15px;
            }
        `}</style>
      </Modal>

    )
  }
}