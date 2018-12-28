import Modal from './Modal'
import Button from './Button'

export default class extends React.Component {

  state = {
    staff: [],
    floors: []
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

  render(){
    const {staff, floors} = this.state
    return (
      <Modal className="modal-container">
        <h2>Asignar Personal<hr/></h2>
        <select defaultValue="Rut personal">
          <option disabled>Rut personal</option>
          {
            staff &&
            staff.map(pt => {
              return (<option key={pt.rutpasaporte} value={pt.rutpasaporte}> {pt.rutpasaporte} </option>)
            })
          }
        </select>
        <select defaultValue="Piso">
          <option disabled>Piso</option>
          {
            floors &&
            floors.map(floor => {
              return (<option key={floor.numpiso} value={floor.numpiso}> {floor.numpiso} </option>)
            })
          }
        </select>
        <Button handleClick={this.props.onClose} title="Agregar"/>
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