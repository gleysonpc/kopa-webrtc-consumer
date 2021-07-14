import { Route, Switch } from 'react-router-dom'
import Consumer from '../pages/Consumer'
import SignIn from '../pages/SignIn'
import PrivateRoute from './PrivateRoute'

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute path="/" component={Consumer} exact />
            <Route path="/signin" component={SignIn} />
        </Switch>
    )
}
