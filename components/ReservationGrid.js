export default class extends React.Component {
  render() {
    const { reservations } = this.props
    return (
      <div>
        <div className="reservations-container">
          {
            reservations &&
            reservations.map(reserve => {
              return (<div key={reserve.codreserva} className="reservations-cards">
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
        `}</style>
      </div>
    )
  }
}