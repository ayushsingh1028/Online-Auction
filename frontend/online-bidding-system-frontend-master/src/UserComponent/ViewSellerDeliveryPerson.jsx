import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewSellerDeliveryPerson = () => {
  const [allDelivery, setAllDelivery] = useState([]);

  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/user/fetch/seller/delivery-person?sellerId=" +
        seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const deleteDelivery = (userId, e) => {
    fetch(
      "http://localhost:9090/api/user/delete/seller/delivery-person?deliveryId=" +
        userId,
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

  return (
    <div className="mt-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-delivery-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-delivery-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .table-delivery-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-delivery-premium thead th {
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
        
        .table-delivery-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-delivery-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-delivery-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .btn-delete-delivery {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .btn-delete-delivery:hover {
          background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(220, 53, 69, 0.3);
          color: white;
        }
        
        .delivery-name {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1rem;
        }
        
        .delivery-email {
          color: #495057;
          font-weight: 500;
        }
        
        .delivery-phone {
          color: #28a745;
          font-weight: 600;
        }
        
        .delivery-address {
          color: #6c757d;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .scroll-container-delivery {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-delivery::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-delivery::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-delivery::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .empty-state-delivery {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-state-icon-delivery {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
      `}</style>

      <div className="card premium-delivery-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header premium-delivery-header text-center">
          <h2 className="heading-font text-white m-0">Delivery Persons</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            Manage your delivery team ({allDelivery.length} {allDelivery.length === 1 ? 'person' : 'people'})
          </p>
        </div>
        
        <div className="card-body scroll-container-delivery" style={{ overflowY: "auto" }}>
          {allDelivery.length === 0 ? (
            <div className="empty-state-delivery">
              <div className="empty-state-icon-delivery">🚚</div>
              <h4 className="heading-font">No Delivery Persons Yet</h4>
              <p>Add delivery persons to manage your order deliveries</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-delivery-premium table-hover">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allDelivery.map((delivery) => {
                    return (
                      <tr key={delivery.id}>
                        <td>
                          <span className="delivery-name">{delivery.firstName}</span>
                        </td>
                        <td>
                          <span className="delivery-name">{delivery.lastName}</span>
                        </td>
                        <td>
                          <span className="delivery-email">{delivery.emailId}</span>
                        </td>
                        <td>
                          <span className="delivery-phone">{delivery.phoneNo}</span>
                        </td>
                        <td>
                          <span className="delivery-address">
                            {delivery.address.street +
                              ", " +
                              delivery.address.city +
                              ", " +
                              delivery.address.pincode}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteDelivery(delivery.id)}
                            className="btn btn-sm btn-delete-delivery"
                          >
                            Delete
                          </button>
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

export default ViewSellerDeliveryPerson;