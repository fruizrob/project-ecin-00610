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
            <form className="form-container" onSubmit={this.props.canBeSubmitted} >
                <input onChange={this.props.handleCard} type="text" placeholder="Nº tarjeta" pattern="[0-9]{4,20}$" required /><p />
                <input onChange={this.props.handleBank} type="text" placeholder="Banco de Tarjeta" required /><p />
                <input type="text" placeholder="Código de seguridad (CVV)" pattern="[0-9]{3,4}$" required /><p />
                <button type="submit">Realizar pago</button>
            </form>
          </div>
        </div>

        <style jsx>{`
        .container{
          min-width: 630px;
        }
        .form-container{
          min-width: 300px;
          width: 50%;
          height: 30%;
          background: #8756ca;
          color: #fff;
          left: 50%;
          top: 60%;
          transform: translate(-50%, -50%);
          position: fixed;
          box-sizing: border-box;
          padding: 30px 30px;
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
        input, button{
          width: 100%;
        }
        `}</style>
      </div>
    )
  }
}