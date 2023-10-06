export type UserPayloadObject = {
  name: string
  email: string
  avatar: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}
export type requestOptions = {
  method: string
  body: object
  redirect: string
}
export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id: any
imgURL:string
isAudio: boolean
  name: string
  city: string
url:string
  email: string
  price:number
  phoneNumber: string
  nickName: string
  levelOfExperience: string
  referingPoints: any
  created_at: string
  created_mm_dd_yyyy: string
  active: boolean
  imgUrl: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  title: string
  target: string
  isVerfy: boolean
  imageUrl: string
  isDoubleVerfy: boolean
  traders: number
  users: number
  toper: number
  Course: { titleEn: string }
}

export type CQ = {
  id: number
  questionAR: string
  answerEN: string
  questionEn: string
  answerAR: string
  active: boolean
  created_at: string
}

export type Copon = {
  id: any
  text: string
  percentage: string
  constValue: string
  target: string
  active: boolean
  availableFor: string
  created_at: string
  value: any
  end_at: any
}

export type Notification = {
  id: number
  created_at: string
  title: string
  message: string
  target: string
  sendDate: string
  active: boolean
  status: string
}

export type Token = {
  id: number
  token: string
  expire_at: string
  course: {
    titleAr: string
  }
  created_at: string
  active: boolean
}

export type Ads = {
  id: number
  company: string
  titleAr: string
  titleEn: string
  url: string
  imgUrl: string
  descriptionAr: string
  descriptionEn: string
  endAt: string
  active: string
  created_at: string
}

export type Payments = {
  id: any
  title: string
  description: string
  detail1: string
  detail2: string
  active: boolean
  created_at: string
}

export type Enrollment = {
  id: number
  subCourse: {
    titleAr: string
  }
  constractor: {
email:string
    name: string
  }
  status: string
  finished: string
  repeated: string
  active: boolean
  token: string
  created_at: string
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  name: string
  email: string
}
