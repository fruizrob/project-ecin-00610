import Link from 'next/link';
import Router from 'next/router'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Home from '../components/Home'
import Footer from '../components/Footer'
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
              Router.push('/admin')
              break;
            // USER
            case 'US':
              Router.push('/user')
              break;
            // RECEPTION
            case 'RC':
              Router.push('/admin-reception')
              break;
            // PERSONAL TOILET
            case 'PT':
              Router.push('/personal-toilet')
              break;
            // RESTAURANT & SPA
            case 'RS':
              Router.push('/restaurant-spa')
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
          </div>
          <div className="header-right">
            <HeaderButton name="Login" rute="/login"/>
            <HeaderButton name="Registro" rute="/register"/>
          </div>
        </Header>

        <Home />

        <style jsx>{`
          .logo {
            margin: 0px;
            padding: 0px;
          }
        `}</style>
      </Layout>
    )
  }
}