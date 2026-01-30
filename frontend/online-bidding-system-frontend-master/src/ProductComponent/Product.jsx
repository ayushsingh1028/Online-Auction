import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import ProductOffers from "../ProductOfferComponent/ProductOffers";

const Product = () => {
  const { productId, categoryId } = useParams();

  let navigate = useNavigate();

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [fetchedCustomer, setFetchedCustomer] = useState({});

  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [amount, setAmount] = useState("");

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    seller: {
      firstName: "",
    },
  });

  const retrieveProduct = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/product/fetch?productId=" + productId
    );

    return response.data;
  };

  const retrieveCustomer = async (customerId) => {
    const response = await axios.get(
      "http://localhost:9090/api/user/fetch/user-id?userId=" + customerId
    );

    return response.data;
  };

  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });

    const getCustomer = async () => {
      let retrievedCustomers;
      if (user) {
        retrievedCustomers = await retrieveCustomer(user.id);
      }
      if (retrievedCustomers) {
        setFetchedCustomer(retrievedCustomers.users[0]);
      }
    };

    const getProduct = async () => {
      const retrievedProduct = await retrieveProduct();

      setProduct(retrievedProduct.products[0]);
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts.products);
      }
    };

    getCustomer();
    getProduct();
    getProductsByCategory();
  }, [productId]);

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/product/fetch/category-wise?categoryId=" +
        categoryId
    );
    console.log(response.data);
    return response.data;
  };

  const saveProductOffer = (amount, e) => {
    fetch("http://localhost:9090/api/product/offer/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify({
        amount: amount,
        userId: user.id,
        productId: productId,
      }),
    }).then((result) => {
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
            navigate("/customer/bid/all");
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
    });
  };

  const addproductOffer = (e) => {
    e.preventDefault();
    if (user == null) {
      toast.error("Please login as Customer to Bid on any Product!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (product.seller.id === user.id) {
      toast.error("You can't Bid on your own Product !!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (amount > fetchedCustomer.walletAmount) {
      toast.error("Insufficient Funds in your Wallet!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      saveProductOffer(amount);
      setAmount("");
    }
  };

  const sellerProductPage = () => {
    console.log(product.seller.firstName);
    navigate(
      `/product/seller/${product.seller.id}/${product.seller.firstName}`,
      {
        state: product.seller,
      }
    );
  };

  const formatDateFromEpoch = (epochTime) => {
  if (!epochTime) return "N/A";
  const date = new Date(Number(epochTime));
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" }); // e.g. October
  const year = date.getFullYear();
  return `${day} ${month} ${year}`; // e.g. 14 October 2025
};

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'text-success';
      case 'sold': return 'text-primary';
      case 'expired': return 'text-danger';
      default: return 'text-warning';
    }
  };

  return (
    <div className="container-fluid">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-product-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .premium-product-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1.25rem;
          padding: 1.25rem;
          margin: 1rem;
        }
        
        .info-section {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          margin: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .info-label {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .info-value {
          color: #495057;
          font-size: 1.1rem;
          font-weight: 500;
        }
        
        .seller-name-link {
          color: #2c3e50;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          border-bottom: 2px solid transparent;
        }
        
        .seller-name-link:hover {
          color: #34495e;
          border-bottom: 2px solid #2c3e50;
        }
        
        .price-highlight {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1.5rem;
          font-weight: 700;
          display: inline-block;
        }
        
        .stock-badge {
          background: #e9ecef;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .stock-badge.out-of-stock {
          background: #f8d7da;
          color: #dc3545;
        }
        
        .bid-input-premium {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.875rem 1.25rem;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .bid-input-premium:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.1);
          outline: none;
        }
        
        .btn-bid-premium {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border: none;
          padding: 0.875rem 2.5rem;
          border-radius: 0.75rem;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-bid-premium:hover {
          background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(44, 62, 80, 0.3);
        }
        
        .related-products-section {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          margin-top: 2rem;
        }
        
        .premium-product-card img {
          transition: all 0.4s ease;
          cursor: zoom-in;
        }
        
        .premium-product-card img:hover {
          transform: scale(1.5);
          z-index: 1000;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .section-divider {
          height: 3px;
          background: linear-gradient(90deg, transparent, #2c3e50, transparent);
          margin: 1.5rem 0;
          border-radius: 2px;
        }
        
        .status-badge-premium {
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 1rem;
           window.scrollTo({ top: 0, behavior: "smooth" });

          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .expiry-box {
          background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
          border-left: 4px solid #dc3545;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
        }
      `}</style>

      <div className="row">
        <div className="col-sm-3 mt-2 admin">
          <div className="card premium-product-card shadow-lg">
            <ProductCarousel
              item={{
                image1: product.image1,
                image2: product.image2,
                image3: product.image3,
              }}
            />
          </div>
        </div>

        <div className="col-sm-6 mt-2">
          <div className="card premium-product-card shadow-lg">
            <div className="premium-product-header text-center">
              <h2 className="heading-font text-white m-0">{product.name}</h2>
            </div>

            <div className="info-section">
              <h3 className="info-label heading-font">Description</h3>
              <p className="info-value">{product.description}</p>
            </div>

            <div className="d-flex justify-content-between mx-3">
              <div className="info-section flex-grow-1 me-2">
                <h4 className="info-label">Product Expiry</h4>
                <div className="expiry-box">
                  <h5 className="info-value m-0 text-danger">
                    {formatDateFromEpoch(product.endDate)}
                  </h5>
                </div>
              </div>
              <div className="info-section flex-grow-1 ms-2">
                <h4 className="info-label">Status</h4>
                <span className={`status-badge-premium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
            </div>

            <div className="info-section">
              <h3 className="info-label heading-font">Seller Details</h3>
              <div className="d-flex flex-wrap gap-4">
                <div>
                  <span className="text-muted">Name: </span>
                  <span className="seller-name-link" onClick={sellerProductPage}>
                    {product.seller.firstName}
                  </span>
                </div>
                <div>
                  <span className="text-muted">Contact: </span>
                  <span className="info-value">{product.seller.emailId}</span>
                </div>
              </div>
            </div>

            <div className="card-footer custom-bg border-0 pb-4">
              <div className="d-flex justify-content-between align-items-center mx-3 mb-4">
                <div className="price-highlight">
                  ₹{product.price?.toLocaleString('en-IN')}
                  <div style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '0.25rem' }}>
                    Asking Price
                  </div>
                </div>
                <div>
                  {(() => {
                    if (product.quantity > 0) {
                      return (
                        <span className="stock-badge">
                          Stock: {product.quantity}
                        </span>
                      );
                    } else {
                      return (
                        <span className="stock-badge out-of-stock">
                          Out Of Stock
                        </span>
                      );
                    }
                  })()}
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="d-flex justify-content-center mt-4">
                <form className="row g-3" onSubmit={addproductOffer}>
                  <div className="col-auto">
                    <input
                      type="number"
                      className="form-control bid-input-premium"
                      placeholder="Enter your bid amount..."
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                      required
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="submit"
                      className="btn btn-bid-premium"
                      value="Place Bid"
                    />
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-3 mt-2">
          <ProductOffers />
        </div>
      </div>

      <div className="row mt-4 mb-5">
        <div className="col-md-12">
          <div className="related-products-section">
            <h2 className="heading-font text-color mb-4">Related Products</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {products.map((product) => {
                return <ProductCard key={product.id} item={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;