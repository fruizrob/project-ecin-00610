export default class extends React.Component {
  createRows = () => {
    let rows = []

    for (let i = 0; i < 5; i++) {
      rows.push(<option key={i}> { `Habitación: ${ i + 1 }` } </option>)
    }
    return rows
  }
  
  render(){
    const { title, handleClick } = this.props
    return (
      <div className="container">
        <div>
          <h1>Reservas<hr/></h1>
          <h4 id="in">Fecha llegada: <input type="date" /></h4>
          <h4 id="out">Fecha salida: <input type="date" /></h4>

          <select defaultValue="Tipo habitación" className="roomType">
            <option disabled>Tipo habitación</option>
            <option>tipo 1</option>
            <option>tipo 2</option>
          </select>

          <form>
            <br/>
            <label>
              <input type="checkbox" value="children" /> ¿Viajan menores?
            </label>
            <label>
              <input type="checkbox" value="cradle" /> Necesita cuna
            </label>
            <label>
              <input type="checkbox" value="bed" /> Cama extra
            </label>
          </form>

          <select className="roomList">
            { this.createRows() }
          </select>
        </div>

        <button>Reservar</button> 

        <style jsx>{`
          select{
            display: fixed;
          }
          .roomType, label{
            margin-top: 100px;;
            margin-left: 20px;
          }
          #in{
            float:left;
            margin-left: 20px;
          }
          #out{
            float: left;
            margin-left: 20px;
          }
          .roomList{
            margin-top: 20px;
            margin-left: 20px;
          }
          button{
            margin-left: 20px;
            margin-top: 30px;
            width: 10%;
            min-width: 100px;
          }
          div, form{
            min-width: 700px;
          }
        `}</style>
      </div>
    )
  }
}