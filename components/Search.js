export default class extends React.Component {
  render() {
    return (
      <div className="search">
      
        <input type="text" placeholder="Usuario" />
        <button>Buscar</button>
        
        <style jsx>{`
          .search {
            display: grid;
            justify-content: center;
            align-items: center;
          }
        `}</style>

      </div>
    )
  }
}