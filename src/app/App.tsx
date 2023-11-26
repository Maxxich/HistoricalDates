import { HomePage } from "page/HomePage"
import { Layout } from "./Layout/Layout"

export const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <HomePage/>
    </Layout>
  )
}
