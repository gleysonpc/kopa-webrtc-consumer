import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/auth'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { signed } = useAuth()
    const isAuthenticated = signed

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}
