import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render(){
    return (
      <Modal>
        <h2>Añadir consumo<hr/></h2>
        <p>Pedido:
          <select>
            <option>texto 1</option>
            <option>texto 2</option>
            <option>texto 3</option>
          </select>
        </p>
        <p>Fecha: <input type="date" /></p>
        <Button handleClick={this.props.onClose} title="Añadir" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
            h2, select {
              text-align: center;
              margin: 15px;
            }
            select{
              width: 58%;
            }
        `}</style>
      </Modal>
    )
  }
}