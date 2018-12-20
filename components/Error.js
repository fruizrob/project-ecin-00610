import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {
  render(){
    return (
      <Modal className="modal-container">
        <h2>Error</h2>
        <p>Tipo error</p>
        <Button handleClick={this.props.onClose} title="Cerrar"/>

        <style jsx>{`
          h2, input, select {
            margin: 15px;
            min-width: 150px;
          }
        `}</style>

      </Modal>
    )
  }
}