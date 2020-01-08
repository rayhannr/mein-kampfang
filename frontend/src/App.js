import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import Users from './user/pages/Users'
import Places from './places/pages/Places'
import NewPlace from './places/pages/NewPlace'
import PlaceDetail from './places/pages/PlaceDetail'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import {AuthContext} from './shared/context/auth-context'
import {useAuth} from './shared/hooks/auth-hook'

const App = () => {
  const {userId, token, login, logout} = useAuth()

  let routes = !token ? (
    <Switch>
      <Route path="/" component={Users} exact />
      <Route path="/all-places" component={Places} exact />
      <Route path="/places/item/:placeId" component={PlaceDetail} exact />
      <Route path="/:userId/places" component={UserPlaces} exact />
      <Route path="/login" component={Auth} />
      <Redirect to="/login" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" component={Users} exact />
      <Route path="/all-places" component={Places} exact />
      <Route path="/places/item/:placeId" component={PlaceDetail} exact />
      <Route path="/:userId/places" component={UserPlaces} exact />
      <Route path="/places/new" component={NewPlace} exact />
      <Route path="/places/:placeId" component={UpdatePlace} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <AuthContext.Provider value={{isLogin: !!token, token: token, userId: userId, login: login, logout: logout}}>
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
