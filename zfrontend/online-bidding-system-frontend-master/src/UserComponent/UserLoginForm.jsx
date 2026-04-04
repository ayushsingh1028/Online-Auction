import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";


const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [activeTab, setActiveTab] = useState("signin");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerRequest, setRegisterRequest] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "",
  });

  const handleRegisterInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "111776091583-n8rcj7t8pur8uruf23d8uq5e8v3j8imo.apps.googleusercontent.com",
        callback: handleGoogleLogin,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: "450" } 
      );
      if (showRegisterModal) {
         google.accounts.id.renderButton(
          document.getElementById("googleSignUpDivModal"),
          { theme: "outline", size: "large", width: "400" } 
        );
      }
    }
  }, [loginRequest.role, showRegisterModal, registerRequest.role]);

  const handleGoogleLogin = (response) => {
    if (!loginRequest.role) {
      toast.error("Please select a role first!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const payload = {
      tokenId: response.credential,
      role: loginRequest.role,
    };

    fetch("http://localhost:9090/api/user/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (res.jwtToken !== null) {
            if (res.user.role === "Admin") {
              sessionStorage.setItem("active-admin", JSON.stringify(res.user));
              sessionStorage.setItem("admin-jwtToken", res.jwtToken);
            } else if (res.user.role === "Customer") {
              sessionStorage.setItem("active-customer", JSON.stringify(res.user));
              sessionStorage.setItem("customer-jwtToken", res.jwtToken);
            } else if (res.user.role === "Delivery") {
              sessionStorage.setItem("active-delivery", JSON.stringify(res.user));
              sessionStorage.setItem("delivery-jwtToken", res.jwtToken);
            }
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => { window.location.href = "/home"; }, 1000);
          }
        } else {
          toast.error(res.responseMessage, { position: "top-center" });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google Login failed", { position: "top-center" });
      });
  };

  const registerAction = (e) => {
    e.preventDefault();
    if (!registerRequest.role) {
      toast.error("Please select a role", { position: "top-center" });
      return;
    }

    fetch("http://localhost:9090/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerRequest),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success("Registered successfully! You can now login.", {
              position: "top-center",
              autoClose: 1000,
            });
            setShowRegisterModal(false);
          } else {
            toast.error(res.responseMessage, { position: "top-center" });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Registration failed", { position: "top-center" });
      });
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

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 30px 0;
          color: #95a5a6;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e0e0e0;
        }

        .divider:not(:empty)::before {
          margin-right: .5em;
        }

        .divider:not(:empty)::after {
          margin-left: .5em;
        }

        .google-btn-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
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

            <div className="divider">OR</div>

            <div className="google-btn-container">
               <div id="googleSignInDiv"></div>
            </div>

            <div className="link-text" onClick={() => setShowRegisterModal(true)}>
              Don't have an account? Register Here
            </div>
          </form>
        </div>
      </div>

      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ background: '#2c3e50', color: 'white' }}>
          <Modal.Title>Create New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '40px' }}>
          <h4 className="section-title" style={{ textAlign: 'center' }}>Join BidOut Community</h4>
          <form>
            <div className="form-group">
                <div className="select-wrapper">
                  <select
                    onChange={handleRegisterInput}
                    className="form-control"
                    name="role"
                    value={registerRequest.role}
                  >
                    <option value="">Select Target Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Delivery">Delivery Person</option>
                  </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <input
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  onChange={handleRegisterInput}
                  value={registerRequest.firstName}
                />
              </div>
              <div className="form-group">
                <input
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={handleRegisterInput}
                  value={registerRequest.lastName}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="emailId"
                className="form-control"
                placeholder="Email Address"
                onChange={handleRegisterInput}
                value={registerRequest.emailId}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create Password"
                onChange={handleRegisterInput}
                value={registerRequest.password}
              />
            </div>

            <button
              className="btn-submit"
              onClick={registerAction}
            >
              Register Now
            </button>

            <div className="divider">OR</div>

            <div className="google-btn-container">
               <div id="googleSignUpDivModal"></div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      
      <ToastContainer />
    </div>
  );
};

export default UserLoginForm;