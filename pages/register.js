import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderButton from '../components/HeaderButton'
import Login from '../components/Login'
import Register from '../components/Register'

export default class extends React.Component {

  state = {
    rut: '',
    name: '',
    password: '',
    direction: '',
    phone: '',
    type: 'US'
  }

  newUser = async () => {
    try {
      let form = {
        rut: this.state.rut,
        name: this.state.name,
        password: this.state.password,
        direction: this.state.direction,
        phone: this.state.phone,
        type: this.state.type
      }
  
      const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
      let data = serialize(form)
  
      fetch('/auth/register', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(() => window.location.assign('/login'));
    } catch (e) {
      console.log("Error", e)
    }
  }

  handleRut = (ev) => {
    this.setState({
      rut: ev.target.value,
    })
  }

  handleName = (ev) => {
    this.setState({
      name: ev.target.value,
    })
  }

  handlePassword = (ev) => {
    this.setState({
      password: ev.target.value,
    })
  }

  handleDirection = (ev) => {
    this.setState({
      direction: ev.target.value,
    })
  }

  handlePhone = (ev) => {
    this.setState({
      phone: ev.target.value,
    })
  }

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Realizar Reserva" rute="" />
            <HeaderButton name="Ver Reservas" rute="" />
          </div>
          <div className="header-right">
            <a>Logo Genial</a>
          </div>
        </Header>

        <Register
          handleRut = {this.handleRut}
          handleName = {this.handleName}
          handlePassword = {this.handlePassword}
          handleDirection = {this.handleDirection}
          handlePhone = {this.handlePhone}
          newUser = {this.newUser}
        />

        <style jsx>{`
        `}</style>

      </Layout>
    )
  }
}