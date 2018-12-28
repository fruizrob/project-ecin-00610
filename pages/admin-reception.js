import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import Search from '../components/Search'
import Button from '../components/Button'

//Modals
import PayReservation from '../components/PayReservation'
import EditReservation from '../components/EditReservation'
import Invoice from '../components/Invoice'
import AssignRoom from '../components/AssignRoom'
import AddConsumption from '../components/AddConsumption'

export default class extends React.Component {

  state = {
    modalPayReservation: false,
    modalEditReservation: false,
    modalInvoice: false,
    modalAddConsumption: false,
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
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/admin-reception" />
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>

        <div className="container-top">
          <h1>Reservas</h1>
          <Search />
        </div>

        <div className="container-mid">

          <div className="buttons">
            <Button handleClick={this.handlePayReservation} title="Pagar reserva" />
            <Button handleClick={this.handleEditReservation} title="Editar" />
            <Button handleClick={this.handleInvoice} title="Costo" />
            <Button handleClick={this.handleAddConsumption} title="Agregar consumo"/>
          </div>

          <ReservationGrid />
        </div>

        {
          this.state.modalAssignStaff &&
          <AssignStaff onClose={this.handleAssignStaff} />
        }

        {
          this.state.modalPayReservation &&
          <PayReservation onClose={this.handlePayReservation} />
        }

        {
          this.state.modalEditReservation &&
          <EditReservation onClose={this.handleEditReservation} />
        }

        {
          this.state.modalInvoice &&
          <Invoice costoAlojamiento={0} costoConsumo={0} onClose={this.handleInvoice} />
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