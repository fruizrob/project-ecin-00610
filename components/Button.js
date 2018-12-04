export default class extends React.Component {
  render(){
    const { title, handleClick } = this.props
    return (
      <div className="container">
        <button onClick={handleClick}>{title}</button>

        <style jsx>{`
          .container {  
            padding: 0 0 1em 0;
            text-align: center;
            width: 100%;  
          }
          button {
            background-color: #C70039;
            width: 100%;
            border: 0;
            border-radius: 8px;
            color: white;
            padding: 1em;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    )
  }
}