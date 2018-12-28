export default class extends React.Component {

  state = {
    selected: false,
    selectedTarget: '',
  }

  handleReservation = (ev) => {

    if(this.state.selected){
      this.state.selectedTarget.classList.remove('selected')
    } else {
      this.setState({
        selected: true,
      })
    }
    
    ev.currentTarget.classList.add('selected')
    this.setState({
      selectedTarget: ev.currentTarget
    })

    this.props.getReservationSelected(ev.currentTarget.getAttribute('value'))
  }

  render() {
    const { reservations } = this.props
    return (
      <div>
        <div className="reservations-container">
          {
            reservations &&
            reservations.map(reserve => {
              return (<div onClick={this.handleReservation} value={reserve.codreserva} key={reserve.codreserva} className="reservations-cards">
                <p>Codigo: {reserve.codreserva}</p>
                <p>Rut: {reserve.rutpasaporte}</p><hr></hr>
                <p>Fechas</p>
                <p>Inicio: {reserve.fechainicio.substring(0,10)}</p>
                <p>Termino: {reserve.fechafin.substring(0,10)}</p>
              </div>)
            })
          }
        </div>
        <style>{`
          .reservations-container {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }

          .reservations-cards {
            border-radius: 3px;
            background: white;  
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.50);
            width: 100%;
          }
          .reservations-cards p {
            margin: 0.5em;
          }
          .selected {
            background: #C70039;
            box-shadow: 0px 2px 6px rgba(1, 1, 1, 2);
            color: white;
          }
        `}</style>
      </div>
    )
  }
}