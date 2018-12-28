import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {

  state = {
    reservation: '',
  }

  handlePay = () => {
    const form = {
      codreserva: this.state.reservation
    }

    const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
    let data = serialize(form)

    fetch(`/api/payment/admin`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(() => this.props.onClose());
  }

  handleReservation = (ev) => {
    this.setState({
      reservation: ev.target.value,
    }) 
  }

  render(){
    const { reservations } = this.props

    return (
      <Modal className="modal-container">
        <h2>Pagar Reserva</h2>
        <select onChange={this.handleReservation}>
          {
            reservations &&
            reservations.map(reservation => {
              return <option value={reservation.codreserva} key={reservation.codreserva}>{reservation.codreserva}</option>
            })
          }
        </select>
        <Button handleClick={this.handlePay} title="Pagar" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          select {
            margin-bottom: 20px;
          }
        `}</style>

      </Modal>
    )
  }
}