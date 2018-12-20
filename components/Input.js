export default class extends React.Component {
  render(){
      const { title, type, placeholder } = this.props
      return (
        <div className="container">
          <p>{title}</p>
          <input type={type} placeholder={placeholder} /> 
    
          <style jsx>{`
            .container {
              display: grid;
            }
            p {
              color: #fff;
            }
            input {
              margin: 0px 0px 20px 0px;
            }
          `}</style>
        </div>
      )
  }
}