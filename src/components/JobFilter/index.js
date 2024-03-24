import './index.css'

const JobFilter = (props) => {

    const renderEmploymentTypeFunction = () => {
        const {employmentTypeList} = props
        return employmentTypeList.map( (eachEmploymentList) => {

            const {activeEmploymentType} = props

            const onChangeEmploymentList = (event) => {
                activeEmploymentType(eachEmploymentList.employmentTypeId)
            }
            return(
                <li className="JobFilter-list" key={eachEmploymentList.employmentTypeId} onChange={onChangeEmploymentList}>
                    <input type='checkbox' className="JobFilterInput" id={eachEmploymentList.employmentTypeId} />
                    <label htmlFor={eachEmploymentList.employmentTypeId} className="JobFilter-label">{eachEmploymentList.label}</label>
                </li>
            )
        })
                
        
    }

    const renderSalaryRangeFunction = () => {
        const {salaryRangeList} = props
        return salaryRangeList.map( (eachSalaryRange) => {
            const {activeSalaryRange} = props
            const onChangeSalaryRange = () => {
                activeSalaryRange(eachSalaryRange.salaryRangeId)
            }
            return(
                <li className="JobFilter-list">
                    <input type='radio' className="JobFilterInput" id={eachSalaryRange.salaryRangeId} name="salaryRange"/>
                    <label htmlFor={eachSalaryRange.salaryRangeId} className="JobFilter-label" onClick={onChangeSalaryRange}>{eachSalaryRange.label}</label>
                </li>        
            )
        })
    }     

    const renderEmploymentType = () =>(
        <div className="JobFilter-container">
            <h1 className="JobFilter-heading">Type of Employment</h1>
            <ul className="JobFilter-ulContainer">{renderEmploymentTypeFunction()}</ul>
            <hr/>
        </div>
    )

    const renderSalaryRange = () => (
        <div className="JobFilter-container">
            <h1 className="JobFilter-heading">Salary Range</h1>
            <ul className="JobFilter-ulContainer">{renderSalaryRangeFunction()}</ul>
            <hr/>
        </div>
    )


    return(
        <div>
            {renderEmploymentType()}
            {renderSalaryRange()}
        </div>
    )
}

export default JobFilter