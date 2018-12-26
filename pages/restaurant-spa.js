import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderButton from '../components/HeaderButton'
import ReactDataGrid from 'react-data-grid'
import Button from '../components/Button'

// Modals
import AddProduct from '../components/AddProduct'

const columns = [
  { key: "desc", name: "Descripción", editable: false },
  { key: "id", name: "ID", editable: false },
  { key: "fecha", name: "Fecha", editable: false },
  { key: "precio", name: "Precio", editable: false }
];

const rows = [
  { desc: "Pieza simple", id: 0, fecha: "01/02/2010", precio: 60},
  { desc: "Pieza simple", id: 1, fecha: "01/02/2010", precio: 60},
  { desc: "Pieza simple", id: 2, fecha: "01/02/2010", precio: 60}
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

  handleOpenAddProduct = () => {
    this.setState({
      modalAddProduct: true,
    })
  }
  handleCloseAddProduct = () => {
    this.setState({
      modalAddProduct: false,
    })
  }

  render() {
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
          </div>
          <div className="header-right">
            <HeaderButton name="Cerrar Sesión" rute="/auth/logout"/>
          </div>
        </Header>

        <div>
          <h1>Buscar cliente</h1>
          <input type="text" placeholder="     RUT (11111111-1)" />
        </div>
        <div>
          <h2>Cargos de "Usuario"</h2>
          <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.rows[i]}
            rowsCount={3}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
          />
        </div>
        
        <div className="button1">
          <Button handleClick={this.handleOpenAddProduct} title="Ok"/>
        </div>

        <div className="button2">
          <Button handleClick={this.handleOpenAddProduct} title="Agregar"/>
        </div>

        {
          this.state.modalAddProduct &&
          <AddProduct onClose={this.handleCloseAddProduct}/>
        }

        <style jsx>{`
          h1{
            float: left;
            margin-left: 50px;
          }
          h2{
            margin-top: 40px;
            margin-left 50px;
          }
          input{
            margin-top: 35px;
            margin-left: 100px;
            width: 30%;
            border: none;
            outline: none;
            height: 20px;
            text-align: center;
            border: solid 1px;
            border-radius: 10px;
          }
          .button1 {
            float: left;
            padding: 15px 0px 15px 15px;
            margin-left: 5px;
            width: 5%;
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