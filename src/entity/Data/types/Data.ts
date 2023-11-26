export interface Fact {
  year: number
  text: string
}

export interface Data {
  code: number,
  selected?: boolean
  startYear: number
  finishYear: number
  facts: Fact[]
  title?: string 
}
