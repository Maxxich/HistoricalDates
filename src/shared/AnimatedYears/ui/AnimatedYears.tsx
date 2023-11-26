import { useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import classNames from "classnames"
import cls from "./AnimatedYears.module.scss"

interface IAnimatedYearsProps {
  startYear: number,
  finishYear: number,
  className?: string
}

export const AnimatedYears: React.FunctionComponent<IAnimatedYearsProps> = ({
  finishYear, startYear, className
}) => {

  const [finish, setFinishYear] = useState(finishYear)
  const [start, setStartYear] = useState(startYear)

  const { finsishValue } = useSpring({
    from: { finsishValue: finish },
    to: { finsishValue: finishYear },
    config: { duration: 500 },
    onRest: () => setFinishYear(finishYear),
  })

  const { startValue } = useSpring({
    from: { startValue: start },
    to: { startValue: startYear },
    config: { duration: 500 },
    onRest: () => setStartYear(startYear),
  })

  return (
    <div 
      className={classNames(cls.years, className)}
    >
      <animated.span 
        className={cls.blue}
      >
        {startValue.to((val) => Math.floor(val))}
      </animated.span>
      &nbsp;
      <animated.span 
        className={cls.pink}
      >
        {finsishValue.to((val) => Math.floor(val))}
      </animated.span>
  </div>
  )
}

