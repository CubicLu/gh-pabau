import { OptionType } from '@pabau/ui'

export interface ActionProp {
  key: string
  text: string
  icon: React.ReactNode
  events?: ActionEventProp[]
}

export interface ActionEventProp {
  key: string
  text: string
  subtext: string
}

export interface IfProp {
  id: number
  answer: string
  operator: string
  condition: string
  conditionType: string
  conditionValues: OptionType[]
}

export interface ThenProp {
  id: number
  action: string
  template: string
  to: string
  from: string
  event?: string
}

export interface IfObjProp {
  condition_met: string
  answers: IfProp[]
}

export interface RuleProp {
  id: number
  collapsed: boolean
  name: string
  if: IfObjProp
  then: ThenProp[]
}

export interface AnswerItem {
  id: string
  answer: string
}
