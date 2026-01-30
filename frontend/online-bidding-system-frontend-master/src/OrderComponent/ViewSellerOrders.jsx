import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewSellerOrders = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const [orders, setOrders] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const [assignOrderId, setAssignOrderId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");

  const [allDelivery, setAllDelivery] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById();
      } else {
        allOrders = await retrieveAllorders();
      }

      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllOrders();
    getAllUsers();
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch/seller-wise?sellerId=" + seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

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

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch?orderId=" + orderId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  const assignDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const assignToDelivery = (orderId, e) => {
    let data = { orderId: assignOrderId, deliveryId: deliveryPersonId };

    fetch("http://localhost:9090/api/order/assign/delivery-person", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + seller_jwtToken,
      },
      body: JSON.stringify(data),
    })
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
            setOrders(res.orders);
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
        
        .premium-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .search-input-premium {
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }
        
        .search-input-premium:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
          outline: none;
        }
        
        .btn-premium {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-premium:hover {
          background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(44, 62, 80, 0.3);
          color: white;
        }
        
        .table-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-premium thead th {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          font-weight: 600;
          padding: 1rem;
          border: none;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .table-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.01);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .table-premium tbody td {
          padding: 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .product-img-premium {
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .product-img-premium:hover {
          transform: scale(1.05);
        }
        
        .status-badge-premium {
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
        }
        
        .modal-premium .modal-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        
        .modal-premium .modal-content {
          border: none;
          border-radius: 0.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .form-label-premium {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .form-control-premium {
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.75rem;
          transition: all 0.3s ease;
        }
        
        .form-control-premium:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
          outline: none;
        }
        
        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
      `}</style>

      <div className="card premium-card ms-2 me-2 mb-5" style={{ height: "40rem" }}>
        <div className="card-header premium-header">
          <h2 className="heading-font text-white m-0">Seller Orders</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>Manage and track all your orders</p>
        </div>
        
        <div className="card-body" style={{ overflowY: "auto" }}>
          <form className="row g-3 mb-4">
            <div className="col-auto flex-grow-1">
              <input
                type="text"
                className="form-control search-input-premium"
                placeholder="Search by Order ID..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-premium"
                onClick={searchOrderById}
              >
                Search
              </button>
            </div>
          </form>

          <div className="table-responsive scroll-container">
            <table className="table table-premium table-hover">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Asking Price</th>
                  <th scope="col">Win Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Delivery Contact</th>
                  <th scope="col">Delivery Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order.orderId}>
                      <td>
                        <b className="text-color">{order.orderId}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:9090/api/product/" +
                            order.product.image1
                          }
                          className="img-fluid product-img-premium"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b className="text-color">{order.product.name}</b>
                      </td>
                      <td>
                        <b className="text-color">{order.product.category.name}</b>
                      </td>
                      <td>
                        <b className="text-color">{order.product.seller.firstName}</b>
                      </td>
                      <td>
                        <b className="text-color">₹{order.product.price}</b>
                      </td>
                      <td>
                        <b className="text-success">₹{order.productOffer.amount}</b>
                      </td>
                      <td>
                        <b className="text-color">{order.quantity}</b>
                      </td>
                      <td>
                        <b className="text-color">{order.user.firstName}</b>
                      </td>
                      <td>
                        <span className={`status-badge-premium ${getStatusColor(order.status)} text-white`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b className="text-color">{order.deliveryPerson.firstName}</b>;
                          } else {
                            return <b className="text-danger">Pending</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b className="text-color">{order.deliveryPerson.phoneNo}</b>;
                          } else {
                            return <b className="text-danger">Pending</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryDate) {
                            return (
                              <b className="text-color">
                                {order.deliveryDate + " " + order.deliveryTime}
                              </b>
                            );
                          } else {
                            return <b className="text-warning">Processing</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return <b className="text-success">Delivery Assigned</b>;
                          } else {
                            return (
                              <button
                                className="btn btn-sm btn-premium"
                                variant="primary"
                                onClick={() => assignDelivery(order.orderId)}
                              >
                                Assign Delivery
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
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} className="modal-premium" centered>
        <Modal.Header closeButton className="bg-color custom-bg-text border-0">
          <Modal.Title className="heading-font">
            Assign To Delivery Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div>
            <form>
              <div className="mb-4">
                <label htmlFor="orderId" className="form-label form-label-premium">
                  Order ID
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-premium" 
                  id="orderId"
                  value={assignOrderId} 
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="form-label form-label-premium">
                  Delivery Person
                </label>
                <select
                  name="deliveryPersonId"
                  onChange={(e) => setDeliveryPersonId(e.target.value)}
                  className="form-control form-control-premium"
                >
                  <option value="">Select Delivery Person</option>
                  {allDelivery.map((delivery) => {
                    return (
                      <option key={delivery.id} value={delivery.id}>
                        {delivery.firstName + " " + delivery.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="d-flex align-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => assignToDelivery(assignOrderId)}
                  className="btn btn-premium w-100"
                >
                  Assign Delivery
                </button>
              </div>

              <ToastContainer />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose} className="rounded">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewSellerOrders;