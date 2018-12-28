import Footer from './Footer'

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Footer>
          <div className="footer-left">
            <a href="https://www.ucn.cl/">
              <img height="50px" src="../static/ucn.png" /> 
            </a>
            <a href="https://eic.ucn.cl/">
              <img height="60px" src="../static/eic.png" /> 
            </a>
          
          </div>
          <div className="footer-right">
            <a href="https://github.com/fruizrob/Taller-Software">
              <img height="60px" src="../static/github.png" /> 
            </a>
            
          </div>
        </Footer>
        <style jsx global>{`
          body {
            margin: 0;
            margin-bottom: 60px;
            font-family: system-ui;
            background: #f6f6f6;
          }
          .header-left, .header-right, .footer-left, .footer-right {
            display: flex;
            justify-content: space-around;
          }
        `}</style>
      </div>
    )
  }
}
