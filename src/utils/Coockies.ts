/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import cookies from 'js-cookie'
import { User } from 'models/User'

export class Coockies {
  static updateUserInfo(userInfo: string): void {
    cookies.set('user-info', userInfo, {
      expires: 1
    })
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
}
