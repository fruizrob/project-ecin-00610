import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import Search from '../components/Search'
import Button from '../components/Button'
import 'isomorphic-fetch';

//Modals
import AssignStaff from '../components/AssignStaff'
import PayReservation from '../components/PayReservation'
import EditReservation from '../components/EditReservation'
import Invoice from '../components/Invoice'
import AssignRoom from '../components/AssignRoom'
import AddConsumption from '../components/AddConsumption'

export default class extends React.Component {

  state = {
    // Data
    reservations: [],

    // Toggle modals
    modalAssignStaff: false,
    modalPayReservation: false,
    modalEditReservation: false,
    modalInvoice: false,
    modalAssignRoom: false,
    modalAddConsumption: false,

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

  // Obtener Reservas
  getReservations = () => {
    fetch('http://localhost:3000/api/reservations')
      .then(res => res.json())
      .then(data => {
        this.setState({
          reservations: data.data
        })
      })
      .catch(e => console.log(e))
  }



  componentDidMount = () => {
    this.getReservations()
  }

  handleAssignStaff = () => {
    this.setState({
      modalAssignStaff: !this.state.modalAssignStaff,
    })
  }
  
  handlePayReservation = () => {
    this.setState({
      modalPayReservation: !this.state.modalPayReservation,
    })
  }

  handleEditReservation = () => {
    this.setState({
      modalEditReservation: !this.state.modalEditReservation,
    })
  }

  handleInvoice = () => {
    this.setState({
      modalInvoice: !this.state.modalInvoice,
    })
  }

  handleAssignRoom = () => {
    this.setState({
      modalAssignRoom: !this.state.modalAssignRoom,
    })
  }
  
  handleAddConsumption = () => {
    this.setState({
      modalAddConsumption: !this.state.modalAddConsumption,
    })
  }

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Reporte" rute="/" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/admin" />
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>

        <div className="container-top">
          <h1>Reservas</h1>
          <Search />
        </div>

        <div className="container-mid">

          <div className="buttons">
            <Button handleClick={this.handleAssignStaff} title="Asignar Personal"/>
            <Button handleClick={this.handlePayReservation} title="Pagar reserva"/>
            <Button handleClick={this.handleEditReservation} title="Editar"/>
            <Button handleClick={this.handleInvoice} title="Costo"/>
            <Button handleClick={this.handleAddConsumption} title="Agregar consumo"/>
            <Button handleClick={this.handleAssignRoom} title="Asignar habitacion"/>
          </div>

          <ReservationGrid getReservationSelected={this.getReservationSelected} reservations={this.state.reservations} /> 
        </div>
        
        {
          this.state.modalAssignStaff &&
          <AssignStaff staff={this.state.staff} floors={this.state.floors} onClose={this.handleAssignStaff}/>
        }
        
        {
          this.state.modalPayReservation &&
          <PayReservation reservations={this.state.reservations} onClose={this.handlePayReservation}/>
        }

        {
          this.state.modalEditReservation &&
          <EditReservation onClose={this.handleEditReservation}/>
        }

        {
          this.state.modalInvoice &&
          <Invoice costoAlojamiento={0} costoConsumo={0} onClose={this.handleInvoice} />
        }

        {
          this.state.modalAssignRoom &&
          <AssignRoom onClose={this.handleAssignRoom} />
        }

        {
          this.state.modalAddConsumption && 
          <AddConsumption onClose={this.handleAddConsumption} />
        }
        

        <style jsx>{`
          .container-top  {
            padding: 0 15px;
            display: flex;
            justify-content: space-between
          }
          .container-mid {
            display: grid;
            grid-template-columns: 20% 80%;
          }
          .buttons {
            padding: 15px 0px 15px 15px;
            margin-right: 5px;
          }
        `}</style>

      </Layout>
    )
  }
}

        // #C70039 -> Rojo
        // #FFC300 -> Amarrillo