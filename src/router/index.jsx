import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../page/Home'

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routers
