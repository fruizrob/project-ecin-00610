import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import HeaderButton from '../components/HeaderButton'
import 'isomorphic-fetch'

export default class extends React.Component {

  componentWillMount = () => {
    fetch('http://localhost:3000/api/userInfo')
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        if (data.user) {
          let { nompersona: name, rutpasaporte: rut, user_type_id: type } = data.user
          switch (type) {
            // ADMIN
            case 'AD':
              window.location.assign('/admin')
              break;
            // USER
            case 'UR':
              window.location.assign('/user')
              break;
            // RECEPTION
            case 'RC':
              window.location.assign('/admin-reception')
              break;
            // PERSONAL TOILET
            case 'PT':
              window.location.assign('/personal-toilet')
              break;
            // RESTAURANT & SPA
            case 'RS':
              window.location.assign('/restaurant-spa')
              break;
            default:
              
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
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
    
        <button title="Click" onClick={this.test} /> 
        <Home />

      </Layout>
    )
  }
}