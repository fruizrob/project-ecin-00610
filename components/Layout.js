export default class extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: #f6f6f6;
          }
          .header-left, .header-right {
            display: flex;
            justify-content: space-around;
          }
        `}</style>
      </div>
    )
  }
}