export default class extends React.Component {
  render(){
    return (
      <div>
        <div className="container">
          <h2>Configura tu tarjeta de crédito/debito</h2>
          <hr /><br />

          <div id="credito">
            <h4>Tarjeta de crédito<hr/></h4>
            <img className="credit" src="../static/credit.jpg" />
          </div>
          <div id="debito">
            <h4>Tarjeta de debito<hr/></h4>
            <img className="debit" src="../static/debit.png" />
          </div>
          <div>
            <form className="form-container">
                <input type="text" placeholder="Nombre" pattern="[A-Z]{0,1}[a-z]+(\s[A-Z]{0,1}[a-z]+){0,2}$" required /><p />
                <input type="text" placeholder="Apellido" pattern="[A-Z]{0,1}[a-z]+(\s[A-Z]{0,1}[a-z]+){0,2}$" required /><p />
                <input type="text" placeholder="Nº tarjeta" pattern="[0-9]{4,10}$" required /><p />
                <input type="text" placeholder="Forma: dd-MM-yyyy" required /><p />
                <input type="text" placeholder="Código de seguridad (CVV)" pattern="[0-9]{3,4}$" required /><p />
                <button type="submit">Agregar usuario</button>
            </form>
          </div>
        </div>

        <style jsx>{`
        .container{
          min-width: 630px;
        }
        .form-container{
          min-width: 300px;
        }
        h2{
          text-align: center;
        }
        #credito{
          margin-left: 20%;
          float: left;
        }
        #debito{
          margin-right: 20%;
          float: right;
        }
        .credit{
          width: 200px;
          height: 50px;
        }
        .debit{
          width: 80px;
          height: 80px;
        }
        form{
          width: 50%;
          height: 40%;
          background: #8756ca;
          color: #fff;
          left: 50%;
          top: 70%;
          transform: translate(-50%, -50%);
          position: fixed;
          box-sizing: border-box;
          padding: 10px 30px;
        }
        input, button{
          width: 100%;
        }
        `}</style>
      </div>
    )
  }
}