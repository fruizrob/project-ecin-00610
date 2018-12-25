import Link from 'next/link'
import Head from 'next/head'

export default class extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <div className="section">
        <form id="regist">
            <h2>Registro:</h2>
            <hr />
            <p>Rut: <input type="text" placeholder="ej: 11.111.111-1" pattern="[0-9]{1,2}[.][0-9]{3}[.][0-9]{3}-(k|K|[0-9])$" maxLength="10" required /></p>
            <p>Nombre: <input type="text" placeholder="Nombre completo" pattern="[A-Z]{0,1}[a-z]+\s[A-Z]{0,1}[a-z]+(\s[A-Z]{0,1}[a-z]+){0,2}$" required /></p>
            <p>Contraseña: <input type="password" placeholder="Ingrese su contraseña" required /></p>
            <p>Corroborar: <input type="password" placeholder="Corroborar contraseña" required /></p>
            <p>Dirección: <input type="text" placeholder="Dirección particular" required /></p>
            <p>Teléfono: <input type="text" placeholder="Número de contacto (+56)" pattern="[+56]{0,1}[0-9]{6,9}$" /></p>
            <button type="submit">Agregar usuario</button>
        </form>

        <style jsx>{`
            input, button{
                width: 100%;
            }
            #regist{
                width: 22%;
                height: 80%;
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