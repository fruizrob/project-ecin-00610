export default class extends React.Component {
  render() {
    return (
      <div>
        <div className="reservations-container">
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
          <div className="reservations-cards">
            <p>Codigo: QWERTY123</p>
            <p>Fecha: 25 de Noviembre, 2018</p>
            <p>Estado: Pagado</p>
          </div>
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