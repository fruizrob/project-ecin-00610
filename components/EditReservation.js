import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    room_types: [],
    rooms: [],

    room: '',
    type: '',
  }

  componentWillMount = () => {
    this.getRooms()
    this.getRoomTypes()
  }

  getRoomTypes = () => {
    fetch('http://localhost:3000/api/roomTypes')
      .then(res => res.json())
      .then(data => {
          this.setState({
            room_types: data.data
          })
        })
      .catch((e) => console.log(e))
  }
      
  getRooms = () => {
    fetch('http://localhost:3000/api/rooms')
      .then(res => res.json())
      .then(data => {
        this.setState({
          rooms: data.data
        })
      })  
      .catch((e) => console.log(e))
  }

  handleRoom = (ev) => {
    this.setState({
      room: ev.target.value
    })
  }

  handleTypeRoom = (ev) => {
    this.setState({
      type: ev.target.value
    })
  }

  handleEdit = () => {
    let form = {
      room: this.state.room,
      type: this.state.type,
    }

    const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
    let data = serialize(form)

    fetch('/api/room/edit', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(() => this.props.onClose());
  }

  render() {
    const { rooms, room_types } = this.state 
    return (
      <Modal className="modal-container">
        <h2>Editar Habitación<hr/></h2>
        <select onChange={this.handleRoom} defaultValue="Habitaciones">
          <option disabled>Habitaciones</option>
          {
            rooms &&
            rooms.map(room => {
              return <option value={room.numero} key={room.numero}>{room.numero}</option>
            })
          }
        </select>
        <select onChange={this.handleTypeRoom} defaultValue="Tipos">
          <option disabled>Tipos</option>
          {
            room_types &&
            room_types.map(type => {
              return <option value={type.codtipohab} key={type.codtipohab}>{type.nomtipohab}</option>
            })
          }
        </select>
        <Button handleClick={this.handleEdit} title="Editar" />
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          h2, select {
            text-align: center;
            margin: 15px 0px;
          }
        `}</style>

      </Modal>
    )
  }
}