export default class extends React.Component {
  render(){
      const { title, type, placeholder } = this.props
      return (
        <div>
          <p>{title}</p>
          <input type={type} placeholder={placeholder} /> 
    
          <style jsx>{`
            p {
              color: #fff;
            }
            input {
              width: 100%;
            }
          `}</style>
        </div>
      )
  }
}