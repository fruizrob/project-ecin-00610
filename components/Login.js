export default class extends React.Component {
  render() {
    return (
      <div className="container">

        <h2>Login</h2>

        <div>
          <p>Usuario</p>
          <input type="text" placeholder="Ingresa tu usuario"/> 
        </div>

        <div>
          <p>Contraseña</p>
          <input type="password" placeholder="Ingresa tu contraseña"/> 
        </div>

        <button>Ingresar</button>

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
            width: 300px;
            height: 300px;
          }
        `}</style>
      </div>

    )
  }
}