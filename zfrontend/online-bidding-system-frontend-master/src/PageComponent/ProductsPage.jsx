import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductComponent/ProductCard";
import Footer from "../NavbarComponent/Footer";

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;

        if (categoryId == null && searchText === "") {
          // Fetch all products
          response = await axios.get(
            `http://localhost:9090/api/product/fetch/all?status=Available`
          );
        } else if (searchText) {
          // Fetch products by name
          response = await axios.get(
            `http://localhost:9090/api/product/search?productName=${searchText}`
          );
        } else {
          // Fetch products by category
          response = await axios.get(
            `http://localhost:9090/api/product/fetch/category-wise?categoryId=${categoryId}`
          );
        }
        
        console.log("API Response:", response.data); // Debug log
        
        if (response.data) {
          setProducts(response.data.products || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, searchText]);

  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="container-fluid mb-2">
      {/* Search Section */}
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
              <div className="card-body py-4 px-4">
                <form className="row g-3 align-items-center" onSubmit={searchProducts}>
                  <div className="col-12 col-md-8">
                    <div className="position-relative">
                      <i className="fas fa-search position-absolute text-secondary" 
                         style={{ left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}></i>
                      <input
                        type="text"
                        className="form-control form-control-lg ps-5"
                        id="inputPassword2"
                        placeholder="Search for products..."
                        onChange={(e) => setTempSearchText(e.target.value)}
                        value={tempSearchText}
                        style={{
                          borderRadius: "0.75rem",
                          border: "2px solid #e0e0e0",
                          padding: "0.75rem 1rem 0.75rem 3rem",
                          fontSize: "1rem"
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <button
                      type="submit"
                      className="btn btn-lg bg-color custom-bg-text w-100 fw-semibold"
                      style={{
                        borderRadius: "0.75rem",
                        padding: "0.75rem",
                        fontSize: "1rem",
                        boxShadow: "0 4px 12px rgba(44, 62, 80, 0.2)"
                      }}
                    >
                      <i className="fas fa-search me-2"></i>
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Header */}
      <div className="container mt-5 mb-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="text-color mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: "600" }}>
                  {searchText ? `Search Results for "${searchText}"` : categoryId ? "Category Products" : "All Products"}
                </h1>
                <p className="text-secondary mb-0">Discover amazing products available for bidding</p>
              </div>
              <div className="text-end">
                <span className="badge bg-color custom-bg-text px-3 py-2" style={{ fontSize: "1rem" }}>
                  {products.length} Products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mt-4 mb-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-color" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-secondary">Loading products...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {products.length === 0 ? (
              <div className="col-12">
                <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
                  <div className="card-body text-center py-5">
                    <i className="fas fa-box-open fa-4x text-secondary mb-4"></i>
                    <h4 className="text-color mb-2">No Products Found</h4>
                    <p className="text-secondary mb-0">
                      {searchText 
                        ? `No products match your search for "${searchText}"`
                        : "There are no products available at the moment"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              products.map((product) => {
                return <ProductCard item={product} key={product.id} />;
              })
            )}
          </div>
        )}
      </div>

      <hr />
      <Footer />

      <style jsx>{`
        .form-control:focus {
          border-color: #2c3e50 !important;
          box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.15) !important;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(44, 62, 80, 0.3) !important;
        }

        .btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;