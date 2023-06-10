"use client"; //This is a client component
import "src/assets/css/bootstrap.rtl.min.css";
import "src/assets/css/font-awesome.min.css";
import "src/assets/css/feathericon.min.css";
import "src/assets/plugins/morris/morris.css";
import "src/assets/css/style.css";

const Sidebar = () => {
  return (
    <div>
      {/* <!-- Sidebar --> */}
      <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
          <div id="sidebar-menu" class="sidebar-menu">
            <ul>
              <li class="menu-title">
                <span>Main</span>
              </li>
              <li class="active">
                <a href="index.html">
                  <i class="fe fe-home"></i> <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="appointment-list.html">
                  <i class="fe fe-layout"></i> <span>Appointments</span>
                </a>
              </li>
              <li>
                <a href="specialities.html">
                  <i class="fe fe-users"></i> <span>Specialities</span>
                </a>
              </li>
              <li>
                <a href="doctor-list.html">
                  <i class="fe fe-user-plus"></i> <span>Doctors</span>
                </a>
              </li>
              <li>
                <a href="patient-list.html">
                  <i class="fe fe-user"></i> <span>Patients</span>
                </a>
              </li>
              <li>
                <a href="reviews.html">
                  <i class="fe fe-star-o"></i> <span>Reviews</span>
                </a>
              </li>
              <li>
                <a href="transactions-list.html">
                  <i class="fe fe-activity"></i> <span>Transactions</span>
                </a>
              </li>
              <li>
                <a href="settings.html">
                  <i class="fe fe-vector"></i> <span>Settings</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="fe fe-document"></i> <span> Reports</span>{" "}
                  <span class="menu-arrow"></span>
                </a>
                {/* <ul style="display: none;">
                  <li>
                    <a href="invoice-report.html">Invoice Reports</a>
                  </li>
                </ul> */}
              </li>
              <li class="menu-title">
                <span>Pages</span>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="fe fe-document"></i> <span> Blog </span>{" "}
                  <span class="menu-arrow"></span>
                </a>
                {/* <ul style="display: none;">
									<li><a href="blog.html"> Blog </a></li>
									<li><a href="blog-details.html"> Blog Details</a></li>
									<li><a href="add-blog.html"> Add Blog </a></li>
									<li><a href="edit-blog.html"> Edit Blog </a></li>
								</ul> */}
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- /Sidebar --> */}
      </div>
    </div>
  );
};

export default Sidebar;
