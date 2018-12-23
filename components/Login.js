import Link from 'next/link'
import Input from '../components/Input'

export default class extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h2>Login</h2>
          <hr />

          <Input handleChange={this.props.handleRut} title="Usuario" type="text" placeholder="Ingresa tu usuario" />
          <Input handleChange={this.props.handlePassword} title="Contraseña" type="password" placeholder="Ingresa tu contraseña" />
          <br />

          <Link href="/register"><a>No tiene una cuenta aún? Registrese!</a></Link>

          <button onClick={this.props.handleClick} >Ingresar</button>
        </div>

        <style jsx>{`
          h2 {
            text-align: center;
          }
          h2, p {
            color: #fff;
          }
          .container {
            background: #8756ca;
            display: grid;
            justify-content: center;
            align-items: center;
            width: 22%;
            height: 70%;
            padding: 10px 30px;
          }
          button {
            width: 100%;
          }
          a{
            text-decoration: none;
            font-size: 12px;
            line-height: 20px;
            color: darkgrey;
          }
          a:hover{
            color: #fff;
          }
        `}</style>
      </div>

    )
  }
}