import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      const allCategories = await retrieveAllCategory();
      if (allCategories) {
        setAllCategories(allCategories.categories);
      }
    };

    getAllCategory();
  }, []);

  const retrieveAllCategory = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/category/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deleteCategory = (categoryId, e) => {
    fetch(
      "http://localhost:9090/api/category/delete?categoryId=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
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
  };

  const updateCategory = (category) => {
    navigate("/admin/category/update", { state: category });
  };

  return (
    <div className="mt-4 mb-5">
      <div className="container-fluid px-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="text-color mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: "600" }}>
                  All Categories
                </h1>
                <p className="text-secondary mb-0">Manage product categories</p>
              </div>
              <div className="text-end">
                <span className="badge bg-color custom-bg-text px-3 py-2" style={{ fontSize: "1rem" }}>
                  {allCategories.length} Categories
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table Section */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-color custom-bg-text">
                      <tr>
                        <th scope="col" className="py-3 px-4">Category ID</th>
                        <th scope="col" className="py-3 px-4">Category Name</th>
                        <th scope="col" className="py-3 px-4">Description</th>
                        <th scope="col" className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCategories.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-5">
                            <div className="text-secondary">
                              <i className="fas fa-folder-open fa-3x mb-3 d-block"></i>
                              <h5>No Categories Found</h5>
                              <p className="mb-0">Start adding categories to see them here</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        allCategories.map((category, index) => {
                          return (
                            <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                              <td className="px-4 py-3 align-middle">
                                <span className="badge bg-light text-color border px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                  #{category.id}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="d-flex align-items-center">
                                  <div 
                                    className="bg-color custom-bg-text rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                                  >
                                    <i className="fas fa-tag"></i>
                                  </div>
                                  <div className="fw-semibold text-color" style={{ fontSize: "1rem" }}>
                                    {category.name}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                  {category.description}
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle text-center">
                                <div className="d-flex gap-2 justify-content-center flex-nowrap">
                                  <button
                                    onClick={() => updateCategory(category)}
                                    className="btn btn-sm bg-color custom-bg-text"
                                    style={{ borderRadius: "0.4rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                                    title="Update Category"
                                  >
                                    <i className="fas fa-edit me-1"></i>Edit
                                  </button>

                                  <button
                                    onClick={() => deleteCategory(category.id)}
                                    className="btn btn-sm btn-danger text-white"
                                    style={{ borderRadius: "0.4rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                                    title="Delete Category"
                                  >
                                    <i className="fas fa-trash-alt me-1"></i>Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn:active {
          transform: translateY(0);
        }

        tbody tr:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default ViewAllCategories;