import { Dispatch, SetStateAction, useEffect, useState } from "react"
import classNames from "classnames"
import { Button } from "./Button/Button"
import { Data } from "entity/Data"
import cls from "./Circle.module.scss"

interface ICircleProps {
  diameter: number
  data: Data[]
  tab: number
  setTab: Dispatch<SetStateAction<number>>
  className?: string
}

export const CircleTabsNavigation: React.FunctionComponent<ICircleProps> = ({
  diameter, data, tab, setTab, className
}) => {
  const startAngle = -60
  const [angle, setAngle] = useState<number>(startAngle)
  const [buttons, setButtons] = useState<Data[]>(data)  
  const stepAngle = 360/buttons.length
  
  const setRotateAngle = (i: number, rotateAngle: number, code: number) => {
    setButtons(prev => prev.map(b => {
      b.selected = (b.code === code) || undefined

      return b
    }))
    const privedRotateAngle = (
      rotateAngle - startAngle 
    ) % 360
    if (privedRotateAngle >= 0) {
      if (privedRotateAngle >= 180) {
          setAngle(prev => prev += (360 - privedRotateAngle))
      } else {
          setAngle(prev => prev -= privedRotateAngle)
      }
    } else {
      if (privedRotateAngle >= -180) {
        setAngle(prev => prev += -privedRotateAngle)
      } else {
        setAngle(prev => prev -= 360 + privedRotateAngle)
      }
    }
    setTab(i)
  }

  useEffect(() => {
    setRotateAngle(tab, angle + (tab)*stepAngle, buttons[tab].code)
  }, [tab])

  return (
    <div className={classNames(
      cls.circleWrapper,
      className
    )}>
      <div className={cls.circle}
        style={{
          height: diameter,
          width: diameter
        }}
      >
        {
          buttons.map((b, i) => (
            <Button 
              active={b.selected ?? false}
              code={b.code}
              radius={diameter/2}
              angle={angle + (i)*stepAngle}
              setAngle={() => setRotateAngle(i, angle + (i)*stepAngle, b.code)}
              key={b.code}
              title={b.title}
            />
          ))
        }
      </div>
    </div>
  )
}
