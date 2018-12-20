import Layout from '../components/Layout'
import Header from '../components/Header'
import HeaderButton from '../components/HeaderButton'
import Button from '../components/Button'

export default class extends React.Component {

  render(){
    const pisoSemana = 2;
    const pisoProximaSemana = 3;
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
          </div>
          <div className="header-right">
            <HeaderButton name="Bienvenido/a" rute="/admin" />
            <a>Logo Genial</a>
          </div>
        </Header>

        
        <div className="container">
          <div>
            <h2>Piso asignado esta semana : {pisoSemana}</h2>
            <h2>Piso asignado proxima semana : {pisoProximaSemana}</h2>
          </div>

          <div className="bitacora">
            <h2>Registrar bitacora diaria</h2>
            <h2>Fecha : 08/12/2018</h2>
            <div className="lista-habitaciones">
              <p>Habitacion: 325</p>
              <p>Habitacion: 326</p>
              <p>Habitacion: 327</p>
              <p>Habitacion: 328</p>
              <p>Habitacion: 329</p>
              <p>Habitacion: 330</p>
            </div>
          </div>
          <div className="buttons">
            <Button handleClick={() => console.log("Registrar")} title="Registrar" />
            <Button handleClick={() => console.log("Editar")} title="Editar" />
          </div>
        </div>

        <style jsx>{`

        `}</style>
      </Layout>
    )
  }
}