import Header from '../components/Header'
import Modal from '../components/Modal'
import HeaderButton from '../components/HeaderButton'
import RegPay from '../components/Register-Payment'
import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    rut: '',
    card: '',
    bank: '',
    monto: 80000,
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


  newPay = () => {
    try {
      let form = {
        rut: this.state.rut,
        card: this.state.card,
        bank: this.state.bank,
        monto: this.state.monto,
        codreserva: this.props.reservation,
      }

      console.log(form)
  
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
      <Modal>

        <RegPay
          handleRut = {this.handleRut}
          handleName = {this.handleName}
          handleCard = {this.handleCard}
          handleBank = {this.handleBank}
          canBeSubmitted = {this.canBeSubmitted}
          handlePayment = {this.props.handlePayment}
        />

        <style jsx>{``}</style>
        
      </Modal>
    )
  }
}