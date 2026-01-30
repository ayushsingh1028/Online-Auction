import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 align-items-lg-center">
      {/* Manage Dropdown */}
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
          <i className="fas fa-cog me-2"></i>
          Manage
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
              to="/user/admin/register"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-user-shield me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              Register Admin
            </Link>
          </li>
          <li>
            <Link 
              to="/category/add" 
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-plus-circle me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              Add Category
            </Link>
          </li>
        </ul>
      </li>

      {/* View All Dropdown */}
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
          <i className="fas fa-list me-2"></i>
          View All
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
              to="/admin/order/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-shopping-cart me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              All Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/product/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-box me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              All Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-tags me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              All Categories
            </Link>
          </li>
          <li>
            <Link
              to="/admin/delivery-person/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-truck me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              All Deliveries
            </Link>
          </li>
          <li>
            <Link
              to="/admin/customer/all"
              className="dropdown-item text-color py-2 px-4"
              style={{
                transition: "all 0.2s ease",
                fontSize: "0.9rem"
              }}
            >
              <i className="fas fa-users me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
              View Customers
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
          onClick={adminLogout}
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

export default AdminHeader;