import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import Search from '../components/Search'
import Button from '../components/Button'

//Modals
import AssignStaff from '../components/AssignStaff'
import PayReservation from '../components/PayReservation'

export default class extends React.Component {

  state = {
    modalAssignStaff: false,
    modalPayReservation: false,
  }

  handleOpenAssignStaff = () => {
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

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
          <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Personal de Aaseo" rute="" />
            <HeaderButton name="Reporte" rute="" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/admin" />
            <a>Logo Genial</a>
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
            <Button handleClick={this.handleOpenAssignStaff} title="Editar"/>
            <Button handleClick={this.handleOpenAssignStaff} title="Costo"/>
            <Button handleClick={this.handleOpenAssignStaff} title="Agregar consumo"/>
            <Button handleClick={this.handleOpenAssignStaff} title="Asignar habitacion"/>
          </div>

          <ReservationGrid /> 
        </div>
        
        {
          this.state.modalAssignStaff &&
          <AssignStaff onClose={this.handleCloseAssignStaff}/>
        }
        
        {
          this.state.modalPayReservation &&
          <PayReservation onClose={this.handleClosePayReservation}/>
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