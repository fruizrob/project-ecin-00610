import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Realizar Reserva" rute="/reserve" />
            <HeaderButton name="Ver Reservas" rute="/user-reservation" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/user" />
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>

        <Home />

      </Layout>
    )
  }
}