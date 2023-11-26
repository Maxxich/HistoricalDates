import classNames from "classnames"
import cls from "./Button.module.scss"

interface IButtonProps {
  variant?: "next" | "previus"
  className?: string
  visible: boolean
  onClick: () => void
}


export const Button: React.FunctionComponent<IButtonProps> = ({
  className,
  variant = "next",
  visible,
  onClick
}) => {

  const classes = classNames(
    cls.Button,
    {
      [cls.hidden]: !visible,
      [cls.rotated]: variant === "next"
    },
    className
  )

  return (
    <button 
      onClick={onClick}
      className={classes}
    />
  )
}
