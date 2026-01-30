import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 align-items-lg-center">
      <li className="nav-item me-2">
        <Link
          to="/user/customer/register"
          className="nav-link text-color fw-semibold px-3 py-2"
          aria-current="page"
          style={{
            fontSize: "1rem",
            transition: "all 0.3s ease",
            borderRadius: "0.5rem"
          }}
        >
          <i className="fas fa-user-plus me-2"></i>
          Register
        </Link>
      </li>

      <li className="nav-item">
        <Link 
          to="/user/login" 
          className="btn bg-color custom-bg-text fw-semibold px-4 py-2"
          aria-current="page"
          style={{
            fontSize: "1rem",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(44, 62, 80, 0.15)"
          }}
        >
          <i className="fas fa-sign-in-alt me-2"></i>
          Login
        </Link>
      </li>

      <style jsx>{`
        .nav-link:hover {
          background-color: #f8f9fa;
          color: #2c3e50 !important;
          transform: translateY(-2px);
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 62, 80, 0.25) !important;
        }
      `}</style>
    </ul>
  );
};

export default NormalHeader;