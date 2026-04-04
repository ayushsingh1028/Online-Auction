import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || "profile"); // profile, orders, bids, wallet, transactions
    const [loading, setLoading] = useState(false);

    // Data states
    const [orders, setOrders] = useState([]);
    const [myOffers, setMyOffers] = useState([]);
    const [myTransactions, setMyTransactions] = useState([]);
    const [walletAmount, setWalletAmount] = useState(0);

    // Edit states
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        phoneNo: "",
        gender: "Male",
        address: { street: "", city: "", pincode: "" },
        walletAmount: 0
    });

    const [walletRequest, setWalletRequest] = useState({ walletAmount: "" });

    const jwtToken = sessionStorage.getItem("customer-jwtToken") || 
                     sessionStorage.getItem("admin-jwtToken") ||
                     sessionStorage.getItem("seller-jwtToken") ||
                     sessionStorage.getItem("delivery-jwtToken");

    useEffect(() => {
        const activeUser = JSON.parse(sessionStorage.getItem("active-customer")) || 
                           JSON.parse(sessionStorage.getItem("active-admin")) ||
                           JSON.parse(sessionStorage.getItem("active-seller"));
                           
        if (!activeUser) {
            navigate("/user/login");
            return;
        }
        setUser(activeUser);
        setFormData({
            firstName: activeUser.firstName || "",
            lastName: activeUser.lastName || "",
            emailId: activeUser.emailId || "",
            phoneNo: activeUser.phoneNo || "",
            gender: "Male",
            address: activeUser.address || { street: "", city: "", pincode: "" },
            walletAmount: activeUser.walletAmount || 0
        });
        setWalletAmount(activeUser.walletAmount || 0);

        // Check for tab update from location state
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [navigate, location.state]);

    // Data Fetchers
    useEffect(() => {
        if (!user) return;
        if (activeTab === "orders") fetchOrders();
        if (activeTab === "bids") fetchBids();
        if (activeTab === "wallet") fetchWalletBalance();
        if (activeTab === "transactions") fetchTransactions();
    }, [activeTab, user]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/wallet/transaction/fetch?userId=${user.id}`);
            if (response.data.success) setMyTransactions(response.data.transactions);
        } catch (e) { console.error("Error fetching transactions", e); }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/order/fetch/user-wise?userId=${user.id}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            if (response.data) setOrders(response.data.orders);
        } catch (e) { console.error("Error fetching orders", e); }
    };

    const fetchBids = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/product/offer/fetch/user?userId=${user.id}`);
            if (response.data) setMyOffers(response.data.offers);
        } catch (e) { console.error("Error fetching bids", e); }
    };

    const fetchWalletBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/user/fetch/user-id?userId=${user.id}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            if (response.data.success) {
                const bal = response.data.users[0].walletAmount;
                setWalletAmount(bal);
                setFormData(prev => ({ ...prev, walletAmount: bal }));
            }
        } catch (e) { console.error("Error fetching balance", e); }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        toast.success("Logged out successfully");
        navigate("/home");
        window.location.reload();
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWalletInput = (e) => {
        setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
    };

    const deleteProductOffer = (offerId) => {
        fetch(`http://localhost:9090/api/product/offer/id?offerId=${offerId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then(res => res.json()).then(res => {
            if (res.success) {
                toast.success(res.responseMessage);
                fetchBids();
            } else {
                toast.error(res.responseMessage);
            }
        });
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            if (!jwtToken || jwtToken === "null") {
                toast.error("Session expired. Please login again.");
                return;
            }

            const updateRequest = {
                userId: user.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNo: formData.phoneNo,
                street: formData.address.street,
                city: formData.address.city,
                pincode: formData.address.pincode ? parseInt(formData.address.pincode) : 0
            };

            const res = await axios.put("http://localhost:9090/api/user/update/profile", updateRequest, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });

            if (res.data.success || res.data.isSuccess) {
                toast.success(res.data.responseMessage || "Profile updated successfully!");
                setIsEditingName(false);
                setIsEditingPhone(false);
                setIsEditingAddress(false);
                
                // Construct the updated user object carefully
                const updatedUser = { 
                    ...user, 
                    firstName: updateRequest.firstName,
                    lastName: updateRequest.lastName,
                    phoneNo: updateRequest.phoneNo,
                    address: { 
                        ...user.address, 
                        street: updateRequest.street, 
                        city: updateRequest.city, 
                        pincode: updateRequest.pincode 
                    } 
                };

                const roleKey = user.role === 'Admin' ? 'active-admin' : 
                              user.role === 'Seller' ? 'active-seller' :
                              user.role === 'Delivery' ? 'active-delivery' : 'active-customer';
                
                sessionStorage.setItem(roleKey, JSON.stringify(updatedUser));
                setUser(updatedUser);
            } else {
                toast.error(res.data.responseMessage || "Failed to update profile");
            }
        } catch (error) {
            console.error("Profile update error detail:", error);
            const serverError = error.response?.data?.responseMessage || error.response?.data?.message || error.message;
            toast.error(serverError || "An error occurred while updating profile");
        } finally {
            setLoading(false);
        }
    };

    const handleAddressChange = (e) => {
        setFormData({
            ...formData,
            address: { ...formData.address, [e.target.name]: e.target.value }
        });
    };

    const addMoneyInWallet = async (e) => {
        e.preventDefault();
        const amount = walletRequest.walletAmount;
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            toast.error("Enter a valid amount"); return;
        }
        setLoading(true);
        try {
            const orderRes = await axios.post("http://localhost:9090/api/payment/create-order", { userId: user.id, amount }, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            const { razorpayOrderId, amount: rzpAmount, currency, keyId } = orderRes.data;
            const options = {
                key: keyId, amount: rzpAmount, currency, name: "Bidding System",
                description: "Add Money to Wallet", order_id: razorpayOrderId,
                handler: async (response) => {
                    const verifyRes = await axios.post("http://localhost:9090/api/payment/verify-payment", {
                        userId: user.id, amount, razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature
                    }, { headers: { Authorization: `Bearer ${jwtToken}` } });
                    if (verifyRes.data.success) {
                        toast.success("Wallet Updated!");
                        setWalletRequest({ walletAmount: "" });
                        fetchWalletBalance();
                    }
                },
                prefill: { name: `${user.firstName} ${user.lastName}`, email: user.emailId, contact: user.phoneNo },
                theme: { color: "#2874f0" }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) { toast.error("Payment initiation failed"); }
        finally { setLoading(false); }
    };

    if (!user) return null;

    return (
        <div className="profile-page-bg">
            <style jsx>{`
                .profile-page-bg { background-color: #f1f3f6; min-height: 100vh; padding: 32px 0; }
                .profile-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 280px 1fr; gap: 16px; }
                .sidebar-card { background: white; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1); border-radius: 4px; }
                .user-header { padding: 12px 16px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
                .user-img { width: 50px; height: 50px; border-radius: 50%; background: #f0f0f0; padding: 2px; }
                .sidebar-menu { padding: 0; overflow: hidden; }
                .menu-section { border-bottom: 1px solid #f0f0f0; padding-bottom: 0px; }
                .menu-section:last-child { border-bottom: none; }
                
                .section-header { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    padding: 16px 20px; 
                    color: #878787; 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    font-size: 12px; 
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .section-header:hover { color: #2c3e50; background: #fafafa; }
                .section-header i { color: #2c3e50; width: 20px; text-align: center; font-size: 15px; }
                
                .menu-item { 
                    display: block; 
                    padding: 10px 16px 10px 52px; 
                    color: #4b6584; 
                    text-decoration: none; 
                    font-size: 14px; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    border-left: 3px solid transparent;
                }
                .menu-item:hover { background: #f8fafc; color: #2c3e50; }
                .menu-item.active { 
                    background: #f1f5f9; 
                    color: #2c3e50; 
                    font-weight: 600; 
                    border-left: 3px solid #2c3e50;
                }
                
                .section-header.active {
                    color: #2c3e50;
                }

                .logout-btn { 
                    width: 100%; 
                    border: none; 
                    background: none; 
                    padding: 18px 20px; 
                    display: flex; 
                    align-items: center; 
                    gap: 16px; 
                    color: #2c3e50; 
                    font-weight: 700; 
                    cursor: pointer; 
                    border-top: 1px solid #f0f0f0;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: all 0.2s;
                }
                .logout-btn:hover { background: #fff5f5; color: #d32f2f; }
                .logout-btn i { font-size: 16px; }
                
                .main-content { display: flex; flex-direction: column; gap: 16px; }
                .content-card { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.08); padding: 30px 40px; min-height: 500px; }
                .wallet-summary { display: flex; justify-content: space-between; align-items: center; background: linear-gradient(90deg, #2c3e50 0%, #4b6584 100%); color: white; padding: 20px 40px; border-radius: 2px; }
                
                .section-title { font-size: 18px; font-weight: 600; margin-bottom: 24px; display: block; }
                .profile-input { width: 100%; padding: 12px 15px; border: 1px solid #e0e0e0; border-radius: 2px; font-size: 14px; background: #fafafa; margin-bottom: 10px; }
                .save-btn { background: #fb641b; color: white; border: none; padding: 12px 40px; font-weight: 600; cursor: pointer; margin-top: 10px; }
                
                .dash-table { width: 100%; border-collapse: collapse; }
                .dash-table th { background: #f1f3f6; padding: 12px; font-size: 13px; text-align: left; color: #878787; text-transform: uppercase; }
                .dash-table td { padding: 16px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; vertical-align: middle; }
                .status-badge { padding: 4px 12px; border-radius: 4px; color: white; font-size: 12px; font-weight: 600; }
                .bg-active { background: #28a745; }
                .bg-won { background: #2c3e50; }
                .bg-lost { background: #dc3545; }
                .bg-pending { background: #ffc107; color: #212121; }
                .bg-deposit { background: #28a745; }
                .bg-payment { background: #dc3545; }
                .bg-earnings { background: #17a2b8; }

                .amt-btn { flex: 1; padding: 10px; border: 1px solid #e0e0e0; background: white; cursor: pointer; font-weight: 600; }
                .amt-btn:hover { border-color: #2c3e50; color: #2c3e50; }

                .pointer { cursor: pointer !important; }
                .edit-link { 
                    font-size: 13px; 
                    font-weight: 600; 
                    text-transform: uppercase; 
                    letter-spacing: 0.3px;
                    transition: all 0.2s;
                    user-select: none;
                }
                .edit-link:hover { color: #1a252f !important; text-decoration: underline; }
                
                .profile-input:focus:not(:disabled) {
                    border-color: #2c3e50;
                    background: white;
                    box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
                    outline: none;
                }
                .profile-input:not(:disabled) {
                    background: white;
                    border-color: #2c3e50;
                    cursor: text;
                }
                .text-primary { color: #2c3e50 !important; }
            `}</style>

            <div className="profile-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-card user-header shadow-sm">
                        <div className="user-img d-flex align-items-center justify-content-center bg-light border">
                            <i className="fas fa-user-circle fa-2x text-secondary"></i>
                        </div>
                        <div>
                            <div className="hello-text" style={{fontSize: '12px', color: '#878787'}}>Hello,</div>
                            <div className="user-name-title" style={{fontWeight: 600}}>{user?.firstName} {user?.lastName}</div>
                        </div>
                    </div>

                    <div className="sidebar-card sidebar-menu shadow-sm">
                        <div className="menu-section">
                            <div className={`section-header ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab("orders")}>
                                <i className="fas fa-shopping-bag"></i>
                                <span>My Orders</span>
                                <i className="fas fa-chevron-right ms-auto" style={{fontSize: '10px', opacity: 0.5}}></i>
                            </div>
                        </div>

                        <div className="menu-section">
                            <div className={`section-header ${activeTab === 'bids' ? 'active' : ''}`} onClick={() => setActiveTab("bids")}>
                                <i className="fas fa-gavel"></i>
                                <span>My Bids</span>
                                <i className="fas fa-chevron-right ms-auto" style={{fontSize: '10px', opacity: 0.5}}></i>
                            </div>
                        </div>

                        <div className="menu-section">
                            <div className="section-header">
                                <i className="fas fa-user"></i>
                                <span>Account Settings</span>
                            </div>
                            <div className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab("profile")}>Profile Information</div>
                        </div>

                        <div className="menu-section">
                            <div className={`section-header ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab("wallet")}>
                                <i className="fas fa-wallet"></i>
                                <span>My Wallet</span>
                                <i className="fas fa-chevron-right ms-auto" style={{fontSize: '10px', opacity: 0.5}}></i>
                            </div>
                            <div className={`menu-item ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab("transactions")}>Transaction History</div>
                        </div>

                        <button onClick={handleLogout} className="logout-btn">
                            <i className="fas fa-power-off"></i>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Content Panel */}
                <div className="main-content">
                    {/* Permanent Balance Summary */}
                    <div className="wallet-summary shadow-sm">
                        <div>
                            <div style={{fontSize: '14px', opacity: 0.9}}>Wallet Balance</div>
                            <div style={{fontSize: '24px', fontWeight: 700}}>₹{walletAmount?.toLocaleString() || 0}</div>
                        </div>
                        <button className="btn btn-light fw-bold text-primary px-4 py-2" onClick={() => setActiveTab("wallet")}>
                           TOP UP
                        </button>
                    </div>

                    <div className="content-card shadow-sm">
                        {activeTab === "profile" && (
                            <div className="animate__animated animate__fadeIn">
                                <span className="section-title">Profile Information</span>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="small text-muted mb-1">First Name</label>
                                        <input type="text" name="firstName" className="profile-input" value={formData?.firstName} onChange={handleInputChange} disabled={!isEditingName} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted mb-1">Last Name</label>
                                        <input type="text" name="lastName" className="profile-input" value={formData?.lastName} onChange={handleInputChange} disabled={!isEditingName} />
                                    </div>
                                    <div className="col-12 mt-0">
                                        {!isEditingName ? (
                                            <span className="edit-link text-primary pointer mb-3 d-inline-block" onClick={() => setIsEditingName(true)}>
                                                Edit Name
                                            </span>
                                        ) : (
                                            <div className="d-flex gap-3 mb-3">
                                                <span className="edit-link text-success pointer fw-bold" onClick={handleSaveProfile}>Done</span>
                                                <span className="edit-link text-danger pointer fw-bold" onClick={() => {
                                                    setFormData(prev => ({ ...prev, firstName: user?.firstName, lastName: user?.lastName }));
                                                    setIsEditingName(false);
                                                }}>Cancel</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <label className="small text-muted mb-1">Email</label>
                                        <input type="text" className="profile-input" value={formData?.emailId} disabled style={{background: '#f5f5f5'}} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted mb-1">Phone Number</label>
                                        <div className="d-flex gap-2">
                                            <input type="text" name="phoneNo" className="profile-input" value={formData?.phoneNo} onChange={handleInputChange} disabled={!isEditingPhone} />
                                            {!isEditingPhone ? (
                                                <span className="edit-link text-primary pointer align-self-center mb-2" style={{fontSize: '14px', whiteSpace: 'nowrap'}} onClick={() => setIsEditingPhone(true)}>
                                                    Edit
                                                </span>
                                            ) : (
                                                <div className="d-flex gap-2 align-self-center mb-2">
                                                    <span className="edit-link text-success pointer fw-bold" style={{fontSize: '14px'}} onClick={handleSaveProfile}>Done</span>
                                                    <span className="edit-link text-danger pointer fw-bold" style={{fontSize: '14px'}} onClick={() => {
                                                        setFormData(prev => ({ ...prev, phoneNo: user?.phoneNo }));
                                                        setIsEditingPhone(false);
                                                    }}>Cancel</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {(loading) && (
                                        <div className="col-12 mt-2">
                                            <p className="text-primary small fw-bold">SAVING PROGRESS...</p>
                                        </div>
                                    )}

                                    <div className="col-12 mt-5">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="section-title mb-0">Manage Addresses</span>
                                            {!isEditingAddress && (
                                                <button className="btn btn-outline-primary btn-sm px-3" onClick={() => setIsEditingAddress(true)}>
                                                    <i className="fas fa-plus me-1"></i> UPDATE ADDRESS
                                                </button>
                                            )}
                                        </div>
                                        
                                        {!isEditingAddress ? (
                                            <div className="p-4 bg-light border rounded position-relative">
                                                <div className="mb-2"><span className="text-muted fw-bold me-2">Street:</span> {formData?.address?.street || "N/A"}</div>
                                                <div className="mb-2"><span className="text-muted fw-bold me-2">City:</span> {formData?.address?.city || "N/A"}</div>
                                                <div className="mb-0"><span className="text-muted fw-bold me-2">Pincode:</span> {formData?.address?.pincode || "N/A"}</div>
                                            </div>
                                        ) : (
                                            <div className="p-4 border rounded animate__animated animate__fadeIn">
                                                <div className="row g-3">
                                                    <div className="col-12">
                                                        <label className="small text-muted mb-1">Street Address</label>
                                                        <input type="text" name="street" className="profile-input" value={formData?.address?.street} onChange={handleAddressChange} placeholder="123 Main St" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small text-muted mb-1">City</label>
                                                        <input type="text" name="city" className="profile-input" value={formData?.address?.city} onChange={handleAddressChange} placeholder="City Name" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small text-muted mb-1">Pincode</label>
                                                        <input type="text" name="pincode" className="profile-input" value={formData?.address?.pincode} onChange={handleAddressChange} placeholder="Pincode" />
                                                    </div>
                                                    <div className="col-12 mt-4 d-flex gap-2">
                                                        <button className="save-btn m-0" onClick={handleSaveProfile} disabled={loading}>
                                                            {loading ? "SAVING..." : "SAVE ADDRESS"}
                                                        </button>
                                                        <button className="btn btn-light px-4" onClick={() => setIsEditingAddress(false)}>CANCEL</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="animate__animated animate__fadeIn">
                                <span className="section-title">My Orders History</span>
                                <div className="table-responsive">
                                    <table className="dash-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Order ID</th>
                                                <th>Seller</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.length > 0 ? orders.map(order => (
                                                <tr key={order?.orderId}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img src={`http://localhost:9090/api/product/${order?.product?.image1}`} width="50" height="50" className="rounded shadow-sm" alt="img" />
                                                            <span className="fw-600">{order?.product?.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-muted small">{order?.orderId}</td>
                                                    <td>{order?.product?.seller?.firstName || "N/A"}</td>
                                                    <td className="fw-bold text-success">₹{order?.productOffer?.amount}</td>
                                                    <td><span className={`status-badge ${order?.status === 'Delivered' ? 'bg-won' : 'bg-pending'}`}>{order?.status}</span></td>
                                                </tr>
                                            )) : <tr><td colSpan="5" className="text-center py-5 text-muted">No orders found.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "bids" && (
                            <div className="animate__animated animate__fadeIn">
                                <span className="section-title">My Bidding Activity</span>
                                <div className="table-responsive">
                                    <table className="dash-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Min. Price</th>
                                                <th>My Bid</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myOffers.length > 0 ? myOffers.map(offer => (
                                                <tr key={offer?.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img src={`http://localhost:9090/api/product/${offer?.product?.image1}`} width="50" height="50" className="rounded shadow-sm" alt="img" />
                                                            <span className="fw-600">{offer?.product?.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>₹{offer?.product?.price}</td>
                                                    <td className="fw-bold text-primary">₹{offer?.amount}</td>
                                                    <td><span className={`status-badge ${offer?.status === 'Active' ? 'bg-active' : offer?.status === 'Win' ? 'bg-won' : 'bg-lost'}`}>{offer?.status}</span></td>
                                                    <td>{offer?.status === 'Active' && <button onClick={() => deleteProductOffer(offer?.id)} className="btn btn-sm btn-outline-danger px-3">Cancel</button>}</td>
                                                </tr>
                                            )) : <tr><td colSpan="5" className="text-center py-5 text-muted">No active bids.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "wallet" && (
                            <div className="animate__animated animate__fadeIn">
                                <span className="section-title">Wallet & Payments</span>
                                <div className="row">
                                    <div className="col-md-8 mx-auto text-center py-4">
                                        <div className="p-4 bg-light rounded-4 border mb-4">
                                            <h2 className="display-4 fw-bold text-primary mb-1">₹{walletAmount?.toLocaleString() || 0}</h2>
                                            <p className="text-muted">Total Available Balance</p>
                                        </div>
                                        
                                        <div className="text-start">
                                            <label className="fw-bold mb-3">Add Money to Wallet</label>
                                            <div className="quick-amounts">
                                                {['500', '1000', '2000'].map(amt => (
                                                    <button key={amt} className="amt-btn" onClick={() => setWalletRequest({walletAmount: amt})}>+₹{amt}</button>
                                                ))}
                                            </div>
                                            <div className="position-relative mb-4">
                                                <span className="position-absolute translate-middle-y top-50 start-0 ps-3 fw-bold text-muted">₹</span>
                                                <input type="text" name="walletAmount" className="profile-input ps-5" value={walletRequest?.walletAmount} onChange={handleWalletInput} placeholder="Enter Amount" />
                                            </div>
                                            <button className="btn btn-primary w-100 py-3 fw-bold shadow-lg" onClick={addMoneyInWallet} disabled={loading}>
                                                {loading ? "PROCESSSSING..." : "ADD MONEY IN WALLET"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "transactions" && (
                            <div className="animate__animated animate__fadeIn">
                                <span className="section-title">Transaction History</span>
                                <div className="table-responsive">
                                    <table className="dash-table">
                                        <thead>
                                            <tr>
                                                <th>Date & Time</th>
                                                <th>Type</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myTransactions.length > 0 ? myTransactions.map(tx => (
                                                <tr key={tx.id}>
                                                    <td className="text-muted small">
                                                        {new Date(parseInt(tx.dateTime)).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge bg-${tx.type.toLowerCase()}`}>
                                                            {tx.type}
                                                        </span>
                                                    </td>
                                                    <td className={`fw-bold ${tx.type === 'Payment' ? 'text-danger' : 'text-success'}`}>
                                                        {tx.type === 'Payment' ? '-' : '+'}₹{tx.amount?.toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <span className="text-success small fw-bold">
                                                            <i className="fas fa-check-circle me-1"></i> {tx.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-muted small">{tx.remarks}</td>
                                                </tr>
                                            )) : <tr><td colSpan="5" className="text-center py-5 text-muted">No transactions found.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserProfile;
