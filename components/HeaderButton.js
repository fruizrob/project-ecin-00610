import Link from 'next/link'

export default class extends React.Component {
  render() {
    const { rute, name } = this.props
    return (
      <div>
        <Link href={this.props.rute}>
          <a>{this.props.name}</a>
        </Link>

        <style jsx>{`
          a {
            color: #fff;
            text-decoration: none;
          }
        `}</style>
      </div>
    )
  }
}