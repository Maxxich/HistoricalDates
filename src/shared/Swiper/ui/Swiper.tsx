import { useCallback, useRef, useState } from "react"
import classNames from "classnames"
import { useMediaQuery } from "react-responsive"
import { Navigation, Pagination as PaginationModule } from "swiper/modules"
import { Swiper as SwiperElement, SwiperSlide } from "swiper/react"
import { animated, useTransition } from "@react-spring/web"
import { Slide } from "./Slide/Slide"
import { Button } from "./Button/Button"
import { Data } from "entity/Data"
import "swiper/css"
import "swiper/scss/pagination"
import "./Swiper.scss"
import cls from "./Swiper.module.scss"

interface IAboutProps {
  data: Data[]
  tab: number
  className?: string
}

export const Swiper: React.FunctionComponent<IAboutProps> = ({
  data, tab, className
}) => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null)
  const [isEnd, setIsEnd] = useState<boolean>()
  const [isStart, setIsStart] = useState<boolean>()
  const isMedium = useMediaQuery({ query: "(width >= 500px)" })
  const isBig = useMediaQuery({ query: "(width >= 750px)" })
  const isDesktop = useMediaQuery({ query: "(width >= 1140px)" })
  const transitions = useTransition(tab, {
    from: { opacity: 0, y: 5 },
    enter: { 
      opacity: 1, 
      y: 0, 
      delay: 400,
      config: {
        duration: 100
      } 
    },
    leave: { 
      opacity: 0, 
      y: 0, 
      delay: 0,
      config: {
        duration: 100
      }
    },
    exitBeforeEnter: true,
  })
  const slidesPerView = isDesktop ? 3 : isBig ? 2 : isMedium ? 2: 1
  const onReachEnd = () => setIsEnd(true)
  const onReachBeginning = () => setIsStart(true)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
    console.log(sliderRef.current.swiper)
  }, [])

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFromEdge = (swiper: any) => {
    setIsStart(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const prevButton = isMedium && (
    <Button 
      className={cls.prev} 
      variant='previus' 
      onClick={handlePrev} 
      visible={!isStart}
    />
  )

  const nextButton = isMedium && (
    <Button 
      className={cls.next}
      variant='next'
      onClick={handleNext}
      visible={!isEnd}
    />
  )

  return transitions((style, tab) => (
    <animated.div 
      className={classNames(cls.wrapper, className)} 
      style={style}
    >
      {!isMedium && data[tab].title && (
        <span className={cls.title}>
          {data[tab].title}
        </span>
      )}
      {prevButton}
      <SwiperElement
        spaceBetween={50}
        slidesPerView={slidesPerView}
        onReachBeginning={onReachBeginning}
        onReachEnd={onReachEnd}
        onFromEdge={onFromEdge}
        onInit={onFromEdge}
        ref={sliderRef}
        modules={[Navigation, PaginationModule]}
        pagination={{ clickable: true }}
        className={cls.swiper}
      > 
        {
          data[tab].facts.map((fact, i) => (
            <SwiperSlide key={i}>
              <Slide 
                text={fact.text}
                year={fact.year}
              />
            </SwiperSlide>
          ))
        }
      </SwiperElement>
      {nextButton}
    </animated.div>
  ))
}



