const DepartmentItem = ({ data }) => {
    return (
        <div className="checkbox">
            <label className="checkbox-wrapper">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-tile">
                    <span className="checkbox-icon"></span>
                    <span className="checkbox-label">{data.FullName}</span>
                </span>
            </label>
        </div>
    )
}
export default DepartmentItem