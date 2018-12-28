import Link from 'next/link'

export default class extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className="phantomStyle" />
          <div className="footerStyle">
            {this.props.children}
          </div>
        </div>

        <style jsx>{`
          .footerStyle {
            font-size: 20px;
            color: white;
            border-top: 1px solid #E7E7E7;
            padding: 20px;
            position: fixed;
            left: 0px;
            bottom: 0px;
            height: 60px;
            width: 100%;
            display: grid;
            grid-template-columns: 50% 50%;
            color: #fff;
            background: #8756ca;
          }
        
          .phantomStyle {
            display: block,
            padding: 20px,
            height: 60px,
            width: 100%
          }
        `}</style>
      </div>
    )
  }
}