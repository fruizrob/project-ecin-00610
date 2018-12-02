import Link from 'next/link'
import Input from '../components/Input'

export default class extends React.Component {
  render() {
    return (
      <div className="container">
        <form className="form-container">
          <h2>Login</h2>
          <hr />

          <Input title="Usuario" type="text" placeholder="Ingresa tu usuario" />
          <Input title="Contraseña" type="password" placeholder="Ingresa tu contraseña" />
          <br />

          <Link href="/register"><a>No tiene una cuenta aún? Registrese!</a></Link>

          <p />
          <button>Ingresar</button>
        </form>

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
        `}</style>
      </div>

    )
  }
}