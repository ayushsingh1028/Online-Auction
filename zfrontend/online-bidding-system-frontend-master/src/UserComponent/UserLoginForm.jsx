import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [activeTab, setActiveTab] = useState("signin");

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:9090/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              if (res.user.role === "Admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.jwtToken);
              } else if (res.user.role === "Customer") {
                sessionStorage.setItem(
                  "active-customer",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("customer-jwtToken", res.jwtToken);
              } else if (res.user.role === "Delivery") {
                sessionStorage.setItem(
                  "active-delivery",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("delivery-jwtToken", res.jwtToken);
              }
            }

            if (res.jwtToken !== null) {
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.href = "/home";
              }, 1000);
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .login-wrapper {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .login-container {
          width: 100%;
          max-width: 540px;
        }
        
        .brand-title {
          text-align: center;
          font-size: 48px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 60px;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0px;
        }
        
        .tab-container {
          display: flex;
          border: 2px solid #2c3e50;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 50px;
        }
        
        .tab-button {
          flex: 1;
          padding: 18px;
          background: white;
          border: none;
          font-size: 15px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #95a5a6;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .tab-button.active {
          background: #2c3e50;
          color: white;
        }
        
        .section-title {
          font-size: 24px;
          color: #2c3e50;
          margin-bottom: 30px;
          font-weight: 400;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-control {
          width: 100%;
          padding: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #fafafa;
          color: #2c3e50;
        }
        
        .form-control::placeholder {
          color: #bdc3c7;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #2c3e50;
          background: white;
        }
        
        .select-wrapper {
          position: relative;
        }
        
        .select-wrapper::after {
          content: '▼';
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #95a5a6;
          font-size: 12px;
        }
        
        select.form-control {
          appearance: none;
          cursor: pointer;
        }
        
        .link-text {
          text-align: center;
          margin: 30px 0;
          font-size: 15px;
          color: #2c3e50;
          cursor: pointer;
          text-decoration: underline;
        }
        
        .link-text:hover {
          color: #34495e;
        }
        
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 30px 0;
        }
        
        .checkbox-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          border: 2px solid #e0e0e0;
        }
        
        .checkbox-group label {
          font-size: 14px;
          color: #7f8c8d;
          cursor: pointer;
        }
        
        .checkbox-group a {
          color: #2c3e50;
          text-decoration: underline;
        }
        
        .btn-submit {
          width: 100%;
          padding: 16px;
          background: #2c3e50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-submit:hover {
          background: #34495e;
          transform: translateY(-1px);
        }
        
        .btn-submit:active {
          transform: translateY(0);
        }
        
        @media (max-width: 576px) {
          .brand-title {
            font-size: 36px;
          }
          
          .tab-button {
            font-size: 13px;
            padding: 14px;
          }
        }
      `}</style>
      
      <div className="login-wrapper">
        <div className="login-container">
          <h1 className="brand-title">Welcome to BidOut</h1>
          
          <h2 className="section-title">Login with Email ID</h2>
          
          <form>
            <div className="form-group">
              <div className="select-wrapper">
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="role"
                >
                  <option value="">Select User Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                  <option value="Delivery">Delivery Person</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                onChange={handleUserInput}
                value={loginRequest.emailId}
                placeholder="Email Address"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={loginRequest.password}
                placeholder="Password"
                autoComplete="on"
              />
            </div>
            
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required/>
              <label htmlFor="terms">
                By Agreeing to <a href="#">Terms & Conditions</a>
              </label>
           
            </div>
            
            <button
              type="submit"
              className="btn-submit"
              onClick={loginAction}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default UserLoginForm;