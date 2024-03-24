import Header from '../Header'
import {withRouter} from 'react-router-dom'
import './index.css'

const Home = (props) => {
    
    const goToFindJobPage = () => {
        const {history} = props
        history.push('/jobPage')
    }

    return(
    <>
        <Header/>
        <div className="homePage-container">
            <div className="homePageContent-container">
                <h1 className="homePage-heading">Find The Jobs That Fits Your Life</h1>
                <p className="homePage-para">Millions of people are searching for jobs, salary information, company reviews.
                    Find the job the fits your abilities and potential
                </p>
                <button type="button" className="findJobBtn" onClick={goToFindJobPage}>Find Jobs</button>
            </div>
        </div>
    </>
    
)
}

export default withRouter(Home)