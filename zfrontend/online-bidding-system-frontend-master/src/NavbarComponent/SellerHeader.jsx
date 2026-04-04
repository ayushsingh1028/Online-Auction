import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDropdown from "./ProfileDropdown";

const SellerHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 align-items-lg-center">
      <li className="nav-item">
        <Link
          to="/seller/order/all"
          className="nav-link text-color fw-semibold px-3 py-2"
          aria-current="page"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-shopping-cart me-2"></i>
          Orders
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/seller/delivery/register"
          className="nav-link text-color fw-semibold px-3 py-2"
          aria-current="page"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-user-plus me-2"></i>
          Register Delivery
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/seller/delivery-person/all"
          className="nav-link text-color fw-semibold px-3 py-2"
          aria-current="page"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-users me-2"></i>
          Delivery Persons
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/product/add" 
          className="nav-link text-color fw-semibold px-3 py-2" 
          aria-current="page"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-plus-circle me-2"></i>
          Add Product
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/seller/product/all"
          className="nav-link text-color fw-semibold px-3 py-2"
          aria-current="page"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-box me-2"></i>
          My Products
        </Link>
      </li>

      <ProfileDropdown />
      <ToastContainer />
      
      <style jsx>{`
        .nav-link:hover {
          background-color: #f8f9fa;
          color: #2c3e50 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </ul>
  );
};

export default SellerHeader;
