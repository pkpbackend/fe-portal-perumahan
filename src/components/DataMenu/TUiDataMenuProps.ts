import { MenuProps } from "antd"
import { RefObject } from "react"

export interface TItem {
  id: string
  url?: string
  title: string
  icon?: Object
  disabled?: boolean
  hidden?: boolean
  children?: Array<TItem>
}

export interface TMenuProps {
  ref?: RefObject<any>
  dataSource: Array<TItem>
  className?: string
  onSelectMenu?: (val: any) => void
}

export interface TMenuPropsCustom {
  ref?: RefObject<any>
  dataSource: Array<TItem>
  className?: string
  onSelectMenu?: (val: any) => void
  selected?: any
}

export type TUiDataMenuProps = MenuProps & TMenuProps
export type TUiDataMenuCustomProps = MenuProps & TMenuPropsCustom
