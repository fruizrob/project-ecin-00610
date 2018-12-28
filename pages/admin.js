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
    staff: [],
    floors: [],

    // Toggle modals
    modalAssignStaff: false,
    modalPayReservation: false,
    modalEditReservation: false,
    modalInvoice: false,
    modalAssignRoom: false,
    modalAddConsumption: false,
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

  // Obtener personal aseo
  getStaff = () => {
    fetch('http://localhost:3000/api/staff')
      .then(res => res.json())
      .then(data => {
        this.setState({
          staff: data.data
        })
      })
      .catch(e => console.log(e))
  }

  // Obtener los pisos
  getFloors = () => {
    fetch('http://localhost:3000/api/floors')
      .then(res => res.json())
      .then(data => {
        this.setState({
          floors: data.data
        })
      })
      .catch(e => console.log(e))
  }

  componentDidMount = () => {
    this.getReservations()
  }

  handleOpenAssignStaff = () => {
    this.getStaff()
    this.getFloors()
    this.setState({
      modalAssignStaff: true,
    })
  }
  handleCloseAssignStaff = () => {
    this.setState({
      modalAssignStaff: false,
    })
  }
  handleOpenPayReservation = () => {
    this.setState({
      modalPayReservation: true,
    })
  }
  handleClosePayReservation = () => {
    this.setState({
      modalPayReservation: false,
    })
  }
  handleOpenEditReservation = () => {
    this.setState({
      modalEditReservation: true,
    })
  }
  handleCloseEditReservation = () => {
    this.setState({
      modalEditReservation: false,
    })
  }
  handleOpenInvoice = () => {
    this.setState({
      modalInvoice: true,
    })
  }
  handleCloseInvoice = () => {
    this.setState({
      modalInvoice: false,
    })
  }

  handleOpenAssignRoom = () => {
    this.setState({
      modalAssignRoom: true,
    })
  }

  handleCloseAssignRoom = () => {
    this.setState({
      modalAssignRoom: false,
    })
  }

  handleOpenAddConsumption = () => {
    this.setState({
      modalAddConsumption: true,
    })
  }

  handleCloseAddConsumption = () => {
    this.setState({
      modalAddConsumption: false,
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
            <Button handleClick={this.handleOpenAssignStaff} title="Asignar Personal"/>
            <Button handleClick={this.handleOpenPayReservation} title="Pagar reserva"/>
            <Button handleClick={this.handleOpenEditReservation} title="Editar"/>
            <Button handleClick={this.handleOpenInvoice} title="Costo"/>
            <Button handleClick={this.handleOpenAddConsumption} title="Agregar consumo"/>
            <Button handleClick={this.handleOpenAssignRoom} title="Asignar habitacion"/>
          </div>

          <ReservationGrid reservations={this.state.reservations} /> 
        </div>
        
        {
          this.state.modalAssignStaff &&
          <AssignStaff staff={this.state.staff} floors={this.state.floors} onClose={this.handleCloseAssignStaff}/>
        }
        
        {
          this.state.modalPayReservation &&
          <PayReservation onClose={this.handleClosePayReservation}/>
        }

        {
          this.state.modalEditReservation &&
          <EditReservation onClose={this.handleCloseEditReservation}/>
        }

        {
          this.state.modalInvoice &&
          <Invoice costoAlojamiento={0} costoConsumo={0} onClose={this.handleCloseInvoice} />
        }

        {
          this.state.modalAssignRoom &&
          <AssignRoom onClose={this.handleCloseAssignRoom} />
        }

        {
          this.state.modalAddConsumption && 
          <AddConsumption onClose={this.handleCloseAddConsumption} />
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