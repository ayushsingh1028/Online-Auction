import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllCustomer(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/user/fetch/role-wise?role=Customer",
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
        
        .premium-all-customers-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-all-customers-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .table-all-customers-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-all-customers-premium thead th {
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
        
        .table-all-customers-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-all-customers-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-all-customers-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .customer-name-all {
          color: #2c3e50;
          font-weight: 700;
          font-size: 1rem;
        }
        
        .customer-email-all {
          color: #495057;
          font-weight: 500;
        }
        
        .customer-phone-all {
          color: #28a745;
          font-weight: 600;
        }
        
        .customer-address-all {
          color: #6c757d;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .scroll-container-all-customers {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-all-customers::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-all-customers::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-all-customers::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .empty-state-all-customers {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-state-icon-all-customers {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
      `}</style>

      <div className="card premium-all-customers-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header premium-all-customers-header text-center">
          <h2 className="heading-font text-white m-0">All Customers</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            View all registered customers ({allCustomer.length} {allCustomer.length === 1 ? 'customer' : 'customers'})
          </p>
        </div>
        
        <div className="card-body scroll-container-all-customers" style={{ overflowY: "auto" }}>
          {allCustomer.length === 0 ? (
            <div className="empty-state-all-customers">
              <div className="empty-state-icon-all-customers">👥</div>
              <h4 className="heading-font">No Customers Found</h4>
              <p>Customers will appear here once they register</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-all-customers-premium table-hover">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.map((customer) => {
                    return (
                      <tr key={customer.id}>
                        <td>
                          <span className="customer-name-all">{customer.firstName}</span>
                        </td>
                        <td>
                          <span className="customer-name-all">{customer.lastName}</span>
                        </td>
                        <td>
                          <span className="customer-email-all">{customer.emailId}</span>
                        </td>
                        <td>
                          <span className="customer-phone-all">{customer.phoneNo}</span>
                        </td>
                        <td>
                          <span className="customer-address-all">
                            {customer.address.street +
                              ", " +
                              customer.address.city +
                              ", " +
                              customer.address.pincode}
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

export default ViewAllCustomers;