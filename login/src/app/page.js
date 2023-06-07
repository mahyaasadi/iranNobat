"use client" // This is a client component 
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { setSession , getSession  } from "../../config/session";
import localSession from '../../config/session.js'
import Image from 'next/image';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Logo from '../assets/img/favicon.png'
import '../assets/css/bootstrap.rtl.min.css'
import '../assets/css/font-awesome.min.css'
import '../assets/css/style.css'

const MySwal = withReactContent(Swal)

// export default function login(req, res) {
// 	// authenticate user
// 	const user = { UserID : "satar"};
// 	const session = { user };
// 	setSession(res, session);
// 	res.redirect("/");
//   }

export default function Home() {
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios.post('https://irannobat.ir:8444/api/AdminUser/Login', {
			UserName: document.getElementById("UserName").value,
			Password: document.getElementById("Password").value
		  })
		  .then(function (response,res) {
			console.log(response.data);
			if (window){
				window.sessionStorage.setItem("UserID" , "12123")
			}
			// console.log(Window.sessionStorage.UserID);
			// res.redirect("/dashboard");
		  })
		  .catch(function (error) {
			console.log(error);	
			MySwal.fire({
				title: 'اطلاعات اشتباه وارد شده است',
				confirmButtonText: 'بازگشت',
				confirmButtonColor: '#802d38',
				showCancelButton: false,
				icon: 'error',
				allowOutsideClick: true
			})
		  })
	}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="main-wrapper login-body">
            <div className="login-wrapper">
            	<div className="container">
                	<div className="loginbox">
                    	<div className="login-left">
							<Image className="img-fluid" src={Logo} alt="logo" width={40} height={40} />
                        </div>
                        <div className="login-right">
							<div className="login-right-wrap">
								<h1>ورود</h1>
								<p className="account-subtitle">دسترسی به داشبورد</p>
								
								{/* Form */}
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<input
											className="form-control"
											type="text"
											placeholder="نام کاربری"
											id='UserName'
											name="UserName"
											required
											>
										</input>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="رمز عبور"
											id='Password'
											name="Password"
											required
											>
										</input>
									</div>
									<div className="form-group">
										<button
											className="btn btn-primary w-100"
											type="submit">
												ورود
										</button>
									</div>
								</form>
								
								<div className="text-center forgotpass"><a href="forgot-password.html">فراموشی رمز؟</a></div>
								<div className="login-or">
									<span className="or-line"></span>
									<span className="span-or">یا </span>
								</div>
								  
								{/* Social Login */}
								<div className="social-login">
									<span>ورود با</span>
									<a href="#" className="facebook"><i className="fa fa-facebook"></i></a><a href="#" className="google"><i className="fa fa-google"></i></a>
								</div>
								
								<div className="text-center dont-have">حساب ندارید؟ <a href="register.html">ثبت نام</a></div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
  )
}