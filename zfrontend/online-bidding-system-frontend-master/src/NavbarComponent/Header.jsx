import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import logo from "../images/e_logo.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories.categories);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container-fluid px-4 py-2">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              width="100"
              height="auto"
              className="d-inline-block align-top"
              alt="BidOut Logo"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            />
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-color fw-semibold px-3 py-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ 
                    fontSize: "1rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  <i className="fas fa-th-large me-2"></i>
                  Categories
                </a>
                <ul 
                  className="dropdown-menu border-0 shadow-lg mt-2" 
                  style={{ 
                    borderRadius: "0.75rem",
                    minWidth: "220px"
                  }}
                >
                  {categories.map((category, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={`/product/category/${category.id}/${category.name}`}
                          className="dropdown-item text-color py-2 px-4"
                          style={{ 
                            transition: "all 0.2s ease",
                            fontSize: "0.95rem"
                          }}
                        >
                          <i className="fas fa-tag me-2 text-secondary" style={{ fontSize: "0.85rem" }}></i>
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="nav-item">
                <Link 
                  to="/aboutus" 
                  className="nav-link text-color fw-semibold px-3 py-2" 
                  style={{ 
                    fontSize: "1rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contactus"
                  className="nav-link text-color fw-semibold px-3 py-2"
                  style={{ 
                    fontSize: "1rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  <i className="fas fa-envelope me-2"></i>
                  Contact Us
                </Link>
              </li>
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>

      <style jsx>{`
        .nav-link:hover {
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
    </div>
  );
};

export default Header;