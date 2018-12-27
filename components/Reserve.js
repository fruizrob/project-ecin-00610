export default class extends React.Component {

  state = {
    // get
    room_types: '',
    rooms: '',

    // post
    date_start: '',
    date_end: '',
    cradle: false,
    kids: false,
    extra_bed: false,
  }

  componentDidMount = () => {
    this.getRoomTypes()
    this.getAllRooms()
  }

  getRoomTypes = () => {
    fetch('http://localhost:3000/api/roomTypes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          room_types: data
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  getAllRooms = () => {
    fetch('http://localhost:3000/api/allRooms')
      .then(res => res.json())
      .then(data => {
        this.setState({
          rooms: data
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  toggleKids = () => {
    setState({
      kids: !this.state.kids
    })
  }

  toggleCradle = () => {
    setState({
      cradle: !this.state.cradle
    })
  }  

  toggleBed = () => {
    setState({
      extra_bed: !this.state.extra_bed
    })
  }  
  
  render(){
    const { rooms, room_types } = this.state

    return (
      <div className="container">
        <div>
          <h1>Reservas<hr/></h1>
          <h4 id="in">Fecha llegada: <input type="date" /></h4>
          <h4 id="out">Fecha salida: <input type="date" /></h4>

          <select onChange={} defaultValue="Tipo habitación" className="roomType">
            <option disabled>Tipo habitación</option>
            {
              room_types.data &&
              room_types.data.map(type => {
                return <option key={type.codtipohab} value={type.codtipohab} >{type.nomtipohab}</option> 
              })
            }
          </select>

          <form>
            <br/>
            <label>
              <input onClick={this.toggleKids} type="checkbox" value="children" /> ¿Viajan menores?
            </label>
            <label>
              <input onClick={this.toggleCradle} type="checkbox" value="cradle" /> Necesita cuna
            </label>
            <label>
              <input onClick={this.toggleBed} type="checkbox" value="bed" /> Cama extra
            </label>
          </form>

          <select className="roomList">
            <option disabled>Habitacións</option>
            {
              rooms.data &&
              rooms.data.map(room => {
                return <option key={room.numero}>{room.numero}</option>
              })
            }
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