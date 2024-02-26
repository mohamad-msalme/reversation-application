/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import cookies from 'js-cookie'
import { User } from 'models/User'
import { SignInFormType } from 'src/schemas'

export class Coockies {
  static updateUserInfo(userInfo: string): void {
    cookies.set('user-info', userInfo, {
      expires: 1
    })
  }
  //
  static getUserInfo() {
    //
    const userInfo = cookies.get('user-info')
    try {
      const parsedVal = userInfo ? (JSON.parse(userInfo) as User) : undefined
      return parsedVal
    } catch (error) {
      return undefined
    }
  }

  static removeUserInfo() {
    cookies.remove('user-info')
  }

  static updateUserCradintional(val: SignInFormType) {
    cookies.set('user-cradintional', JSON.stringify(val))
  }

  static removeUserCradintional() {
    cookies.remove('user-cradintional')
  }

  static getUserCradintional(): SignInFormType {
    const userCradintional = cookies.get('user-cradintional')
    try {
      const parsedVal = userCradintional
        ? (JSON.parse(userCradintional) as SignInFormType)
        : undefined
      return (
        parsedVal ?? {
          email: '',
          password: '',
          rememberMe: false
        }
      )
    } catch (error) {
      return {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  }
}
