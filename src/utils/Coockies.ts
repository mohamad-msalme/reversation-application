import cookies from 'js-cookie'
import { User } from 'models/User'

export class Coockies {
  static updateUserInfo(userInfo: string): void {
    cookies.set('user-info', userInfo)
  }

  static getUserInfo() {
    const userInfo = cookies.get('user-info')
    try {
      const parsedVal = userInfo ? (JSON.parse(userInfo) as User) : undefined
      return parsedVal
    } catch (error) {
      return undefined
    }
  }

  static updateTheme(theme: string): void {
    cookies.set('user-theme', theme)
  }

  static getTheme() {
    const userTheme = cookies.get('user-theme')
    try {
      const parsedVal = userTheme
        ? (JSON.parse(userTheme) as string)
        : undefined
      return parsedVal
    } catch (error) {
      return undefined
    }
  }
}
