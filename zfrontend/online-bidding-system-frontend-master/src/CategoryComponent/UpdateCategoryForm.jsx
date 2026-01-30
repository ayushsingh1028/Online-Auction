import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateCategoryForm = () => {
  const location = useLocation();
  const category = location.state;
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [id, setId] = useState(category.id);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  let navigate = useNavigate();

  const saveCategory = (e) => {
    let data = { id, name, description };

    fetch("http://localhost:9090/api/category/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(data),
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
              navigate("/admin/category/all");
            }, 2000);
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
            }, 2000);
          } else {
            toast.error("It Seems Server is down!!!", {
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
            }, 2000);
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
    <div className="mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card border-0 shadow-lg" style={{ borderRadius: "1.5rem" }}>
              {/* Header Section */}
              <div 
                className="card-header bg-color custom-bg-text text-center border-0 py-4"
                style={{ borderRadius: "1.5rem 1.5rem 0 0" }}
              >
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div 
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px", fontSize:"2rem" }}
                  >
                    🔃
                    
                  </div>
                </div>
                <h3 className="mb-0" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "600" }}>
                  Update Category
                </h3>
                <p className="mb-0 mt-2" style={{ fontSize: "0.9rem", opacity: "0.9" }}>
                  Modify category details
                </p>
              </div>

              {/* Form Body */}
              <div className="card-body p-5">
                <form onSubmit={saveCategory}>
                  {/* Category ID Badge */}
                  <div className="mb-4 text-center">
                    <span className="badge bg-light text-color border px-4 py-2" style={{ fontSize: "0.95rem" }}>
                      <i className="fas fa-hashtag me-2"></i>
                      Category ID: {id}
                    </span>
                  </div>

                  {/* Category Title Field */}
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label text-color fw-semibold mb-2">
                      <i className="fas fa-tag me-2 text-secondary"></i>
                      Category Title
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="title"
                      placeholder="Enter category title..."
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      style={{
                        borderRadius: "0.75rem",
                        border: "2px solid #e0e0e0",
                        padding: "0.75rem 1rem",
                        fontSize: "1rem",
                        transition: "all 0.3s ease"
                      }}
                      required
                    />
                  </div>

                  {/* Category Description Field */}
                  <div className="mb-4">
                    <label htmlFor="description" className="form-label text-color fw-semibold mb-2">
                      <i className="fas fa-align-left me-2 text-secondary"></i>
                      Category Description
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="description"
                      rows="4"
                      placeholder="Enter category description..."
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                      style={{
                        borderRadius: "0.75rem",
                        border: "2px solid #e0e0e0",
                        padding: "0.75rem 1rem",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        resize: "vertical"
                      }}
                      //required
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="row g-3 mt-4">
                    <div className="col-6">
                      <button
                        type="button"
                        onClick={() => navigate("/admin/category/all")}
                        className="btn btn-lg btn-outline-secondary w-100 fw-semibold"
                        style={{
                          borderRadius: "0.75rem",
                          padding: "0.875rem",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                          borderWidth: "2px"
                        }}
                      >
                        <i className="fas fa-times me-2"></i>
                        Cancel
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="submit"
                        className="btn btn-lg bg-color custom-bg-text w-100 fw-semibold"
                        style={{
                          borderRadius: "0.75rem",
                          padding: "0.875rem",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(44, 62, 80, 0.2)"
                        }}
                      >
                        <i className="fas fa-check me-2"></i>
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Info Card */}
            <div className="card border-0 mt-4 bg-light" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <i className="fas fa-info-circle text-info me-3 mt-1" style={{ fontSize: "1.2rem" }}></i>
                  <div>
                    <h6 className="text-color fw-semibold mb-2">Update Notes</h6>
                    <p className="text-secondary mb-0" style={{ fontSize: "0.9rem", lineHeight: "1.8" }}>
                      Changes to the category will affect all products under this category. Make sure the information is accurate before updating.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

      <style jsx>{`
        .form-control:focus {
          border-color: #2c3e50 !important;
          box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.15) !important;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-outline-secondary:hover {
          background-color: #6c757d;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default UpdateCategoryForm;