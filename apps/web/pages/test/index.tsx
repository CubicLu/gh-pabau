import { version } from '../../../../package.json'

const IndexPage = (): JSX.Element => (
  <>
    <h1>Demo Page</h1>
    <p>Version {version}</p>
  </>
)

export default IndexPage
