import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import JDate from "jalali-date";

const jdate = new JDate();

const MonthlySchedule = () => {
  return (
    <>
      <Head>
        <title>برنامه ماهیانه</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body cardBodyPadding">
              <div className="monthContainer align-items-center gap-4">
                <button className="btn">
                  <i className="fa fa-angle-right"></i>
                </button>
                {jdate.format("MMMM YYY")}
                <button className="btn">
                  <i className="fa fa-angle-left"></i>
                </button>
              </div>
              <div className="timeTable">
                <table>
                  <tr className="tableHeader">
                    <th className="timeTableHeader">شنبه</th>
                    <th className="timeTableHeader">یکشنبه</th>
                    <th className="timeTableHeader">دوشنبه</th>
                    <th className="timeTableHeader">سه شنبه</th>
                    <th className="timeTableHeader">چهارشنبه</th>
                    <th className="timeTableHeader">پنجشنبه</th>
                    <th className="timeTableHeader">جمعه</th>
                  </tr>
                  <tr className="tableRow">
                    <td className="cells noRightBorder">
                      1
                      <div className="scheduleFeatures">
                        <i className="d-flex   flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      2
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      3
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      4
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      5
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      6
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells noLeftBorder">
                      7
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                  </tr>
                  <tr className="tableRow">
                    <td className="cells noRightBorder">
                      8
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      9
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      10
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      11
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      12
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      13
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells noLeftBorder">
                      14
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                  </tr>
                  <tr className="tableRow">
                    <td className="cells noRightBorder">
                      15
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      16
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      17
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      18
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      19
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      20
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells noLeftBorder">
                      21
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                  </tr>
                  <tr className="tableRow">
                    <td className="cells noRightBorder">
                      22
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      23
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      24
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      25
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      26
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells">
                      27
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells noLeftBorder">
                      28
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                  </tr>
                  <tr className="tableRow">
                    <td className="cells noRightBorder noBottomBorder">
                      29
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells noBottomBorder">
                      30
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                    <td className="cells noBottomBorder">
                      31
                      <div className="scheduleFeatures">
                        <i className="d-flex flex-column">
                          <button className="btn">
                            <FeatherIcon icon="settings" />
                          </button>
                          <button className="btn">
                            <FeatherIcon icon="copy" />
                          </button>
                        </i>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MonthlySchedule;
