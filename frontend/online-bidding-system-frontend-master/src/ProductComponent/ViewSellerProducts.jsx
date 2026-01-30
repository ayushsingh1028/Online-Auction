import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewSellerProducts = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));

  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const statusOptions = ["Available", "Deactivated", "Sold", "UnSold"];

  const [allProducts, setAllProducts] = useState([]);

  const [status, setStatus] = useState("");

  const [tempSearchStatus, setTempSearchStatus] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, [status]);

  const retrieveAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/product/fetch/seller-wise?sellerId=" +
        seller.id +
        "&status=" +
        status
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProduct = (productId, e) => {
    fetch(
      "http://localhost:9090/api/product/delete?productId=" +
        productId +
        "&sellerId=" +
        seller.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + seller_jwtToken,
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

  const updateProduct = (product) => {
    navigate("/seller/product/update", { state: product });
  };

  const searchProducts = (e) => {
    e.preventDefault();
    setStatus(tempSearchStatus);
  };

  const getStatusBadge = (status) => {
    const badges = {
      Available: "badge bg-success",
      Deactivated: "badge bg-secondary",
      Sold: "badge bg-primary",
      UnSold: "badge bg-warning text-dark"
    };
    return badges[status] || "badge bg-secondary";
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
                  My Products
                </h1>
                <p className="text-secondary mb-0">Manage and monitor your listed products</p>
              </div>
              <div className="text-end">
                <span className="badge bg-color custom-bg-text px-3 py-2" style={{ fontSize: "1rem" }}>
                  {allProducts.length} Products
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
              <div className="card-body py-3">
                <form className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="text-color fw-semibold">
                      <i className="fas fa-filter me-2"></i>Filter by Status
                    </label>
                  </div>
                  <div className="col-auto" style={{ minWidth: "250px" }}>
                    <select
                      name="status"
                      onChange={(e) => setTempSearchStatus(e.target.value)}
                      className="form-select border-2"
                      style={{ borderColor: "#e0e0e0", borderRadius: "0.5rem" }}
                    >
                      <option value="">All Products</option>
                      {statusOptions.map((status, index) => {
                        return <option key={index} value={status}>{status}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn bg-color custom-bg-text px-4"
                      onClick={searchProducts}
                      style={{ borderRadius: "0.5rem" }}
                    >
                      <i className="fas fa-search me-2"></i>Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table Section */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-color custom-bg-text">
                      <tr>
                        <th scope="col" className="py-3 px-4">Product</th>
                        <th scope="col" className="py-3 px-4">Name</th>
                        <th scope="col" className="py-3 px-4">Description</th>
                        <th scope="col" className="py-3 px-4">Category</th>
                        <th scope="col" className="py-3 px-4 text-center">Qty</th>
                        <th scope="col" className="py-3 px-4">Price</th>
                        <th scope="col" className="py-3 px-4 text-center">Status</th>
                        <th scope="col" className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            <div className="text-secondary">
                              <i className="fas fa-box-open fa-3x mb-3 d-block"></i>
                              <h5>No Products Found</h5>
                              <p className="mb-0">Start adding products to see them here</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        allProducts.map((product, index) => {
                          return (
                            <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                              <td className="px-4 py-3">
                                <div className="position-relative" style={{ width: "70px", height: "70px", borderRadius: "0.75rem", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                                  <img
                                    src={
                                      "http://localhost:9090/api/product/" +
                                      product.image1
                                    }
                                    className="img-fluid"
                                    alt="product"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="fw-semibold text-color" style={{ fontSize: "0.95rem" }}>{product.name}</div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="text-secondary" style={{ fontSize: "0.85rem", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {product.description}
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <span className="badge bg-light text-color border px-2 py-1" style={{ fontSize: "0.8rem" }}>
                                  {product.category.name}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle text-center">
                                <span className="fw-semibold text-color" style={{ fontSize: "0.9rem" }}>{product.quantity}</span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="fw-bold text-color" style={{ fontSize: "1rem" }}>
                                  ₹{product.price}
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle text-center">
                                <span className={getStatusBadge(product.status)} style={{ fontSize: "0.8rem", padding: "0.35rem 0.7rem" }}>
                                  {product.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle text-center">
                                <div className="d-flex gap-2 justify-content-center flex-nowrap">
                                  {product.status !== "Sold" && product.status !== "Deactivated" && (
                                    <button
                                      onClick={() => updateProduct(product)}
                                      className="btn btn-sm bg-color custom-bg-text"
                                      style={{ borderRadius: "0.4rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                                      title="Update Product"
                                    >
                                      <i className="fas fa-edit me-1"></i>Edit
                                    </button>
                                  )}

                                  {product.status === "Available" && (
                                    <button
                                      onClick={() => deleteProduct(product.id)}
                                      className="btn btn-sm btn-danger text-white"
                                      style={{ borderRadius: "0.4rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                                      title="Delete Product"
                                    >
                                      <i className="fas fa-trash-alt me-1"></i>Delete
                                    </button>
                                  )}
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
    </div>
  );
};

export default ViewSellerProducts;