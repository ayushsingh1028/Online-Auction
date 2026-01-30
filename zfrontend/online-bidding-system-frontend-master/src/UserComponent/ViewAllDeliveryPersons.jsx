import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllDeliveryPersons = () => {
  const [allDelivery, setAllDelivery] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

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
      "http://localhost:9090/api/user/fetch/role-wise?role=Delivery",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="mt-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-all-delivery-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-all-delivery-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .table-all-delivery-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-all-delivery-premium thead th {
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
        
        .table-all-delivery-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-all-delivery-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-all-delivery-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .delivery-name-all {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1rem;
        }
        
        .delivery-email-all {
          color: #495057;
          font-weight: 500;
        }
        
        .delivery-phone-all {
          color: #28a745;
          font-weight: 600;
        }
        
        .delivery-address-all {
          color: #6c757d;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .seller-name-all {
          color: #2c3e50;
          font-weight: 600;
          background: #e9ecef;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          display: inline-block;
        }
        
        .scroll-container-all-delivery {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-all-delivery::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-all-delivery::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-all-delivery::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .empty-state-all-delivery {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-state-icon-all-delivery {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
      `}</style>

      <div className="card premium-all-delivery-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header premium-all-delivery-header text-center">
          <h2 className="heading-font text-white m-0">All Delivery Persons</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            View all delivery personnel in the system ({allDelivery.length} {allDelivery.length === 1 ? 'person' : 'people'})
          </p>
        </div>
        
        <div className="card-body scroll-container-all-delivery" style={{ overflowY: "auto" }}>
          {allDelivery.length === 0 ? (
            <div className="empty-state-all-delivery">
              <div className="empty-state-icon-all-delivery">🚚</div>
              <h4 className="heading-font">No Delivery Persons Found</h4>
              <p>Delivery personnel will appear here once they are registered</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-all-delivery-premium table-hover">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Address</th>
                    <th scope="col">Seller</th>
                  </tr>
                </thead>
                <tbody>
                  {allDelivery.map((delivery) => {
                    return (
                      <tr key={delivery.id}>
                        <td>
                          <span className="delivery-name-all">{delivery.firstName}</span>
                        </td>
                        <td>
                          <span className="delivery-name-all">{delivery.lastName}</span>
                        </td>
                        <td>
                          <span className="delivery-email-all">{delivery.emailId}</span>
                        </td>
                        <td>
                          <span className="delivery-phone-all">{delivery.phoneNo}</span>
                        </td>
                        <td>
                          <span className="delivery-address-all">
                            {delivery.address.street +
                              ", " +
                              delivery.address.city +
                              ", " +
                              delivery.address.pincode}
                          </span>
                        </td>
                        <td>
                          <span className="seller-name-all">{delivery.seller.firstName}</span>
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

export default ViewAllDeliveryPersons;