import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MyWallet = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const [walletAmount, setWalletAmount] = useState(user.walletAmount);

  const [walletRequest, setWalletRequest] = useState({
    id: user.id,
    walletAmount: "",
  });

  const [fetchUserWallet, setFetchUserWallet] = useState({});

  walletRequest.userId = user.id;

  const handleInput = (e) => {
    setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getMyWallet = async () => {
      const userResponse = await retrieveMyWallet();
      if (userResponse) {
        setFetchUserWallet(userResponse.users[0]);
        setWalletAmount(userResponse.users[0].walletAmount);
      }
    };

    getMyWallet();
  }, []);

  const retrieveMyWallet = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/user/fetch/user-id?userId=" + user.id
    );

    return response.data;
  };

  const addMoneyInWallet = (e) => {
    fetch("http://localhost:9090/api/user/update/wallet", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletRequest),
    })
      .then((result) => {
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
              window.location.reload(true);
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
        
        .wallet-wrapper {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .wallet-container {
          width: 100%;
          max-width: 500px;
        }
        
        .wallet-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .wallet-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
        }
        
        .balance-card {
          background: #2c3e50;
          padding: 50px 35px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .balance-card::before {
          content: '';
          position: absolute;
          width: 250px;
          height: 250px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          top: -100px;
          right: -100px;
        }
        
        .balance-card::after {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
          bottom: -80px;
          left: -80px;
        }
        
        .wallet-title {
          font-size: 15px;
          font-weight: 500;
          opacity: 0.85;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          z-index: 1;
        }
        
        .balance-display {
          position: relative;
          z-index: 1;
        }
        
        .balance-label {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 15px;
          font-weight: 500;
        }
        
        .balance-amount {
          font-size: 56px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -2px;
        }
        
        .form-section {
          padding: 40px 35px;
          background: #fafafa;
        }
        
        .section-title {
          font-size: 22px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .title-icon {
          width: 36px;
          height: 36px;
          background: #2c3e50;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .currency-symbol {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          font-weight: 600;
          color: #7f8c8d;
        }
        
        .form-control {
          width: 100%;
          padding: 18px 18px 18px 45px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 20px;
          font-weight: 600;
          transition: all 0.3s ease;
          background: white;
          color: #2c3e50;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #2c3e50;
          box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.1);
        }
        
        .btn-update {
          width: 100%;
          padding: 18px;
          background: #2c3e50;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-update:hover {
          background: #34495e;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
        }
        
        .btn-update:active {
          transform: translateY(0);
        }
        
        .quick-amounts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        
        .quick-amount-btn {
          padding: 14px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #2c3e50;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .quick-amount-btn:hover {
          background: #2c3e50;
          color: white;
          border-color: #2c3e50;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 62, 80, 0.2);
        }
        
        @media (max-width: 576px) {
          .wallet-wrapper {
            padding: 20px;
          }
          
          .balance-amount {
            font-size: 44px;
          }
          
          .form-section {
            padding: 30px 25px;
          }
          
          .balance-card {
            padding: 40px 25px;
          }
        }
      `}</style>
      
      <div className="wallet-wrapper">
        <div className="wallet-container">
          <div className="wallet-card">
            <div className="balance-card">
              <div className="wallet-title">My Wallet</div>
              <div className="balance-display">
                <div className="balance-label">Available Balance</div>
                <h2 className="balance-amount">₹{walletAmount}</h2>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">
                <span className="title-icon">💰</span>
                Add Money
              </h3>
              
              <form>
                <div className="quick-amounts">
                  <button type="button" className="quick-amount-btn" onClick={() => setWalletRequest({...walletRequest, walletAmount: '500'})}>
                    ₹500
                  </button>
                  <button type="button" className="quick-amount-btn" onClick={() => setWalletRequest({...walletRequest, walletAmount: '1000'})}>
                    ₹1000
                  </button>
                  <button type="button" className="quick-amount-btn" onClick={() => setWalletRequest({...walletRequest, walletAmount: '2000'})}>
                    ₹2000
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor="walletAmount" className="form-label">
                    Enter Amount
                  </label>
                  <div className="input-wrapper">
                    <span className="currency-symbol">₹</span>
                    <input
                      type="text"
                      className="form-control"
                      name="walletAmount"
                      onChange={handleInput}
                      value={walletRequest.walletAmount}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn-update"
                  onClick={addMoneyInWallet}
                >
                  Add to Wallet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default MyWallet;