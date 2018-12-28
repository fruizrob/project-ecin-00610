import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {

  state = {
    staff: [],
    floors: [],
    rut: '',
    floor: '',
  }

  // Obtener personal aseo
  getStaff = () => {
    fetch('http://localhost:3000/api/staff')
      .then(res => res.json())
      .then(data => {
        this.setState({
          staff: data.data
        })
      })
      .catch(e => console.log(e))
  }

  // Obtener los pisos
  getFloors = () => {
    fetch('http://localhost:3000/api/floors')
      .then(res => res.json())
      .then(data => {
        this.setState({
          floors: data.data
        })
      })
      .catch(e => console.log(e))
  }

  componentDidMount = () => {
    this.getStaff()
    this.getFloors()
  }

  handleAssign = () => {
    if(this.state.rut && this.state.floor){
      let form = {
        rut: this.state.rut,
        floor: this.state.floor,
      }

      const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
      let data = serialize(form)

      fetch('/api/assign', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(() => this.props.onClose());
    }else{
        alert('Falta seleccionar empleado y/o piso')
      }
  }

  handleStaff = (ev) => {
    this.setState({
      rut: ev.target.value,
    })
  }

  handleFloor = (ev) => {
    this.setState({
      floor: ev.target.value,
    })
  }

  render(){
    const {staff, floors} = this.state
    return (
      <Modal className="modal-container">
        <h2>Asignar Personal<hr/></h2>
        <select defaultValue="Rut personal" onChange={this.handleStaff}>
          <option disabled>Rut personal</option>
          {
            staff &&
            staff.map(pt => {
              return (<option key={pt.rutpasaporte} value={pt.rutpasaporte}> {pt.rutpasaporte} </option>)
            })
          }
        </select>
        <select defaultValue="Piso"onChange={this.handleFloor}>
          <option disabled>Piso</option>
          {
            floors &&
            floors.map(floor => {
              return (<option key={floor.numpiso} value={floor.numpiso}> {floor.numpiso} </option>)
            })
          }
        </select>
        <Button handleClick={this.handleAssign} title="Agregar"/>
        <Button handleClick={this.props.onClose} title="Cerrar" />

        <style jsx>{`
          h2, input, select {
            margin: 15px;
          }
        `}</style>

      </Modal>
    )
  }
}

// #C70039 -> Rojo
// #FFC300 -> Amarrillo