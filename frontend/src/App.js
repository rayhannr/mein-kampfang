import React, {useState, useCallback} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import {AuthContext} from './shared/context/auth-context'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let routes = !isLoggedIn ? (
    <Switch>
      <Route path="/" component={Users} exact />
      <Route path="/:userId/places" component={UserPlaces} exact />
      <Route path="/login" component={Auth} />
      <Redirect to="/login" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" component={Users} exact />
      <Route path="/:userId/places" component={UserPlaces} exact />
      <Route path="/places/new" component={NewPlace} exact />
      <Route path="/places/:placeId" component={UpdatePlace} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <AuthContext.Provider value={{isLogin: isLoggedIn, login: login, logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
