import cls from "./Slide.module.scss"

interface ISlideProps {
  year: number
  text: string
}

export const Slide: React.FunctionComponent<ISlideProps> = ({
  text, year
}) => {
  return (
    <div className={cls.slide}>
      <span className={cls.year}>
        {year}
      </span>
      <p className={cls.p}>
        {text}
      </p>
    </div>
  )
}
