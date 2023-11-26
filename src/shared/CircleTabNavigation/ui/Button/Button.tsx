import { useSpring, animated } from "@react-spring/web"
import { useState, useLayoutEffect } from "react"
import classNames from "classnames"
import cls from "./Button.module.scss"

interface IButtonProps {
  radius: number
  active: boolean,
  angle: number
  setAngle: () => void
  code: number
  title?: string
}

export const Button: React.FunctionComponent<IButtonProps> = ({
  radius,
  active,
  code,
  angle,
  setAngle,
  title
}) => {

  const [isFirstRender, setisFirstRender] = useState(true)

  const [{ ang }, api] = useSpring(
    () => ({
      to: { 
        ang: angle
      }
    }),
    []
  )

  
  const x = ang.to((val) => {
    return radius*Math.cos(val/180*Math.PI)
  })

  const y = ang.to((val) => {
    return radius*Math.sin(val/180*Math.PI)
  })


  const onButtonClick = () => {
    setAngle()
  }

  useLayoutEffect(() => {
    if (isFirstRender) {
      setisFirstRender(false)

      return
    }

    api.start({
      ang: angle,
      config: {
        duration: 500
      }
    })

    //eslint-disable-next-line
  }, [angle])

  const classes = classNames(
    cls.wrapper,
    {
      [cls.active]: active
    }
  )

  return (
    <animated.div
      className={classes}
      onClick={() => onButtonClick()}
      style={{
        x, y
      }}
    >
      <div
        className={cls.item}
      >
        {code}
      </div>
      {
        title && <span className={cls.title}>{title}</span>
      }
    </animated.div>
  )
}
