export default class extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          {this.props.children}
        </div>

        <style jsx>{`
          .modal {
            background-color: rgba(0,0,0,0.5);
            position: fixed;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal-content {
            background: #f6f6f6;
            box-shadow: 1 px 2px 15px rgba(0, 0, 0, 0.5);
            display: grid;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
        `}</style>

        <style jsx global>{`
          .modal-container {
            position: relative;
            z-index: 999;
          }
        `}</style>
      </div>
    )
  }
}