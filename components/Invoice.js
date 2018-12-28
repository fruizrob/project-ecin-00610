import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {

  state = {
    cost: '',
    day: '',
  }

  getCosts = () => {
    fetch(`http://localhost:3000/api/cost/${this.props.codreserva}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cost: data.data
        })
      })
      .catch(e => console.log(e))
  }

  getDays = () => {
    fetch(`http://localhost:3000/api/days/${this.props.codreserva}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          day: data.data
        })
      })
      .catch(e => console.log(e))
  }

  calcCost = () => {
    let cost = 0;
    this.state.cost &&
    this.state.cost.map(currCost => {
      return (cost+=currCost.costo)
    })
    return cost;
  }

  calcDay = () => {
    if(this.state.day){
      let {cantday} = this.state.day
      if(cantday > 0){
        return (10000*cantday)
      }
    }
    return 10000;    
  }

  componentWillMount = () => {
    if(this.props.codreserva){
      this.getCosts()
      this.getDays()
    }else{
      alert('Faltó seleccionar una reserva')
      this.props.onClose()
    }
  }

  render() {
    let costoAlojamiento = this.calcDay();
    let costoConsumo = this.calcCost();
    return (
      <Modal className="modal-container">
        <h2>Costo<hr/></h2>
        <p>Alojamiento: ${costoAlojamiento}</p>
        <p>Consumo: ${costoConsumo}</p>
        <p>Costo total: ${costoConsumo+costoAlojamiento}</p>
        <Button handleClick={this.props.onClose} title="Agregar" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          h2, input, select {
            margin: 15px;
            min-width: 200px;
          }
        `}</style>

      </Modal>
    )
  }
}

// #C70039 -> Rojo
// #FFC300 -> Amarrillo