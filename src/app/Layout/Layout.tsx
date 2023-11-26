import { ReactNode } from "react"
import "./Layout.scss"

interface ILayoutProps {
  children: ReactNode
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({
  children
}) => {
  return (
    <main>
      <div className={"container"}>
        {children}
      </div>
  </main>
  )
}
