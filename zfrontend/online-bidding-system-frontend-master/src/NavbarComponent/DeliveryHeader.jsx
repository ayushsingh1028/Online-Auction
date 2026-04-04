import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDropdown from "./ProfileDropdown";

const DeliveryHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 align-items-lg-center">
      {/* My Deliveries */}
      <li className="nav-item me-2">
        <Link
          to="/delivery-person/order/all"
          className="nav-link text-color fw-semibold px-3 py-2"
          aria-current="page"
          style={{
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-truck-loading me-2"></i>
          My Delivery Orders
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

export default DeliveryHeader;