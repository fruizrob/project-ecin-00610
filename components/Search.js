import Button from './Button'

export default class extends React.Component {
  render() {
    return (
      <div className="search">
      
        <input onChange={this.props.handleSearchUser} type="text" placeholder="Usuario" />
        <Button title="Buscar" handleClick={this.props.handleSearch} />
        
        <style jsx>{`
          .search {
            margin-top: 15px;
            display: grid;
            justify-content: center;
            align-items: center;
          }
          input {
            margin-bottom: 5px;
          }

        `}</style>

      </div>
    )
  }
}