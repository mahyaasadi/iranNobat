import DepartmentItem from "components/dashboard/departments/departmentItem"

const DepartmentsList = ({ departmentsData }) => {
    return (
        <>
            {departmentsData?.map((departmentData, index) => (
                <DepartmentItem key={index} data={departmentData}/>
            ))
            }
        </>
    )
}
export default DepartmentsList