import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Realizar Reserva" rute="" />
            <HeaderButton name="Ver Reserva" rute="" />
            <HeaderButton name="Login" rute="/login" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/user" />
            <a>Logo Genial</a>
          </div>
        </Header>
        
        <h1>Mis reservas<hr/></h1>
        <ReservationGrid />

        <style jsx>{`
         h1 {
           padding-left: 15px;
         }
        `}</style>
      </Layout>
    )
  }
}