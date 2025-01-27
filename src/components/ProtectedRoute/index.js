import {Redirect, Route, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
    const token = Cookies.get('jwtToken')

    if(token === undefined){
        return<Redirect to = "/login" />
    }
    return(
        <Route {...props}/>
    )
}

export default withRouter(ProtectedRoute)