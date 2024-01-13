import { User } from 'models/User'
import { Coockies } from 'utils/Coockies'
import { useNavigate } from 'react-router'

export const useSuccessAuth = () => {
  const navigation = useNavigate()
  return (data: User) => {
    Coockies.updateUserInfo(JSON.stringify(data))
    navigation('/home', {
      state: 'fromAuth'
    })
    return true
  }
}
