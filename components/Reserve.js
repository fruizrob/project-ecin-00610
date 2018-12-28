import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    // get
    room_types: '',
    rooms: '',
    rut: '',

    // post
    start_date: '',
    end_date: '',
    cradle: false,
    kids: false,
    extra_bed: false,
    room: '',
    room_type: ''
  }

  componentWillMount = () => {
    fetch('http://localhost:3000/api/userInfo')
      .then(res => res.json())
      .then(data => {
        const { rutpasaporte } = data.user
        this.setState({
          rut: rutpasaporte
        })
      }) 
      .catch((e) => {
        console.log(e)
      })
  }

  componentDidMount = () => {
    this.getRoomTypes()
    this.getRooms()
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

  getRooms = (type = undefined) => {
    if (!type){
      fetch('http://localhost:3000/api/rooms')
        .then(res => res.json())
        .then(data => {
          this.setState({
            rooms: data
          })
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      fetch(`http://localhost:3000/api/rooms/${type}`)
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
  }

  handleStartDate = (ev) => {
    this.setState({
      start_date: ev.target.value
    })
  }

  handleEndDate = (ev) => {
    this.setState({
      end_date: ev.target.value
    })
  }

  handleRoomType = (ev) => {
    let type = ev.currentTarget.value
    this.getRooms(type)
    this.setState({
      room_type: type
    })
  }

  handleRoom = (ev) => {
    this.setState({
      room: ev.currentTarget.value
    })
  }

  toggleKids = () => {
    this.setState({
      kids: !this.state.kids
    })
  }

  toggleCradle = () => {
    this.setState({
      cradle: !this.state.cradle
    })
  }  

  toggleBed = () => {
    this.setState({
      extra_bed: !this.state.extra_bed
    })
  }  

  handleReserve = () => {
    let { cradle, kids, extra_bed } = this.state
    let requerimiento = 'NO'
    if( cradle || kids || extra_bed ){
      requerimiento = 'SI'
    }

    try {
      let form = {
        rut: this.state.rut,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        request: requerimiento,
        cod_room: this.state.room,
        cod_type: this.state.room_type
      }

      const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
      let data = serialize(form)

      fetch('/api/reserve', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(() => window.location.assign('/user'));
    } catch (e) {
      console.log("Error", e)
    }
  }

  render(){
    const { rooms, room_types } = this.state

    return (
      <div className="container">
        <div>
          <h1>Reservas<hr/></h1>
          <h4 id="in">Fecha llegada: <input onChange={this.handleStartDate} type="date" /></h4>
          <h4 id="out">Fecha salida: <input onChange={this.handleEndDate} type="date" /></h4>

          <select onChange={this.handleRoomType} defaultValue="Tipo habitación" className="roomType">
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

          <select onChange={this.handleRoom} defaultValue="Habitación" className="roomList">
            <option disabled>Habitación</option>
            {
              rooms.data &&
              rooms.data.map(room => {
                return <option key={room.numero}>{room.numero}</option>
              })
            }
          </select>
        </div>

        <button onClick={this.handleReserve}>Reservar</button> 

        <style jsx>{`
          h1 {
            padding-left: 15px;
            padding-right: 15px;
          }

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