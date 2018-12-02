import Link from 'next/link'
import Head from 'next/head'

export default class extends React.Component {
    render() {
        const { title, children } = this.props

        return (
            <div>
                <form id="regist">
                    <h2>Registro:</h2>
                    <hr />
                    <p>Rut: <input type="text" placeholder="ej: 11111111-1" pattern="[0-9]{7,}-(k|K|[0-9])$" maxLength="10" required /></p>
                    <p>Nombre: <input type="text" placeholder="Nombre completo" pattern="[A-Z]{0,1}[a-z]+\s[A-Z]{0,1}[a-z]+(\s[A-Z]{0,1}[a-z]+){0,2}$" required /></p>
                    <p>Nick: <input type="text" placeholder="Nombre usuario" required /></p>
                    <p>Contraseña: <input type="password" placeholder="Ingrese su contraseña" required /></p>
                    <p>Corroborar: <input type="password" placeholder="Corroborar contraseña" required /></p>
                    <p>Email: <input type="text" placeholder="Ingrese email" pattern="(.+)@(hotmail|live|yahoo|gmail|outlook)([.]com|[.]es)$" /></p>
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
                        top: 50%;
                        left: 50%;
                        position: absolute;
                        transform: translate(-50%, -50%);
                        box-sizing: border-box;
                        padding: 10px 30px;
                }`}</style>

            </div>
        )
    }
}