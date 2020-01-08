import {useState, useCallback, useEffect} from 'react'

let logoutTimer

export const useAuth = () => {
    const [token, setToken] = useState()
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpiresIn = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpiresIn)
    localStorage.setItem(
      'userData',
      JSON.stringify({userId: uid, token: token, expiration: tokenExpiresIn.toISOString()})
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if(token && tokenExpirationDate){
      const expiresIn = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, expiresIn)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, tokenExpirationDate, logout])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  return {userId, token, login, logout}
}