import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import { IoSearch } from "react-icons/io5"
import Profile from '../Profile'
import JobFilter from '../JobFilter'
import { TailSpin } from 'react-loader-spinner'
import './index.css'
import Jobs from '../Jobs'

const apiStatusConstant = {
    initial : 'INITIAL',
    success : 'SUCCESS',
    failure : 'FAILURE'
}

const employmentTypeList = [
{
    label: 'Full TIme',
    employmentTypeId :  'FULLTIME'
},
{
    label: 'Part TIme',
    employmentTypeId :  'PARTTIME'
},
{
    label: 'Freelance ',
    employmentTypeId :  'FREELANCE'
},
{
    label: 'Internship',
    employmentTypeId :  'INTERNSHIP'
}
]

const salaryRangeList = [
    {
        salaryRangeId: '1000000',
        label: '10 LPA & above'
    },
    {
        salaryRangeId: '2000000',
        label: '20 LPA & above'
    },
    {
        salaryRangeId: '3000000',
        label: '30 LPA & above'
    },
    {
        salaryRangeId: '4000000',
        label: '40 LPA & above'
    }
]

class JobPage extends Component{

    state={
        apiStatus: apiStatusConstant.initial,
        jobs:[],
        searchedJob: '',
        employmentType: [],
        salaryRange: '',
        isLoading: true,
    }

    activeEmploymentType = (employmentTypeId) => {
        const {employmentType} = this.state
        this.setState(prevState => ({employmentType: [...prevState.employmentType, employmentTypeId]}), this.getJobDetails)

        if(employmentType.includes(employmentTypeId)){
            this.setState(prevState => ({employmentType:[...prevState.employmentType.filter( (item) => item !== employmentTypeId)]}))
        }
    }

    activeSalaryRange = (salaryRangeId) => {
        this.setState({salaryRange:salaryRangeId}, this.getJobDetails)
    }

    onSearchJob = (event) => {
        this.setState({searchedJob: event.target.value})
    }

    searchKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.getJobDetails()
        }
    }

    searchBtn = () => {
        this.getJobDetails()
    }

    retryBtn = () => {
        this.setState({searchedJob: '', employmentType: [], salaryRange: '',}, this.getJobDetails)
    }

    componentDidMount(){
        this.getJobDetails()
    }
    
    getJobDetails = async () =>{
        const {employmentType, salaryRange, searchedJob} = this.state
        this.setState({apiStatus: apiStatusConstant.initial,})
        const token = Cookies.get("jwtToken")
        const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchedJob}`
        const options = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

        const response = await fetch(url, options)
        if(response.ok === true){
            const data = await response.json()
            this.setState({jobs:data.jobs, apiStatus:apiStatusConstant.success, isLoading:false})
        }
        else{
            this.setState({apiStatus:apiStatusConstant.failure, isLoading:false})
        }
    }

    renderLoading = () => (
        <div className='profilePage-loading'>
            <TailSpin visible={true} height="50" width="50" color="#6366f1" ariaLabel="tail-spin-loading" radius="2" wrapperStyle={{}}
                wrapperClass="" />
        </div>
    )

    renderSearchContainer = () => {
        const {searchedJob} = this.state
        return(
        <div className="jobSearchBar-container">
            <input type='search' placeholder='Search Jobs' className="jobSearchBar" onKeyDown={this.searchKeyDown} onChange={this.onSearchJob} value={searchedJob}/>
            <IoSearch role='button' className="searchIcon" onClick={this.searchBtn}/>
        </div>
        )
    }
    
    renderJobContainer = () => {
        const {jobs, isLoading} = this.state
        return(
            <>
                {isLoading ? this.renderLoading() : jobs.map( eachJobs => (
                    <Jobs key={eachJobs.id} jobs={eachJobs}/>
                ))}
            </>
            
        )
    }

    renderJobPageFailureView = () => (
        <div className="jobPage-failureView-container">
            <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' alt=' failure view' className="jobPage-failureView-img"/>
            <h1 className="jobPage-failureView-heading">Oops! Something Went Wrong</h1>
            <p className="jobPage-failureView-para">We cannot seem to find the page you are looking for</p>
            <button type='button' className="jobPage-failureView-retryBtn" onClick={this.retryBtn}>Retry</button>
        </div>
    )

    renderJobPage = () => {
        const {apiStatus} = this.state

        switch (apiStatus) {
            case apiStatusConstant.initial:
                return this.renderLoading()
            case apiStatusConstant.success:
                return this.renderJobContainer()
            case apiStatusConstant.failure:
                return this.renderJobPageFailureView()        
            default:
                return null;
        }
    }

    renderJobNotAvailable = () => (
        <div className="noJobImg-container">
            <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt='no jobs' className="noJobImg"/>
            <h1 className="noJobImg-heading">No Jobs Found</h1>
            <p className="noJobImg-para">We could not find ant jobs. Try other filters</p>
        </div>
    )

    render(){
        const {jobs} = this.state
        return (
            <>
                <Header/>
                <div className="jobPage-container">

                    <div className="mobileSearch-container">
                        {this.renderSearchContainer()}  
                    </div>
                    
                    <div className='jobPage-profileAndFilter-container'>
                        <Profile/>
                        <JobFilter employmentTypeList={employmentTypeList} 
                        salaryRangeList={salaryRangeList}
                        activeEmploymentType={this.activeEmploymentType}
                        activeSalaryRange={this.activeSalaryRange}  />
                    </div>

                    <div className='jobPage-searchAndJob-container'>
                        <div className="desktopSearch-container">
                            {this.renderSearchContainer()}  
                        </div>

                        {jobs.length > 0 ? this.renderJobPage() : this.renderJobNotAvailable()}
                    </div>

                </div>
            </>
        )
    }
} 

export default JobPage