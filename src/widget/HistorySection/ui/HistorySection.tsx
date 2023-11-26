import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { TabNavigation } from "shared/TabNavigation"
import { AnimatedYears } from "shared/AnimatedYears"
import { Header } from "shared/Header"
import { Swiper } from "shared/Swiper"
import { CircleTabsNavigation } from "shared/CircleTabNavigation"
import { Data } from "entity/Data"
import cls from "./HistorySection.module.scss"

interface IHistorySectionProps {
  data: Data[]
}

export const HistorySection: React.FunctionComponent<IHistorySectionProps> = ({
  data
}) => {

  const [tab, setTab] = useState<number>(0)

  const isMediumScreen = useMediaQuery({ query: "(width >= 500px)" })
  const isBigScreen = useMediaQuery({ query: "(width >= 750px)" })
  const isDesktop = useMediaQuery({ query: "(width >= 1140px)" })

  const setNextTab = () => setTab((prev) => {
    if ((prev + 1) === data.length) {
      return 0
    } else return prev + 1
  })

  const setPreviusTab = () => setTab((prev) => {
    if ((prev) === 0) {
      return data.length - 1
    } else return prev - 1
  })

  const startYear = data[tab].startYear
  const finishYear = data[tab].finishYear

  const diameter = isDesktop ? 530 : isBigScreen ? 370 : 220

  return (
    <section className={cls.section}>
      <Header className={cls.header}>
        Исторические<br/>даты
      </Header>
      <CircleTabsNavigation 
        diameter={diameter}
        data={data}
        tab={tab}
        setTab={setTab}
        className={cls.circle}
      />      
      <AnimatedYears 
        finishYear={finishYear}
        startYear={startYear}
        className={cls.years}
      />
      {
        isMediumScreen ? (
          <>
            <TabNavigation
              setNextTab={setNextTab}
              setPreviusTab={setPreviusTab}
              tab={tab}
              totalTabs={data.length}
              className={cls.TabNavigation}
            />
            <Swiper data={data} tab={tab} className={cls.swiper}/>
          </>
        ) : (
          <div className={cls.swiper_navigation}>
            <Swiper data={data} tab={tab} className={cls.swiper}/>
            <TabNavigation
              setNextTab={setNextTab}
              setPreviusTab={setPreviusTab}
              tab={tab}
              totalTabs={data.length}
              className={cls.TabNavigation}
            />
          </div>
        )
      }
    </section>
  )
}
