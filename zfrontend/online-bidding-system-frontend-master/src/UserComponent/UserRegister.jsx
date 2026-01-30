import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const seller = JSON.parse(sessionStorage.getItem("active-customer"));

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("customer") != -1) {
      user.role = "Customer";
    } else if (document.URL.indexOf("delivery") != -1) {
      user.role = "Delivery";
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    let jwtToken;

    if (user.role === "Delivery") {
      user.sellerId = seller.id;
      // jwtToken = sessionStorage.getItem("seller-jwtToken"); // Use bank's JWT token for customer register
    }

    fetch("http://localhost:9090/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        //    Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(user),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
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
              navigate("/user/login");
            }, 1000);
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
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
        
        .register-wrapper {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .register-container {
          width: 100%;
          max-width: 800px;
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
        
        .section-title {
          font-size: 24px;
          color: #2c3e50;
          margin-bottom: 30px;
          font-weight: 400;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 8px;
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
        
        textarea.form-control {
          resize: vertical;
          min-height: 100px;
        }
        
        .form-control::placeholder {
          color: #bdc3c7;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #2c3e50;
          background: white;
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
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .brand-title {
            font-size: 36px;
          }
        }
      `}</style>
      
      <div className="register-wrapper">
        <div className="register-container">
          <h1 className="brand-title">Welcome to BidOut</h1>
          
          <h2 className="section-title">Register Your Account</h2>
          
          <form onSubmit={saveUser}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emailId" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phoneNo" className="form-label">
                  Contact Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={handleUserInput}
                  value={user.phoneNo}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Street Address
                </label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  onChange={handleUserInput}
                  value={user.street}
                  placeholder="Enter street address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                  placeholder="Enter pincode"
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                By Agreeing to <a href="#">Terms & Conditions</a>
              </label>
            </div>
            
            <button
              type="submit"
              className="btn-submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default UserRegister;