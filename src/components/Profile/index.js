import {Component} from 'react'
import { TailSpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component{
    state = {
        user: '',
        role: '',
        userImg: '',
        isLoading: true
    }

    componentDidMount(){
        this.getUserDetails()
    }

    getUserDetails = async () => {
        const token = Cookies.get('jwtToken')
        const url = 'https://apis.ccbp.in/profile'
        const option = {
            method: 'GET',
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

        const response = await fetch(url, option)
        const data = await response.json()

        if(response.ok === true){
            this.setState({user:data.profile_details.name, role:data.profile_details.short_bio, 
            userImg:data.profile_details.profile_image_url, isLoading:false})
        }
}

    renderLoading = () => (
        <div className='profilePage-loading'>
            <TailSpin visible={true} height="50" width="50" color="#6366f1" ariaLabel="tail-spin-loading" radius="2" wrapperStyle={{}}
                wrapperClass="" />
        </div>
    )

    renderProfile = () => {
        const {user, role, userImg} = this.state
        return(
            <>
            <div className="profileContainer">
                <img src={userImg} alt='' className="profileImg"/>
                <div>
                    <h1 className="profile-name">{user}</h1>
                    <p className="profile-role">{role}</p>
                </div>                
            </div>
            <hr/>
            </>
        )
    }

    render(){
        const {isLoading} = this.state

        return(
            <div className="profilePage-container">
                {isLoading ? this.renderLoading(): this.renderProfile()}                
            </div>
        )
    }
}

export default Profile