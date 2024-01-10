export interface UserSettings {
  primaryEmail: number
}

export interface User {
  settings: UserSettings
  _id: string
  email: string
  password: string
  accountType: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface SuccessUserResponse {
  success: {
    user: User
  }
}
