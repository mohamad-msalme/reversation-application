import { useLocalStorage } from './useLocalStorage'

export const useAuth = () => {
  const { value, setValue } = useLocalStorage('isAuth', false)
  return {
    isAuthnicated: value,
    setIsAuthinicated: setValue
  }
}
