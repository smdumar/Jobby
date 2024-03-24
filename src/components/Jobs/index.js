import {Link} from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6"
import { GiSuitcase } from "react-icons/gi"
import './index.css'



const Jobs = props => {
    
    const renderJob = () => {
        const {jobs} = props
        const {company_logo_url, employment_type, job_description, location, package_per_annum, rating, title, id} = jobs
        return(
        <>
        <Link to={`/jobs/${id}`} className="link">
            <div className="jobImg-and-titleContainer">
                <img src={company_logo_url} alt='logo' className="companyLogo"/>
                <div className="JobTitleContainer">
                    <h1 className="jobTitle">{title}</h1>
                    <div className="jobRatingContainer">
                        {/* <FontAwesomeIcon icon="fa-duotone fa-star" className="ratingStarImg"/> */}
                        <h1 className="jobRating">{rating}</h1>
                    </div>
                </div>
            </div>
    
            <div className="jobLocationAndEmployment-and-salaryContainer">
    
                <div className="jobLocation-and-employmentContainer">
                    <div className="jobLocationContainer">
                        <FaLocationDot className="jobLocationIcon"/>
                        <h3 className="jobLocation">{location}</h3>
                    </div>
                    <div className="job-employmentType-Container">
                        <GiSuitcase className="jobTypeIcon"/>
                        <h3 className="job-employmentType">{employment_type}</h3>
                    </div>
                </div>
    
                <div className="jobSalaryContainer">
                    <h1 className="jobSalary">{package_per_annum}</h1>
                </div>
            </div>
    
            <hr/>
    
            <div className="jobDescription-container">
                <h1 className="jobDescriptionTitle">Description</h1>
                <p className="jobDescription">{job_description}</p>
            </div>
            </Link>
        </>
        )
    }

    return(
    <div className="jobContainer">
        {renderJob()}    
    </div>
)
}
export default Jobs