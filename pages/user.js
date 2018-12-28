import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import Button from '../components/Button'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import Payment from '../components/Payment'
import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    rut: '',
    name: '',
    reservations: [],

    modalPayment: false,

    // Selected Reservation
    id: '',
    rut: '',
    start: '',
    end: '',
    type: '',
    bank: '',
    credit_card: '',
    aditional: '',
    rut_employe: '',
  }

  getReservationSelected = (cod) => {
    fetch(`/api/reservations/${cod}`)
      .then(res => res.json())
      .then(data => {
        const reservation = data.data[0]
        this.setState({
          id: reservation.codreserva,
          rut: reservation.rutpasaporte,
          start: reservation.fechainicio,
          end: reservation.fechafin,
          type: reservation.formareserva,
          bank: reservation.bancotarjetacredito,
          credit_card: reservation.numtarjetacredito,
          aditional: reservation.requerimientosadicionales,
          rut_employe: reservation.rutrecepcion,
        })
      })
  }

  componentWillMount = async () => {
    await fetch('http://localhost:3000/api/userInfo')
      .then(res => res.json())
      .then(data => {

        const { rutpasaporte, nompersona } = data.user

        this.setState({
          rut: rutpasaporte,
          name: nompersona
        })
      })
      .catch((e) => {
        console.log(e)
      })
    let rut = this.state.rut
    await fetch(`http://localhost:3000/api/reservations/user/${rut}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          reservations: data.data, // Setear Reservas del usuario
        })
      })

  }

  handlePayment = () => {
    this.setState({
      modalPayment: !this.state.modalPayment
    })
  }

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Reservar!" rute="/reserve" />
            <HeaderButton name="Mis Reservas" rute="/user" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/user" />
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout" />
          </div>
        </Header>

        <h1>Mis reservas<hr /></h1>
        <ReservationGrid getReservationSelected={this.getReservationSelected} reservations={this.state.reservations} />
        <div className="pay-button">
          <Button title="Pagar" handleClick={this.handlePayment} />
        </div>

        {
          this.state.modalPayment &&
          <Payment reservation={this.state.id} handlePayment={this.handlePayment} />
        }

        <style jsx>{`
          h1 {
            padding-left: 15px;
            padding-right: 15px;
          }
          .pay-button {
            margin-left: 15px;
            width: 20%
          }
        `}</style>
      </Layout>
    )
  }
}