import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import ReservationGrid from '../components/ReservationGrid'
import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    rut: '',
    name: '',
    reservations: {},
  }

  componentWillMount = async () => {
    await fetch('http://localhost:3000/api/userInfo')
      .then(res => res.json())
      .then(data => {

        const { rutpasaporte, nompersona } = data.user

        this.setState({
          rut: rutpasaporte,
          name: nompersona
        })

        console.log(this.state)
      }) 
      .catch((e) => {
        console.log(e)
      })
    await fetch(`http://localhost:3000/api/reservations/${this.state.rut}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          reservations: data.data, // Setear Reservas del usuario
        })
      })

  }

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Realizar Reserva" rute="/reserve" />
            <HeaderButton name="Ver Reserva" rute="/user-reservation" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/user" />
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>
        
        <h1>Mis reservas<hr/></h1>
        <ReservationGrid reservations={this.state.reservations} />

        <style jsx>{`
         h1 {
           padding-left: 15px;
         }
        `}</style>
      </Layout>
    )
  }
}