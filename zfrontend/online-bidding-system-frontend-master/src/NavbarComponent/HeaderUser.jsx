import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";

const HeaderUser = () => {
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

      <ProfileDropdown />
      <ToastContainer />

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