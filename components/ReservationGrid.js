export default class extends React.Component {

  state = {
    selected: false,
    selectedTarget: '',

    // Selected Reservation
    id: '',
    rut: '',
    start: '',
    end: '',
    type: '',
    bank: '',
    credit_card: '',
    aditional: '',
    rut_employe: '',
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

    this.getReservationSelected(ev.currentTarget.getAttribute('value'))
    console.log(this.state)
  }

  getReservationSelected = (cod) => {
    fetch(`/api/reservations/${cod}`)
      .then(res => res.json())
      .then(data => {
        const reservation = data.data[0]
        console.log(data.data[0])
        this.setState({
          id: reservation.codreserva,
          rut: reservation.rutpasaporte,
          start: reservation.fechainicio,
          end: reservation.fechafin,
          type: reservation.formareserva,
          bank: reservation.bancotarjetacredito,
          credit_card: reservation.numtarjetacredito,
          aditional: reservation.requerimientosadicionales,
          rut_employe: reservation.rutrecepcion,
        })
      })
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
                <p>Fecha Inicio: {reserve.fechainicio}</p>
                <p>Fecha Termino: {reserve.fechafin}</p>
                <p>Rut: {reserve.rutpasaporte}</p>
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
            color: white;
          }
        `}</style>
      </div>
    )
  }
}