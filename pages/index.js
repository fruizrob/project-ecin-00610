import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import 'isomorphic-fetch'

export default class extends React.Component {

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Realizar Reserva" rute="/reserve" />
            <HeaderButton name="Login" rute="/login"/>
            <HeaderButton name="Servicios extra" rute="/restaurant-spa" />
          </div>
          <div className="header-right">
            <HeaderButton name="Vista Usuario" rute="/user" />
            <HeaderButton name="Vista Admin" rute="/admin" />
            <a>Logo Genial</a>
          </div>
        </Header>
    
        <button title="Click" onClick={this.submitTest} /> 
        <Home />

      </Layout>
    )
  }
}