import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderButton from '../components/HeaderButton'
import RegPay from '../components/Register-Payment'

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Reservar" rute="/reserve" />
            <HeaderButton name="Ver Reservas" rute="/user-reservation" />
          </div>
          <div className="header-right">
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>

        <RegPay/>

        <style jsx>{``}</style>
        
      </Layout>
    )
  }
}