import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewDeliveryOrders = () => {
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const [orders, setOrders] = useState([]);

  const delivery_jwtToken = sessionStorage.getItem("delivery-jwtToken");

  const [deliveryUpdateRequest, setDeliveryUpdateRequest] = useState({
    orderId: "",
    deliveryStatus: "",
    deliveryTime: "",
    deliveryDate: "",
    deliveryId: deliveryPerson.id,
  });

  const [deliveryStatus, setDeliveryStatus] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);

  const handleInput = (e) => {
    setDeliveryUpdateRequest({
      ...deliveryUpdateRequest,
      [e.target.name]: e.target.value,
    });
  };

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const [assignOrderId, setAssignOrderId] = useState("");

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

    const getAllDeliveryStatus = async () => {
      let allStatus = await retrieveAllDeliveryStatus();

      if (allStatus) {
        setDeliveryStatus(allStatus);
      }
    };

    const getAllDeliveryTiming = async () => {
      let allTiming = await retrieveAllDeliveryTiming();

      if (allTiming) {
        setDeliveryTime(allTiming);
      }
    };

    getAllOrders();
    getAllDeliveryStatus();
    getAllDeliveryTiming();
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch/delivery-wise?deliveryPersonId=" +
        deliveryPerson.id,
      {
        headers: {
          Authorization: "Bearer " + delivery_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveAllDeliveryStatus = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch/delivery-status/all"
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveAllDeliveryTiming = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch/delivery-time/all"
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

  const updateDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const updateOrderStatus = (orderId, e) => {
    deliveryUpdateRequest.orderId = assignOrderId;

    fetch("http://localhost:9090/api/order/update/delivery-status", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + delivery_jwtToken,
      },
      body: JSON.stringify(deliveryUpdateRequest),
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
        
        .premium-delivery-orders-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .premium-delivery-orders-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1em 1em 0 0 !important;
          padding: 1.5rem;
        }
        
        .search-input-delivery {
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }
        
        .search-input-delivery:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
          outline: none;
        }
        
        .btn-search-delivery {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-search-delivery:hover {
          background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(44, 62, 80, 0.3);
          color: white;
        }
        
        .table-delivery-orders-premium {
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-delivery-orders-premium thead th {
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
        
        .table-delivery-orders-premium tbody tr {
          transition: all 0.3s ease;
          background: white;
        }
        
        .table-delivery-orders-premium tbody tr:hover {
          background: #f8f9fa;
          transform: scale(1.005);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .table-delivery-orders-premium tbody td {
          padding: 1.25rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .product-img-delivery-orders {
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          cursor: zoom-in;
        }
        
        .product-img-delivery-orders:hover {
          transform: scale(2.5);
          z-index: 1000;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .status-badge-delivery-orders {
          padding: -0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .btn-update-status {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .btn-update-status:hover {
          background: linear-gradient(135deg, #138496 0%, #117a8b 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(23, 162, 184, 0.3);
          color: white;
        }
        
        .scroll-container-delivery-orders {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .scroll-container-delivery-orders::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scroll-container-delivery-orders::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scroll-container-delivery-orders::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .modal-delivery .modal-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        
        .modal-delivery .modal-content {
          border: none;
          border-radius: 0.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .form-label-delivery {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .form-control-delivery {
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.75rem;
          transition: all 0.3s ease;
        }
        
        .form-control-delivery:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
          outline: none;
        }
      `}</style>

      <div className="card premium-delivery-orders-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "40rem" }}>
        <div className="card-header premium-delivery-orders-header text-center">
          <h2 className="heading-font text-white m-0">My Delivery Orders</h2>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.95rem' }}>
            Manage your assigned deliveries
          </p>
        </div>
        
        <div className="card-body scroll-container-delivery-orders" style={{ overflowY: "auto" }}>
          <form className="row g-3 mb-4">
            <div className="col-auto flex-grow-1">
              <input
                type="text"
                className="form-control search-input-delivery"
                placeholder="Search by Order ID..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-search-delivery"
                onClick={searchOrderById}
              >
                Search
              </button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-delivery-orders-premium table-hover">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
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
                          className="img-fluid product-img-delivery-orders"
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
                        <b className="text-success">₹{order.productOffer.amount}</b>
                      </td>
                      <td>
                        <b className="text-color">{order.quantity}</b>
                      </td>
                      <td>
                        <b className="text-color">{order.user.firstName}</b>
                      </td>
                      <td>
                        <span className={`status-badge-delivery-orders ${getStatusColor(order.status)} text-white`}>
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
                          if (order.status === "Delivered") {
                            return <b className="text-success">Delivered</b>;
                          } else {
                            return (
                              <button
                                className="btn btn-sm btn-update-status"
                                onClick={() => updateDelivery(order.orderId)}
                              >
                                Update Status
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

      <Modal show={showModal} onHide={handleClose} className="modal-delivery" centered>
        <Modal.Header closeButton className="bg-color custom-bg-text border-0">
          <Modal.Title className="heading-font">
            Update Delivery Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div>
            <form>
              <div className="mb-4">
                <label htmlFor="orderId" className="form-label form-label-delivery">
                  Order ID
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-delivery" 
                  id="orderId"
                  value={assignOrderId} 
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label htmlFor="deliveryDate" className="form-label form-label-delivery">
                  Delivery Date
                </label>
                <input
                  type="date"
                  className="form-control form-control-delivery"
                  id="deliveryDate"
                  name="deliveryDate"
                  onChange={handleInput}
                  value={deliveryUpdateRequest.deliveryDate}
                />
              </div>

              <div className="mb-4">
                <label className="form-label form-label-delivery">
                  Delivery Time
                </label>
                <select
                  name="deliveryTime"
                  onChange={handleInput}
                  className="form-control form-control-delivery"
                >
                  <option value="">Select Delivery Time</option>
                  {deliveryTime.map((time, index) => {
                    return <option key={index} value={time}>{time}</option>;
                  })}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label form-label-delivery">
                  Delivery Status
                </label>
                <select
                  name="deliveryStatus"
                  onChange={handleInput}
                  className="form-control form-control-delivery"
                >
                  <option value="">Select Delivery Status</option>
                  {deliveryStatus.map((status, index) => {
                    return <option key={index} value={status}>{status}</option>;
                  })}
                </select>
              </div>

              <div className="d-flex align-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => updateOrderStatus(assignOrderId)}
                  className="btn btn-search-delivery w-100"
                >
                  Update Status
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

export default ViewDeliveryOrders;