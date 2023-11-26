import classNames from "classnames"
import cls from "./Header.module.scss"

interface IHeaderProps {
  children: React.ReactNode
  className?: string
}

export const Header: React.FunctionComponent<IHeaderProps> = ({
  children,
  className
}) => {
  return (
    <h2 className={classNames(cls.h1, className)}>
      {children}
    </h2>
  )
}

