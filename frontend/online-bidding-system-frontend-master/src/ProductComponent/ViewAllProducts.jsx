import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, []);

  const retrieveAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/product/fetch/all?status="
    );
    console.log(response.data);
    return response.data;
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'bg-success';
      case 'sold': return 'bg-primary';
      case 'expired': return 'bg-danger';
      case 'pending': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="mt-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-all-products-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-all-products-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .table-all-products-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-all-products-premium thead th {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          font-weight: 600;
          padding: 1rem;
          border: none;
          position: sticky;
          top: 0;
          z-index: 10;
          white-space: nowrap;
        }
        
        .table-all-products-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-all-products-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-all-products-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .product-img-all {
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          cursor: zoom-in;
        }
        
        .product-img-all:hover {
          transform: scale(2.5);
          z-index: 1000;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .status-badge-all-products {
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .product-name-all {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1rem;
        }
        
        .product-description-all {
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 300px;
        }
        
        .category-name-all {
          color: #495057;
          font-weight: 600;
          background: #e9ecef;
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          display: inline-block;
        }
        
        .quantity-all {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1.05rem;
        }
        
        .price-all {
          color: #28a745;
          font-weight: 700;
          font-size: 1.15rem;
        }
        
        .seller-name-all {
          color: #495057;
          font-weight: 600;
        }
        
        .scroll-container-all-products {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-all-products::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-all-products::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-all-products::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .empty-state-all-products {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-state-icon-all-products {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
      `}</style>

      <div className="card premium-all-products-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header premium-all-products-header text-center">
          <h2 className="heading-font text-white m-0">All Products</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            Browse all available products ({allProducts.length} {allProducts.length === 1 ? 'product' : 'products'})
          </p>
        </div>
        
        <div className="card-body scroll-container-all-products" style={{ overflowY: "auto" }}>
          {allProducts.length === 0 ? (
            <div className="empty-state-all-products">
              <div className="empty-state-icon-all-products">🏪</div>
              <h4 className="heading-font">No Products Available</h4>
              <p>Products will appear here once they are added to the system</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-all-products-premium table-hover">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Asking Price</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={
                              "http://localhost:9090/api/product/" +
                              product.image1
                            }
                            className="img-fluid product-img-all"
                            alt="product_pic"
                            style={{
                              maxWidth: "90px",
                            }}
                          />
                        </td>
                        <td>
                          <span className="product-name-all">{product.name}</span>
                        </td>
                        <td>
                          <span className="product-description-all">{product.description}</span>
                        </td>
                        <td>
                          <span className="category-name-all">{product.category.name}</span>
                        </td>
                        <td>
                          <span className="quantity-all">{product.quantity}</span>
                        </td>
                        <td>
                          <span className="price-all">₹{product.price}</span>
                        </td>
                        <td>
                          <span className="seller-name-all">{product.seller.firstName}</span>
                        </td>
                        <td>
                          <span className={`status-badge-all-products ${getStatusColor(product.status)} text-white`}>
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllProducts;