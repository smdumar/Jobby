import {Component} from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6"
import { IoBriefcase } from "react-icons/io5"
import { TailSpin } from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
    initial : 'INITIAL',
    success : 'SUCCESS',
    failure : 'FAILURE'
}

class JobDetail extends Component {

    state = {
        apiStatus: apiStatusConstant.initial,
        jobData:{},
        similarJobData:[],
        isLoading: true
    }

    componentDidMount(){
        this.getJobDetails()
    }

    formattedJobData = data => ({
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        lifeAtCompany: {
            description: data.life_at_company.description,
            imageUrl: data.life_at_company.image_url
        },
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        title: data.title,
        skills: data.skills.map( each => ({
            imageUrl: each.image_url,
            name: each.name
        })),
    })

    formattedSimilarData = (data) => ({
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        location: data.location,
        rating: data.rating,
        title: data.title,
    })

    getJobDetails = async () => {
        this.setState({apiStatus: apiStatusConstant.initial,})
        const {match} = this.props
        const {params} = match
        const {id} = params

        const token = Cookies.get('jwtToken')
        const url = `https://apis.ccbp.in/jobs/${id}`
        const option ={
            method: 'GET',
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

        const response = await fetch(url, option)
        
        if(response.ok === true){
            const data = await response.json()

            const updatedData = this.formattedJobData(data.job_details) 
            
            const SimilarJob = data.similar_jobs.map( (eachSimilarJob) => (
                this.formattedSimilarData(eachSimilarJob)
            ))     
            this.setState({jobData:updatedData, apiStatus:apiStatusConstant.success, similarJobData: SimilarJob, isLoading:false})
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

    renderJob = () => {
        const {jobData} = this.state
        const {companyLogoUrl,location, rating, title, packagePerAnnum, jobDescription, employmentType, skills, lifeAtCompany} = jobData
        const {description, imageUrl} = lifeAtCompany

        return(
        <>

            <div className="jobDetail-and-titleContainer">
                <img src={companyLogoUrl} alt='logo' className="jobDetailCompanyLogo"/>
                <div className="jobDetailTitleContainer">
                    <h1 className="jobDetailJobTitle">{title}</h1>
                    <div className="jobDetailRatingContainer">
                        {/* <FontAwesomeIcon icon="fa-duotone fa-star" className="ratingStarImg"/> */}
                        <h1 className="jobDetailRating">{rating}</h1>
                    </div>
                </div>
            </div>

            <div className="jobDetailLocationAndEmployment-and-salaryContainer">    
                <div className="jobDetailLocation-and-employmentContainer">
                    <div className="jobDetailLocationContainer">
                        <FaLocationDot className="jobDetailLocationIcon"/>
                        <h3 className="jobDetailLocation">{location}</h3>
                    </div>
                    <div className="jobDetail-employmentType-Container">
                        <IoBriefcase className="jobDetailTypeIcon"/>
                        <h3 className="jobDetail-employmentType">{employmentType}</h3>
                    </div>
                </div>
    
                <div className="jobDetailSalaryContainer">
                    <h1 className="jobDetailSalary">{packagePerAnnum}</h1>
                </div>
            </div>

            <hr/>
    
            <div className="jobDetailDescription-container">
                <h1 className="jobDetailTitle">Description</h1>
                <p className="jobDetailDescription">{jobDescription}</p>
            </div>

            <div className="jobDetails-skillsContainer">
                <h1 className="jobDetailTitle">Skills</h1>
                <ul className="jobDetail-skill-ulContainer">{
                    skills.map( eachSkills => (
                        <li key={eachSkills.name} className="jobDetail-skillList">
                            <img src={eachSkills.imageUrl} alt='skillImg' className="jobDetail-skillImg"/>
                            <h2 className="jobDetail-skillName">{eachSkills.name}</h2>
                        </li>
                    ))
                    }</ul>
            </div>

            <div className="jobDetails-lifeAtCompany-container">
                <div className="jobDetails-lifeAtCompany-content">
                <h1 className="jobDetailTitle">Life at Company</h1>
                <p className="jobDetailDescription">{description}</p>
                </div>
                <img src={imageUrl} alt='lifeAtCompany' className="jobDetails-lifeAtCompany-img"/>
            </div>
        </>

        
        )
    }

    renderSimilarJobDetail = () => {
        const {similarJobData} = this.state
        console.log(similarJobData)
        return(

            <div className="jobDetails-similarJob-container">

                {similarJobData.map( (eachSimilar) => (
                <Link to={`${eachSimilar.id}`} className="link">

                <div  className="jobDetails-similarJob-detailContainer">                    
                <div className="jobImg-and-titleContainer">
                        <img src={eachSimilar.companyLogoUrl} alt='logo' className="companyLogo"/>
                        <div className="JobTitleContainer">
                            <h1 className="jobTitle">{eachSimilar.title}</h1>
                            <div className="jobRatingContainer">
                                
                                <h1 className="jobRating">{eachSimilar.rating}</h1>
                            </div>
                        </div>
                </div>

                <hr/>

                <div className="jobDescription-container">
                    <h1 className="jobDescriptionTitle">Description</h1>
                    <p className="jobDescription">{eachSimilar.jobDescription}</p>
                </div>

                <div className="jobLocationAndEmployment-and-salaryContainer">
        
                    <div className="jobLocation-and-employmentContainer">
                        <div className="jobLocationContainer">
                            <FaLocationDot className="jobLocationIcon"/>
                            <h3 className="jobLocation">{eachSimilar.location}</h3>
                        </div>
                        <div className="job-employmentType-Container">
                            <IoBriefcase className="jobTypeIcon"/>
                            <h3 className="job-employmentType">{eachSimilar.employmentType}</h3>
                        </div>
                    </div>
                </div>
                </div>
                </Link>

            ))}</div>

            
        )
    }

    renderAllJobs = () => (
        <>
            <div className="jobDetailContainer">
                {this.renderJob()}
            </div>
            <div className="jobData-similarJob-container">
                <h1 className="jobDescriptionTitle">Similar Jobs</h1>
                {this.renderSimilarJobDetail()}
            </div>

        </>
    )

    renderJobDetailFailureView = () => (
        <div className="JobDetail-failureView-container">
            <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' alt=' failure view' className="JobDetail-failureView-img"/>
            <h1 className="JobDetail-failureView-heading">Oops! Something Went Wrong</h1>
            <p className="JobDetail-failureView-para">We cannot seem to find the page you are looking for</p>
            <button type='button' className="JobDetail-failureView-retryBtn">Retry</button>
        </div>
    )

    renderJobDetail = () => {
        const {apiStatus} = this.state

        switch (apiStatus) {
            case apiStatusConstant.initial:
                return this.renderLoading()
            case apiStatusConstant.success:
                return this.renderAllJobs()
            case apiStatusConstant.failure:
                return this.renderJobDetailFailureView()        
            default:
                return null;
        }
    }


        render(){
            return(
                <div className="jobDetails">
                    <Header/>
                    <div className="jobDetailPage">
                        {this.renderJobDetail()}
                    </div>
                </div>
        
            )
        }
}

export default JobDetail