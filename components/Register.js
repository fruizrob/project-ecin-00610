import Link from 'next/link'
import Head from 'next/head'

export default class extends React.Component {
  render() {
    return (
      <div className="section">
        <form id="regist" onSubmit={this.props.canBeSubmitted}>
          <h2>Registro:</h2>
          <hr />
          <p>Rut: <input onChange={this.props.handleRut} type="text" placeholder="ej: 11.111.111-k" pattern="[0-9]{1,2}[.][0-9]{3}[.][0-9]{3}-(k|K|[0-9])$" maxLength="12" required /></p>
          <p>Nombre: <input onChange={this.props.handleName} type="text" placeholder="Nombre completo" pattern="[A-Z]{0,1}[a-z]+\s[A-Z]{0,1}[a-z]+(\s[A-Z]{0,1}[a-z]+){0,2}$" required /></p>
          <p>Contraseña: <input onChange={this.props.handlePassword} type="password" placeholder="Ingrese su contraseña" required /></p>
          <p>Confirmar: <input onChange={this.props.handleConfirm} type="password" placeholder="Confirmar contraseña" required /></p>
          <p>Dirección: <input onChange={this.props.handleDirection} type="text" placeholder="Dirección particular" required /></p>
          <p>Celular: <input onChange={this.props.handlePhone} type="text" placeholder="Número de contacto" pattern="[0-9]{6,9}$" required /></p>
          <button type="submit">Agregar usuario</button>
        </form>

        <style jsx>{`
            input, button{
                width: 100%;
            }
            #regist{
                width: 22%;
                height: 70%;
                background: #8756ca;
                color: #fff;
                top: 55%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                box-sizing: border-box;
                padding: 0 30px;
                min-width: 170px;
            }
        `}</style>

      </div>
    )
  }
}