import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 align-items-lg-center">
      {/* Seller Management Dropdown */}
      <li className="nav-item dropdown me-2">
        <a
          className="nav-link dropdown-toggle text-color fw-semibold px-3 py-2"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-store me-2"></i>
          Seller
        </a>
        <ul 
          className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2"
          style={{
            borderRadius: "0.75rem",
            minWidth: "220px"
          }}
        >
          <li>
            <Link
              to="/seller/order/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-shopping-cart me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              Seller Orders
            </Link>
          </li>
          <li>
            <Link
              to="/product/add"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-plus-circle me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/seller/product/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-box me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              My Products
            </Link>
          </li>
        </ul>
      </li>

      {/* Delivery Management Dropdown */}
      <li className="nav-item dropdown me-2">
        <a
          className="nav-link dropdown-toggle text-color fw-semibold px-3 py-2"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-truck me-2"></i>
          Delivery
        </a>
        <ul 
          className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2"
          style={{
            borderRadius: "0.75rem",
            minWidth: "220px"
          }}
        >
          <li>
            <Link
              to="/seller/delivery/register"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-user-plus me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              Register Delivery
            </Link>
          </li>
          <li>
            <Link
              to="/seller/delivery-person/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-users me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              Delivery Persons
            </Link>
          </li>
        </ul>
      </li>

      {/* Customer Activities Dropdown */}
      <li className="nav-item dropdown me-2">
        <a
          className="nav-link dropdown-toggle text-color fw-semibold px-3 py-2"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-user me-2"></i>
          My Account
        </a>
        <ul 
          className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2"
          style={{
            borderRadius: "0.75rem",
            minWidth: "220px"
          }}
        >
          <li>
            <Link
              to="/customer/bid/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-gavel me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              My Bids
            </Link>
          </li>
          <li>
            <Link
              to="/customer/order"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-shopping-bag me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              My Orders
            </Link>
          </li>
          <li>
            <Link
              to="/customer/wallet"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-wallet me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              My Wallet
            </Link>
          </li>
        </ul>
      </li>

      {/* Logout Button */}
      <li className="nav-item">
        <Link
          to=""
          className="btn btn-outline-danger fw-semibold px-4 py-2"
          aria-current="page"
          onClick={userLogout}
          style={{
            fontSize: "0.95rem",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease",
            borderWidth: "2px"
          }}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </Link>
        <ToastContainer />
      </li>

      <style jsx>{`
        .nav-link:hover {
          background-color: #f8f9fa;
          color: #2c3e50 !important;
          transform: translateY(-2px);
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa !important;
          color: #2c3e50 !important;
          padding-left: 1.75rem !important;
        }
        
        .dropdown-menu {
          animation: slideDown 0.3s ease;
        }
        
        .btn-outline-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ul>
  );
};

export default HeaderUser;