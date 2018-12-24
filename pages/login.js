import Header from '../components/Header'
import Layout from '../components/Layout'
import HeaderButton from '../components/HeaderButton'
import Login from '../components/Login'
import 'isomorphic-fetch'

export default class extends React.Component {

  state = {
    rut: '',
    password: '',
  }

  initSession = async () => {
    let form = {
      rutpasaporte: this.state.rut,
      password: this.state.password,
    }

    const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))
    let data = serialize(form)

    const res = await fetch('/auth/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const json = await res.json();
    window.location.assign(json.successRedirect)
  }


  iniciarSesion = () => {
    
    console.log(rutpasaporte + " " + password)
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/auth/test');

    console.log(formData);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if(xhr.status === 200) {
        console.log("Respuesta: " + xhr.response);
      }
    });
    xhr.send(formData);
  }

  handleRut = (ev) => {
    this.setState({
      rut: ev.target.value,
    })
  }

  handlePassword = (ev) => {
    this.setState({
      password: ev.target.value,
    })
  }

  
  render() {
    const { rut, password } = this.state;
    return (
      <Layout>
        <Header title="Home">
          <div className="header-left">
            <HeaderButton name="Inicio" rute="/" />

          </div>
          <div className="header-right">
            <a>Logo Genial</a>
          </div>
        </Header>

        <div className="login">
          <Login handleRut={this.handleRut} handlePassword={this.handlePassword} handleClick={this.initSession} />
        </div>

        <style jsx>{`
          .login {
            display: flex;
            justify-content: center;
            margin: 50px;
          }
        `}</style>

      </Layout>
    )
  }
}