import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component{

    state={
        username: '',
        password:'',
        isLoginFail: false,
        errorMsg:''    
    }

    onChangeUsername = (event) => (
        this.setState({username:event.target.value})
    )

    onChangePassword = (event) => (
        this.setState({password:event.target.value})
    )

    successLogin = (jwtToken) => {
        const token = Cookies.set('jwtToken', jwtToken, { expires: 30 });

        const {history} = this.props
        history.replace('/')
    }

    formSubmit = async (event) => {
        event.preventDefault()
        const {username, password} =this.state

        const user = {username, password}

        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(user)
        }
        
        const response = await fetch(url, options)
        const data = await response.json()

        if(response.ok === true){
            this.successLogin(data.jwt_token)
        }
        else{
            this.setState({isLoginFail:true, errorMsg:data.error_msg})
        }

    }

    renderLoginForm = () => {
        const {username, password, errorMsg, isLoginFail} = this.state

        return(
        <form className="formContainer" onSubmit={this.formSubmit}>

            <div className="loginImg-container">
                <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website logo' className="loginImg"/>
            </div>

            <div className="input-container">
                <label className="label" htmlFor='usernameInput'>USERNAME</label>
                <input type='text' id="usernameInput" placeholder='Username' onChange={this.onChangeUsername} value={username} className="input"/>
            </div>

            <div className="input-container">
                <label className="label" htmlFor='passwordInput'>PASSWORD</label>
                <input type='password' id="passwordInput" placeholder='Password' onChange={this.onChangePassword} value={password} className="input"/>
            </div>

            <button type='submit' className="loginButton">Login</button>
            {isLoginFail && <p className="loginErrorMsg">*{errorMsg}</p>}

        </form>
    )
    }

    render(){
        const token = Cookies.get('jwtToken')
        
        if (token !== undefined){
            return <Redirect to='/'/>
        }

        return(
            <div className="LoginPage-container">
                {this.renderLoginForm()}
            </div>
        )
    }
}
export default Login