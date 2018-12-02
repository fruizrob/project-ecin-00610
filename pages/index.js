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
            <HeaderButton name="Realizar Reserva" rute="" />
            <HeaderButton name="Login" rute="/login" />
          </div>
          <div className="header-right">
            <HeaderButton name="Vista Usuario" rute="/user" />
            <HeaderButton name="Vista Admin" rute="/admin" />
            <a>Logo Genial</a>
          </div>
        </Header>
    
        <Home />

      </Layout>
    )
  }
}