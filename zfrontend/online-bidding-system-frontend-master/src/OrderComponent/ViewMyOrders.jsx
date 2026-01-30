import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewMyOrders = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [orders, setOrders] = useState([]);

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await retrieveCart();
      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    getAllOrders();
  }, []);

  const retrieveCart = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch/user-wise?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-success';
      case 'processing': return 'bg-primary';
      case 'shipped': return 'bg-info';
      case 'cancelled': return 'bg-danger';
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
        
        .premium-orders-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-orders-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .table-orders-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-orders-premium thead th {
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
        
        .table-orders-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-orders-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-orders-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .product-img-orders {
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          cursor: zoom-in;
        }
        
        .product-img-orders:hover {
          transform: scale(2.5);
          z-index: 1000;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .status-badge-orders {
          padding: -0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .order-id {
          color: #2c3e50;
          font-weight: 700;
          font-family: monospace;
          font-size: 1rem;
        }
        
        .product-name {
          color: #2c3e50;
          font-weight: 700;
        }
        
        .category-name {
          color: #6c757d;
          font-weight: 600;
        }
        
        .seller-name {
          color: #495057;
          font-weight: 600;
        }
        
        .win-price {
          color: #28a745;
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .delivery-pending {
          color: #dc3545;
          font-weight: 600;
          font-style: italic;
        }
        
        .delivery-info {
          color: #495057;
          font-weight: 600;
        }
        
        .scroll-container-orders {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-orders::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-orders::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-orders::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .empty-state-orders {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-state-icon-orders {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
      `}</style>

      <div className="card premium-orders-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "40rem" }}>
        <div className="card-header premium-orders-header text-center">
          <h2 className="heading-font text-white m-0">My Orders</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            Track your order history ({orders.length} {orders.length === 1 ? 'order' : 'orders'})
          </p>
        </div>
        
        <div className="card-body scroll-container-orders" style={{ overflowY: "auto" }}>
          {orders.length === 0 ? (
            <div className="empty-state-orders">
              <div className="empty-state-icon-orders">📦</div>
              <h4 className="heading-font">No Orders Yet</h4>
              <p>Your orders will appear here once you make a purchase</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-orders-premium table-hover">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Win Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Delivery Person</th>
                    <th scope="col">Delivery Contact</th>
                    <th scope="col">Delivery Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr key={order.orderId}>
                        <td>
                          <span className="order-id">{order.orderId}</span>
                        </td>
                        <td>
                          <img
                            src={
                              "http://localhost:9090/api/product/" +
                              order.product.image1
                            }
                            className="img-fluid product-img-orders"
                            alt="product_pic"
                            style={{
                              maxWidth: "90px",
                            }}
                          />
                        </td>
                        <td>
                          <span className="product-name">{order.product.name}</span>
                        </td>
                        <td>
                          <span className="category-name">{order.product.category.name}</span>
                        </td>
                        <td>
                          <span className="seller-name">{order.product.seller.firstName}</span>
                        </td>
                        <td>
                          <span className="win-price">₹{order.productOffer.amount}</span>
                        </td>
                        <td>
                          <span className="text-color font-weight-bold">{order.quantity}</span>
                        </td>
                        <td>
                          <span className={`status-badge-orders ${getStatusColor(order.status)} text-white`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          {(() => {
                            if (order.deliveryPerson) {
                              return <span className="delivery-info">{order.deliveryPerson.firstName}</span>;
                            } else {
                              return <span className="delivery-pending">Pending</span>;
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (order.deliveryPerson) {
                              return <span className="delivery-info">{order.deliveryPerson.phoneNo}</span>;
                            } else {
                              return <span className="delivery-pending">Pending</span>;
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (order.deliveryDate) {
                              return (
                                <span className="delivery-info">
                                  {order.deliveryDate + " " + order.deliveryTime}
                                </span>
                              );
                            } else {
                              return <span className="delivery-pending">Pending</span>;
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
    </div>
  );
};

export default ViewMyOrders;