import Link from 'next/link'
import Head from 'next/head'

export default class extends React.Component {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <Head>
          <title> {title} </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header>
            {children}
        </header>

        <style jsx>{`
          header {
            display: grid;
            grid-template-columns: 50% 50%;
            color: #fff;
            background: #8756ca;
            padding: 15px;
          }
        `}</style>
      </div>
    )
  }
}