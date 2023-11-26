import classNames from "classnames"
import { formatNumbers } from "../utils/formatNumber"
import cls from "./TabNavigation.module.scss"

interface ITabNavigationProps {
  setNextTab: () => void
  setPreviusTab: () => void
  tab: number
  totalTabs: number
  className?: string
}

export const TabNavigation: React.FunctionComponent<ITabNavigationProps> = ({
  setNextTab, setPreviusTab, tab, totalTabs, className
}) => {
  return (
    <div className={classNames(cls.TabNavigation, className)}>
      <span className={cls.tabsCounter}>
        {formatNumbers(tab + 1)}/{formatNumbers(totalTabs)}
      </span>
      <div className={cls.buttons}>
        <button 
          className={cls.Button} 
          onClick={setPreviusTab}
        />
        <button 
          className={classNames(cls.Button, cls.rotated)} 
          onClick={setNextTab}
        />
      </div>
    </div>
  )
}
