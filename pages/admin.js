import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import Search from '../components/Search'
import AssignStaff from '../components/AssignStaff'

export default class extends React.Component {

  state = {
    modalAssignStaff: false,
  }

  handleOpenAssignStaff = () => {
    console.log("work")
    this.setState({
      modalAssignStaff: true,
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

        <div className="container">
          <h1>Reservas</h1>
          <Search />
        </div>

        <ReservationGrid /> 

        <button onClick={this.handleOpenAssignStaff}>Asignar Personal</button>
        
        {
          this.state.modalAssignStaff &&
          <AssignStaff />
        }
        

        <style jsx>{`
          .container  {
            padding: 0 15px;
            display: flex;
            justify-content: space-between
          }
        `}</style>

      </Layout>
    )
  }
}