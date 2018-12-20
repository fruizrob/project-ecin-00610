import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderButton from '../components/HeaderButton'
import Button from '../components/Button'
import Reserve from '../components/Reserve'

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
            <a>Logo Genial</a>
          </div>
        </Header>

        <Reserve />

        <style jsx>{``}</style>
        
      </Layout>
    )
  }
}