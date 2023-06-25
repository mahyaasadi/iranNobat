import { useState, useEffect } from "react";
import axios from "axios";

const Sections = () => {
  const [sectionsData, setSectionsData] = useState([]);
  //get sections
  const getSections = () => {
    let url = "https://irannobat.ir:8444/api/Modality/getAll";

    axios.get(url).then(function (response) {
      console.log(response.data);
      setSectionsData(response.data);
      //   console.log(sectionsData);
    });
  };

  useEffect(() => {
    try {
      getSections();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <fieldset className="checkbox-group">
        <legend class="checkbox-group-legend">
          بخش مورد نظر را انتخاب فرمائید
        </legend>
        <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label">text</span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div>

        {/*  */}
        <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div>

        {/*  */}
        <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div>

        {/*  */}
        <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
export default Sections;
