import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import JobPage from './components/JobPage'
import JobDetail from './components/JobDetail'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css';

const App = () =>(
    <Switch>
        <Route exact path='/login' component={Login}/>
        <ProtectedRoute exact path='/' component={Home}/>
        <ProtectedRoute exact path = '/jobPage' component={JobPage}/>
        <ProtectedRoute exact path = '/jobs/:id' component={JobDetail}/>
    </Switch>
)


export default App;
