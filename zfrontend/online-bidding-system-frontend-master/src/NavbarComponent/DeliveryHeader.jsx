import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-delivery"));
  console.log(user);

  const deliveryLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-delivery");
    sessionStorage.removeItem("delivery-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

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

      {/* Logout Button */}
      <li className="nav-item">
        <Link
          to=""
          className="btn btn-outline-danger fw-semibold px-4 py-2"
          aria-current="page"
          onClick={deliveryLogout}
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
        
        .btn-outline-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
      `}</style>
    </ul>
  );
};

export default DeliveryHeader;