// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";

// const ViewAllOrders = () => {
//   const [orders, setOrders] = useState([]);

//   const [orderId, setOrderId] = useState("");
//   const [tempOrderId, setTempOrderId] = useState("");

//   const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

//   useEffect(() => {
//     const getAllOrders = async () => {
//       let allOrders;
//       if (orderId) {
//         allOrders = await retrieveOrdersById();
//       } else {
//         allOrders = await retrieveAllorders();
//       }

//       if (allOrders) {
//         setOrders(allOrders.orders);
//       }
//     };

//     getAllOrders();
//   }, [orderId]);

//   const retrieveAllorders = async () => {
//     const response = await axios.get(
//       "http://localhost:9090/api/order/fetch/all",
//       {
//         headers: {
//           Authorization: "Bearer " + admin_jwtToken,
//         },
//       }
//     );
//     console.log(response.data);
//     return response.data;
//   };

//   const retrieveOrdersById = async () => {
//     const response = await axios.get(
//       "http://localhost:9090/api/order/fetch?orderId=" + orderId
//     );
//     console.log(response.data);
//     return response.data;
//   };

//   const formatDateFromEpoch = (epochTime) => {
//     const date = new Date(Number(epochTime));
//     const formattedDate = date.toLocaleString();
//     return formattedDate;
//   };

//   const searchOrderById = (e) => {
//     e.preventDefault();
//     setOrderId(tempOrderId);
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       Pending: "badge bg-warning text-dark",
//       Processing: "badge bg-info text-white",
//       Delivered: "badge bg-success",
//       Cancelled: "badge bg-danger"
//     };
//     return badges[status] || "badge bg-secondary";
//   };

//   return (
//     <div className="mt-4 mb-5">
//       <div className="container-fluid px-4">
//         {/* Header Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <h1 className="text-color mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: "600" }}>
//                   All Orders
//                 </h1>
//                 <p className="text-secondary mb-0">View and manage all customer orders</p>
//               </div>
//               <div className="text-end">
//                 <span className="badge bg-color custom-bg-text px-3 py-2" style={{ fontSize: "1rem" }}>
//                   {orders.length} Orders
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
//               <div className="card-body py-3">
//                 <form className="row g-3 align-items-center" onSubmit={searchOrderById}>
//                   <div className="col-auto">
//                     <label className="text-color fw-semibold">
//                       <i className="fas fa-search me-2"></i>Search Order
//                     </label>
//                   </div>
//                   <div className="col-auto" style={{ minWidth: "300px" }}>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Order ID..."
//                       onChange={(e) => setTempOrderId(e.target.value)}
//                       value={tempOrderId}
//                       style={{
//                         borderRadius: "0.5rem",
//                         border: "2px solid #e0e0e0",
//                         padding: "0.5rem 1rem"
//                       }}
//                     />
//                   </div>
//                   <div className="col-auto">
//                     <button
//                       type="submit"
//                       className="btn bg-color custom-bg-text px-4"
//                       style={{ borderRadius: "0.5rem" }}
//                     >
//                       <i className="fas fa-search me-2"></i>Search
//                     </button>
//                   </div>
//                   {orderId && (
//                     <div className="col-auto">
//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary px-4"
//                         onClick={() => {
//                           setOrderId("");
//                           setTempOrderId("");
//                         }}
//                         style={{ borderRadius: "0.5rem" }}
//                       >
//                         <i className="fas fa-times me-2"></i>Clear
//                       </button>
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Orders Table Section */}
//         <div className="row">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0" style={{ fontSize: "0.85rem" }}>
//                     <thead className="bg-color custom-bg-text">
//                       <tr>
//                         <th scope="col" className="py-3 px-3">ID</th>
//                         <th scope="col" className="py-3 px-3">Image</th>
//                         <th scope="col" className="py-3 px-3">Product</th>
//                         <th scope="col" className="py-3 px-3">Category</th>
//                         <th scope="col" className="py-3 px-3">Seller</th>
//                         <th scope="col" className="py-3 px-3">Ask</th>
//                         <th scope="col" className="py-3 px-3">Win</th>
//                         <th scope="col" className="py-3 px-3 text-center">Qty</th>
//                         <th scope="col" className="py-3 px-3">Customer</th>
//                         <th scope="col" className="py-3 px-3">Status</th>
//                         <th scope="col" className="py-3 px-3">Delivery</th>
//                         <th scope="col" className="py-3 px-3">Contact</th>
//                         <th scope="col" className="py-3 px-3">Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.length === 0 ? (
//                         <tr>
//                           <td colSpan="13" className="text-center py-5">
//                             <div className="text-secondary">
//                               <i className="fas fa-shopping-cart fa-3x mb-3 d-block"></i>
//                               <h5>No Orders Found</h5>
//                               <p className="mb-0">Orders will appear here once customers make purchases</p>
//                             </div>
//                           </td>
//                         </tr>
//                       ) : (
//                         orders.map((order, index) => {
//                           return (
//                             <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
//                               <td className="px-3 py-3 align-middle">
//                                 <span className="badge bg-light text-color border px-2 py-1" style={{ fontSize: "0.75rem" }}>
//                                   {order.orderId}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-3">
//                                 <div style={{ width: "50px", height: "50px", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
//                                   <img
//                                     src={
//                                       "http://localhost:9090/api/product/" +
//                                       order.product.image1
//                                     }
//                                     className="img-fluid"
//                                     alt="product"
//                                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                                   />
//                                 </div>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <div className="fw-semibold text-color" style={{ fontSize: "0.85rem", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                   {order.product.name}
//                                 </div>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: "0.7rem" }}>
//                                   {order.product.category.name}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <span className="text-color" style={{ fontSize: "0.85rem" }}>
//                                   {order.product.seller.firstName}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <div className="text-color fw-semibold" style={{ fontSize: "0.85rem" }}>₹{order.product.price}</div>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <div className="text-success fw-bold" style={{ fontSize: "0.85rem" }}>₹{order.productOffer.amount}</div>
//                               </td>
//                               <td className="px-3 py-3 align-middle text-center">
//                                 <span className="fw-semibold" style={{ fontSize: "0.85rem" }}>{order.quantity}</span>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <span className="text-color" style={{ fontSize: "0.85rem" }}>
//                                   {order.user.firstName}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 <span className={getStatusBadge(order.status)} style={{ fontSize: "0.7rem", padding: "0.3rem 0.6rem" }}>
//                                   {order.status}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 {order.deliveryPerson ? (
//                                   <span className="text-color" style={{ fontSize: "0.85rem" }}>
//                                     {order.deliveryPerson.firstName}
//                                   </span>
//                                 ) : (
//                                   <span className="badge bg-warning text-dark" style={{ fontSize: "0.7rem", padding: "0.25rem 0.5rem" }}>
//                                     Pending
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 {order.deliveryPerson ? (
//                                   <span className="text-color" style={{ fontSize: "0.8rem" }}>
//                                     {order.deliveryPerson.phoneNo}
//                                   </span>
//                                 ) : (
//                                   <span className="badge bg-warning text-dark" style={{ fontSize: "0.7rem", padding: "0.25rem 0.5rem" }}>
//                                     Pending
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-3 py-3 align-middle">
//                                 {order.deliveryDate ? (
//                                   <span className="text-color" style={{ fontSize: "0.75rem", maxWidth: "100px", display: "block" }}>
//                                     {order.deliveryDate}<br/>{order.deliveryTime}
//                                   </span>
//                                 ) : (
//                                   <span className="badge bg-warning text-dark" style={{ fontSize: "0.7rem", padding: "0.25rem 0.5rem" }}>
//                                     Pending
//                                   </span>
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         tbody tr:hover {
//           background-color: #f8f9fa;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ViewAllOrders;

//2nd option
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

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

    getAllOrders();
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/order/fetch/all",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
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

  const getStatusBadge = (status) => {
    const badges = {
      Pending: "badge bg-warning text-dark",
      Processing: "badge bg-info text-white",
      Delivered: "badge bg-success",
      Cancelled: "badge bg-danger"
    };
    return badges[status] || "badge bg-secondary";
  };

  return (
    <div className="mt-4 mb-5">
      <div className="container-fluid px-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="text-color mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: "600" }}>
                  All Orders
                </h1>
                <p className="text-secondary mb-0">View and manage all customer orders</p>
              </div>
              <div className="text-end">
                <span className="badge bg-color custom-bg-text px-3 py-2" style={{ fontSize: "1rem" }}>
                  {orders.length} Orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
              <div className="card-body py-3">
                <form className="row g-3 align-items-center" onSubmit={searchOrderById}>
                  <div className="col-auto">
                    <label className="text-color fw-semibold">
                      <i className="fas fa-search me-2"></i>Search Order
                    </label>
                  </div>
                  <div className="col-auto" style={{ minWidth: "300px" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Order ID..."
                      onChange={(e) => setTempOrderId(e.target.value)}
                      value={tempOrderId}
                      style={{
                        borderRadius: "0.5rem",
                        border: "2px solid #e0e0e0",
                        padding: "0.5rem 1rem"
                      }}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn bg-color custom-bg-text px-4"
                      style={{ borderRadius: "0.5rem" }}
                    >
                      <i className="fas fa-search me-2"></i>Search
                    </button>
                  </div>
                  {orderId && (
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={() => {
                          setOrderId("");
                          setTempOrderId("");
                        }}
                        style={{ borderRadius: "0.5rem" }}
                      >
                        <i className="fas fa-times me-2"></i>Clear
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table Section */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-color custom-bg-text">
                      <tr>
                        <th scope="col" className="py-3 px-4">Order ID</th>
                        <th scope="col" className="py-3 px-4">Product</th>
                        <th scope="col" className="py-3 px-4">Name</th>
                        <th scope="col" className="py-3 px-4">Category</th>
                        <th scope="col" className="py-3 px-4">Seller</th>
                        <th scope="col" className="py-3 px-4">Ask Price</th>
                        <th scope="col" className="py-3 px-4">Win Price</th>
                        <th scope="col" className="py-3 px-4">Qty</th>
                        <th scope="col" className="py-3 px-4">Customer</th>
                        <th scope="col" className="py-3 px-4">Status</th>
                        <th scope="col" className="py-3 px-4">Delivery Person</th>
                        <th scope="col" className="py-3 px-4">Contact</th>
                        <th scope="col" className="py-3 px-4">Delivery Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="13" className="text-center py-5">
                            <div className="text-secondary">
                              <i className="fas fa-shopping-cart fa-3x mb-3 d-block"></i>
                              <h5>No Orders Found</h5>
                              <p className="mb-0">Orders will appear here once customers make purchases</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        orders.map((order, index) => {
                          return (
                            <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                              <td className="px-4 py-3 align-middle">
                                <span className="badge bg-light text-color border px-2 py-2" style={{ fontSize: "0.85rem" }}>
                                  {order.orderId}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div style={{ width: "60px", height: "60px", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                                  <img
                                    src={
                                      "http://localhost:9090/api/product/" +
                                      order.product.image1
                                    }
                                    className="img-fluid"
                                    alt="product"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="fw-semibold text-color" style={{ fontSize: "0.9rem" }}>
                                  {order.product.name}
                                </div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: "0.8rem" }}>
                                  {order.product.category.name}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <span className="text-color" style={{ fontSize: "0.9rem" }}>
                                  {order.product.seller.firstName}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="text-color fw-semibold">₹{order.product.price}</div>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <div className="text-success fw-bold">₹{order.productOffer.amount}</div>
                              </td>
                              <td className="px-4 py-3 align-middle text-center">
                                <span className="fw-semibold">{order.quantity}</span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <span className="text-color" style={{ fontSize: "0.9rem" }}>
                                  {order.user.firstName}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                <span className={getStatusBadge(order.status)} style={{ fontSize: "0.8rem", padding: "0.35rem 0.7rem" }}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-middle">
                                {order.deliveryPerson ? (
                                  <span className="text-color" style={{ fontSize: "0.9rem" }}>
                                    {order.deliveryPerson.firstName}
                                  </span>
                                ) : (
                                  <span className="badge bg-warning text-dark" style={{ fontSize: "0.75rem" }}>
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 align-middle">
                                {order.deliveryPerson ? (
                                  <span className="text-color" style={{ fontSize: "0.9rem" }}>
                                    <i className="fas fa-phone me-1 text-secondary" style={{ fontSize: "0.75rem" }}></i>
                                    {order.deliveryPerson.phoneNo}
                                  </span>
                                ) : (
                                  <span className="badge bg-warning text-dark" style={{ fontSize: "0.75rem" }}>
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 align-middle">
                                {order.deliveryDate ? (
                                  <span className="text-color" style={{ fontSize: "0.85rem" }}>
                                    <i className="fas fa-calendar me-1 text-secondary" style={{ fontSize: "0.75rem" }}></i>
                                    {order.deliveryDate} {order.deliveryTime}
                                  </span>
                                ) : (
                                  <span className="badge bg-warning text-dark" style={{ fontSize: "0.75rem" }}>
                                    Pending
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        tbody tr:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default ViewAllOrders;