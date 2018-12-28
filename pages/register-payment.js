import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderButton from '../components/HeaderButton'
import RegPay from '../components/Register-Payment'
import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    rut: '',
    card: '',
    bank: '',
    monto: 80000,
    codreserva: 2,
  }

  componentWillMount = () => {
    fetch('http://localhost:3000/api/userInfo')
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        if (data.user) {
          let { nompersona: name, rutpasaporte: rut, user_type_id: type } = data.user
          this.setState({
            rut: rut,
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  newPay = async () => {
    try {
      let form = {
        rut: this.state.rut,
        card: this.state.card,
        bank: this.state.bank,
        monto: this.state.monto,
        codreserva: this.state.codreserva,
      }
  
      const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
      let data = serialize(form)
  
      fetch('/api/payment', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        // .then(() => window.location.assign('/user'));
    } catch (e) {
      console.log("Error", e)
    }
  }

  handleCard = (ev) => {
    this.setState({
      card: ev.target.value,
    })
  }

  handleBank = (ev) => {
    this.setState({
      bank: ev.target.value,
    })
  }

  canBeSubmitted = () => {
    try{
      this.newPay()
      // alert('Pago exitoso!')
    }catch(e){
      console.log("Error", e)
    }
  }

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Reservar!" rute="/reserve" />
            <HeaderButton name="Mis Reservas" rute="/user" />
          </div>
          <div className="header-right">
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>

        <RegPay
          handleRut = {this.handleRut}
          handleName = {this.handleName}
          handleCard = {this.handleCard}
          handleBank = {this.handleBank}
          canBeSubmitted = {this.canBeSubmitted}
        />

        <style jsx>{``}</style>
        
      </Layout>
    )
  }
}