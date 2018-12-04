import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import Search from '../components/Search'
import AssignStaff from '../components/AssignStaff'
import Button from '../components/Button'

export default class extends React.Component {

  state = {
    modalAssignStaff: false,
  }

  handleOpenAssignStaff = () => {
    console.log("open")
    this.setState({
      modalAssignStaff: true,
    })
  }
  handleCloseAssignStaff = () => {
    console.log("close")
    this.setState({
      modalAssignStaff: false,
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
            <Button handleClick={this.handleOpenAssignStaff} title="Cancelar reserva"/>
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