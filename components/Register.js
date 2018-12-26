import Link from 'next/link'
import Head from 'next/head'

export default class extends React.Component {
  render() {
    return (
      <div className="section">
        <div id="regist">
          <h2>Registro:</h2>
          <hr />
          <p>Rut: <input onChange={this.props.handleRut} type="text" placeholder="ej: 11.111.111-k" /></p>
          <p>Nombre: <input onChange={this.props.handleName} type="text" placeholder="Nombre completo" /></p>
          <p>Contraseña: <input onChange={this.props.handlePassword} type="password" placeholder="Ingrese su contraseña" /></p>
          <p>Confirmar: <input onChange={this.props.handleConfirm} type="password" placeholder="Confirmar contraseña" /></p>
          <p>Dirección: <input onChange={this.props.handleDirection} type="text" placeholder="Dirección particular" /></p>
          <p>Celular: <input onChange={this.props.handlePhone} type="text" placeholder="Número de contacto" /></p>
          <button onClick={this.props.canBeSubmitted}>Agregar usuario</button>
        </div>

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