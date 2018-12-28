import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {

  state = {
      consumptions: '',
      consumption: ''
    }

  componentWillMount = () => {
    fetch('http://localhost:3000/api/consumptions')
      .then(res => res.json())
      .then(data => {
        this.setState({
          consumptions: data.data
        })
      })
      .catch(e => console.log(e))
  }

  handleConsumption = (ev) => {
    this.setState({
      consumption: ev.target.value,
    })
  }

  newConsumption = () => {
    if(this.state.consumption){
      if(this.props.codreserva){
        let form = {
          consumption: this.state.consumption,
          rut: this.props.rut,
          codreserva: this.props.codreserva,
        }

        const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
        let data = serialize(form)

        fetch('/api/consumption', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(() => this.props.onClose());
        }else{
          alert('Faltó seleccionar una reserva')
        }
    }else{
        alert('Falta seleccionar el cargo extra')
      }
  }

  render(){
    return (
      <Modal>
        <h2>Añadir consumo<hr/></h2>
        <p>Pedido:
          <select defaultValue="Tipos cargo extra" onChange={this.handleConsumption} >
            <option disabled>Tipos cargo extra</option>
          {
            this.state.consumptions &&
            this.state.consumptions.map(consumption => {
              return (<option key={consumption.codtipocargoextra} value={consumption.codtipocargoextra}> {consumption.descripcion} - ${consumption.costo} </option>)
            })
          }
          </select>
        </p>
        <Button handleClick={this.newConsumption} title="Añadir" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
            h2, select {
              text-align: center;
              margin: 15px;
            }
            select{
              width: 75%;
            }
        `}</style>
      </Modal>
    )
  }
}