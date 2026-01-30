import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MyBids = () => {
  let navigate = useNavigate();
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    const getMyOffers = async () => {
      const offers = await retrieveMyOffers();
      if (offers) {
        setMyOffers(offers.offers);
      }
    };

    getMyOffers();
  }, []);

  const retrieveMyOffers = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/product/offer/fetch/user?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProductOffer = (offerId, e) => {
    fetch("http://localhost:9090/api/product/offer/id?offerId=" + offerId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
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
            window.location.reload(true);
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

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'bg-success';
      case 'accepted': return 'bg-primary';
      case 'rejected': return 'bg-danger';
      case 'expired': return 'bg-secondary';
      default: return 'bg-warning';
    }
  };

  return (
    <div className="mt-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-bids-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-bids-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .table-bids-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-bids-premium thead th {
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
        
        .table-bids-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-bids-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-bids-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .product-img-bids {
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .product-img-bids:hover {
          transform: scale(1.1);
        }
        
        .status-badge-bids {
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .btn-delete-premium {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .btn-delete-premium:hover {
          background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(220, 53, 69, 0.3);
          color: white;
        }
        
        .price-highlight {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1.05rem;
        }
        
        .bid-amount-highlight {
          color: #28a745;
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .scroll-container-bids {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-bids::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-bids::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-bids::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .seller-name {
          color: #495057;
          font-weight: 600;
        }
        
        .product-name {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1rem;
        }
        
        .bid-time {
          color: #6c757d;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="card premium-bids-card ms-2 me-2 mb-5 border-color" style={{ height: "45rem" }}>
        <div className="card-header premium-bids-header text-center">
          <h2 className="heading-font text-white m-0">My Bids</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            Track all your bidding activity
          </p>
        </div>
        
        <div className="card-body scroll-container-bids" style={{ overflowY: "auto" }}>
          {myOffers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>
              <h4 className="heading-font">No Bids Yet</h4>
              <p>You haven't placed any bids yet. Start bidding on products to see them here!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bids-premium table-hover">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Name</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Asking Price</th>
                    <th scope="col">Bid Amount</th>
                    <th scope="col">Bid Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="text-color">
                  {myOffers.map((myOffer) => {
                    return (
                      <tr key={myOffer.id}>
                        <td>
                          <img
                            src={
                              "http://localhost:9090/api/product/" +
                              myOffer.product.image1
                            }
                            className="img-fluid product-img-bids"
                            alt="product_pic"
                            style={{
                              maxWidth: "90px",
                            }}
                          />
                        </td>
                        <td>
                          <span className="product-name">{myOffer.product.name}</span>
                        </td>
                        <td>
                          <span className="seller-name">
                            {myOffer.product.seller.firstName +
                              " " +
                              myOffer.product.seller.lastName}
                          </span>
                        </td>
                        <td>
                          <span className="price-highlight">₹{myOffer.product.price}</span>
                        </td>
                        <td>
                          <span className="bid-amount-highlight">₹{myOffer.amount}</span>
                        </td>
                        <td>
                          <span className="bid-time">{formatDateFromEpoch(myOffer.dateTime)}</span>
                        </td>
                        <td>
                          <span className={`status-badge-bids ${getStatusColor(myOffer.status)} text-white`}>
                            {myOffer.status}
                          </span>
                        </td>
                        <td>
                          {(() => {
                            if (myOffer.status === "Active") {
                              return (
                                <button
                                  className="btn btn-delete-premium btn-sm"
                                  onClick={() => deleteProductOffer(myOffer.id)}
                                >
                                  Delete Offer
                                </button>
                              );
                            }
                          })()}
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
      <ToastContainer />
    </div>
  );
};

export default MyBids;