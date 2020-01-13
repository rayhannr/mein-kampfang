import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import {AuthContext} from './shared/context/auth-context'
import {ThemeContext} from './shared/context/theme-context'
import {useAuth} from './shared/hooks/auth-hook'
import {useTheme} from './shared/hooks/theme-hook'
import LoadingSpinner from './shared/components/UI/LoadingSpinner'

const Users = React.lazy(() => import('./user/pages/Users'))
const Places = React.lazy(() => import('./places/pages/Places'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const PlaceDetail = React.lazy(() => import('./places/pages/PlaceDetail'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./user/pages/Auth'))

const App = () => {
  const {userId, token, login, logout} = useAuth()
  const {theme, isDark, themeChanger} = useTheme()

  let routes = !token ? (
    <Switch>
      <Route path="/" component={Places} exact />
      <Route path="/all-users" component={Users} exact />
      <Route path="/places/item/:placeId" component={PlaceDetail} exact />
      <Route path="/:userId/places" component={UserPlaces} exact />
      <Route path="/login" component={Auth} />
      <Redirect to="/login" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" component={Places} exact />
      <Route path="/all-users" component={Users} exact />
      <Route path="/places/item/:placeId" component={PlaceDetail} exact />
      <Route path="/:userId/places" component={UserPlaces} exact />
      <Route path="/places/new" component={NewPlace} exact />
      <Route path="/places/:placeId" component={UpdatePlace} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <ThemeContext.Provider value={{theme: theme, isDark: isDark, themeChanger: themeChanger}}>
      <AuthContext.Provider value={{isLogin: !!token, token: token, userId: userId, login: login, logout: logout}}>
        <Router>
          <MainNavigation />
          <main>
            <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>{routes}</Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
