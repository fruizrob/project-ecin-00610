import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'

export default class extends React.Component {

  ejecutarRequest = () => {
    let xhr = new XMLHttpRequest();
    let respuesta = [];
    xhr.open('get', '/api/probando');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        let data = xhr.response.data;
        data.map(d => {
          respuesta.push(d);
        });
        console.log(respuesta);
      } else {
        console.log("error");
      }
    });
    xhr.send();
  }

  render() {
    const user = true 
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />
            <HeaderButton name="Realizar Reserva" rute="/reserve" />
            <HeaderButton name="Login" rute="/login"/>
            <HeaderButton name="Servicios extra" rute="/restaurant-spa" />
          </div>
          <div className="header-right">
            <HeaderButton name="Vista Usuario" rute="/user" />
            <HeaderButton name="Vista Admin" rute="/admin" />
            <a>Logo Genial</a>
          </div>
        </Header>
    
        <button title="Click" onClick={this.ejecutarRequest} /> 
        <Home />

      </Layout>
    )
  }
}