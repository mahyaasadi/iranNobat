"use client"; //This is a client component
import "src/assets/css/bootstrap.rtl.min.css";
import "src/assets/css/font-awesome.min.css";
import "src/assets/css/feathericon.min.css";
import "src/assets/plugins/morris/morris.css";
import "src/assets/css/style.css";

const DoctorsList = () => {
  return (
    // <!-- Page Wrapper -->
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* <!-- Page Header --> */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-7 col-auto">
              <h3 className="page-title">پزشکان</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">داشبورد</a>
                </li>
                <li className="breadcrumb-item active">پزشکان</li>
              </ul>
            </div>
            <div className="col-sm-5 col">
              <a
                href="#Add_Specialities_details"
                data-bs-toggle="modal"
                className="btn btn-primary float-end mt-2"
              >
                اضافه کردن
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /Page Header --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>نام</th>
                        <th>عنوان</th>
                        <th>تخصص</th>
                        <th className="text-end">عملیات ها</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#SP001</td>

                        <td>
                          <h2 className="table-avatar">
                            <a
                              className="avatar avatar-sm me-2"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="assets/img/product/product.jpg"
                                alt="product image"
                              ></img>
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              Safi Natural Blood Purifier Syrup 200 ml
                            </a>
                          </h2>
                        </td>

                        <td>$500</td>

                        <td>12-05-2020</td>

                        <td className="text-end">
                          <div className="actions">
                            <a
                              className="btn btn-sm bg-success-light"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <i className="fe fe-pencil"></i> ویرایش
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#delete_modal"
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="fe fe-trash"></i> حذف
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#SP002</td>

                        <td>
                          <h2 className="table-avatar">
                            <a
                              className="avatar avatar-sm me-2"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="assets/img/product/product.jpg"
                                alt="product image"
                              ></img>
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              Safi Natural Blood Purifier Syrup 100 ml
                            </a>
                          </h2>
                        </td>

                        <td>$100</td>

                        <td>12-05-2020</td>

                        <td className="text-end">
                          <div className="actions">
                            <a
                              className="btn btn-sm bg-success-light"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <i className="fe fe-pencil"></i> ویرایش
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#delete_modal"
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="fe fe-trash"></i> حذف
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#SP003</td>

                        <td>
                          <h2 className="table-avatar">
                            <a
                              className="avatar avatar-sm me-2"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="assets/img/product/product.jpg"
                                alt="product image"
                              ></img>
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              Safi Natural Blood Purifier Syrup 50 ml
                            </a>
                          </h2>
                        </td>

                        <td>$600</td>

                        <td>12-05-2020</td>

                        <td className="text-end">
                          <div className="actions">
                            <a
                              className="btn btn-sm bg-success-light"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <i className="fe fe-pencil"></i> ویرایش
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#delete_modal"
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="fe fe-trash"></i> حذف
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#SP004</td>

                        <td>
                          <h2 className="table-avatar">
                            <a
                              className="avatar avatar-sm me-2"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="assets/img/product/product.jpg"
                                alt="product image"
                              ></img>
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              Safi Natural Blood Purifier Syrup 200 ml
                            </a>
                          </h2>
                        </td>

                        <td>$700</td>

                        <td>12-05-2020</td>

                        <td className="text-end">
                          <div className="actions">
                            <a
                              className="btn btn-sm bg-success-light"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <i className="fe fe-pencil"></i> ویرایش
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#delete_modal"
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="fe fe-trash"></i> حذف
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#SP005</td>

                        <td>
                          <h2 className="table-avatar">
                            <a
                              className="avatar avatar-sm me-2"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="assets/img/product/product.jpg"
                                alt="product image"
                              ></img>
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              Safi Natural Blood Purifier Syrup 200 ml
                            </a>
                          </h2>
                        </td>

                        <td>$1200</td>

                        <td>12-05-2020</td>

                        <td className="text-end">
                          <div className="actions">
                            <a
                              className="btn btn-sm bg-success-light"
                              data-bs-toggle="modal"
                              href="#edit_specialities_details"
                            >
                              <i className="fe fe-pencil"></i> ویرایش
                            </a>
                            <a
                              data-bs-toggle="modal"
                              href="#delete_modal"
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="fe fe-trash"></i>حذف
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Add Modal --> */}
      <div
        className="modal fade"
        id="Add_Specialities_details"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row form-row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input type="text" className="form-control"></input>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Price</label>
                      <input type="text" className="form-control"></input>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Image</label>
                      <input type="file" className="form-control"></input>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /ADD Modal --> */}
    </div>
  );
};

export default DoctorsList;
