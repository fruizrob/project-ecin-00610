import Layout from '../components/Layout'
import Header from '../components/Header'
import HeaderButton from '../components/HeaderButton'
import Button from '../components/Button'
import ReactDataGrid from 'react-data-grid'


const columns = [
  { key: "room", name: "Nº Habitación", editable: false },
  { key: "desc", name: "Descripción", editable: false }
];

const rows = [
  { room: 325, desc: "Jarrón mesa de centro roto"},
  { room: 120, desc: "Faltan toallas de baño"}
];

export default class extends React.Component {
  state = { rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render(){
    const pisoSemana = 2;
    const pisoProximaSemana = 3;
    const numRows = 2;
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
          <h2> Registros de personal de aseo <hr/></h2>
          <div>
            <h4 id="this-week">Piso asignado esta semana : {pisoSemana}</h4>
            <h4 id="next-week">Piso asignado próxima semana : {pisoProximaSemana}</h4>
          </div>

          <div className="bitacora">
            <h4>Registrar bitacora diaria</h4>
            <h5>Fecha : 08/12/2018</h5>
            <div className="lista-habitaciones">
              <ReactDataGrid
                columns={columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={numRows}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
              />
            </div>
          </div>
          <div className="button1">
            <Button handleClick={() => console.log("Registrar")} title="Registrar" />
          </div>
          <div className="button2">
            <Button handleClick={() => console.log("Editar")} title="Editar" />
          </div>
        </div>

        <style jsx>{`
          .container{
            min-width: 630px;
          }
          #this-week{
            margin-left: 5%;
            float: left;
          }
          #next-week{
            margin-left: 20%;
            float: left;
          }
          .bitacora{
            margin-left: 5%;
            margin-top: 120px;
          }
          .button1 {
            float: left;
            padding: 15px 0px 15px 15px;
            margin-left: 5px;
            width: 25%;
          }
          .button2 {
            float: left;
            padding: 15px 0px 15px 15px;
            margin-left: 5px;
            width: 20%;
          }
        `}</style>
      </Layout>
    )
  }
}