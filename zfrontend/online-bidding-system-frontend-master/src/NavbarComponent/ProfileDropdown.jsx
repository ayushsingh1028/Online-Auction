import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const ProfileDropdown = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("User");
    const [role, setRole] = useState("");

    // Identify user and role
    useEffect(() => {
        const customer = JSON.parse(sessionStorage.getItem("active-customer"));
        const admin = JSON.parse(sessionStorage.getItem("active-admin"));
        const seller = JSON.parse(sessionStorage.getItem("active-seller"));
        const delivery = JSON.parse(sessionStorage.getItem("active-delivery"));

        if (customer) {
            setUserName(`${customer.firstName}`);
            setRole("customer");
        } else if (admin) {
            setUserName(`Admin`);
            setRole("admin");
        } else if (seller) {
            setUserName(`${seller.firstName}`);
            setRole("seller");
        } else if (delivery) {
            setUserName(`${delivery.firstName}`);
            setRole("delivery");
        }
    }, []);

    const handleLogout = () => {
        toast.success("Logged out successfully!", {
            position: "top-center",
            autoClose: 1000,
        });

        // Clear all possible session keys
        const keys = [
            "active-customer", "customer-jwtToken",
            "active-admin", "admin-jwtToken",
            "active-seller", "seller-jwtToken",
            "active-delivery", "delivery-jwtToken"
        ];
        keys.forEach(key => sessionStorage.removeItem(key));

        setTimeout(() => {
            navigate("/home");
            window.location.reload();
        }, 1200);
    };

    return (
        <li className="nav-item dropdown ms-2">
            <style jsx>{`
                .profile-trigger {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-radius: 8px;
                    text-decoration: none;
                    color: #282c3f;
                }

                .profile-trigger:hover {
                    background-color: #f5f7fa;
                }

                .user-icon {
                    width: 32px;
                    height: 32px;
                    border: 1.5px solid #282c3f;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    color: #282c3f;
                }

                .user-name {
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                .dropdown-menu-profile {
                    width: 100%;
                    min-width: 280px;
                    border-radius: 12px;
                    border: none;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    padding: 0;
                    margin-top: 10px !important;
                    overflow: hidden;
                    animation: profileFadeIn 0.2s ease-out;
                }

                @keyframes profileFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .menu-header {
                    padding: 12px 20px;
                    background: #fdfdfd;
                    border-bottom: 1px solid #f0f0f0;
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: #282c3f;
                }

                .profile-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: #4a4a4a;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: background 0.2s;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                }

                .profile-item:hover {
                    background: #f9f9f9;
                    color: #2874f0;
                }

                .profile-item i {
                    width: 20px;
                    text-align: center;
                    font-size: 1rem;
                    color: #666;
                }

                .profile-item:hover i {
                    color: #2874f0;
                }

                .item-divider {
                    height: 1px;
                    background: #f0f0f0;
                    margin: 4px 0;
                }
                
                .logout-item {
                    color: #d32f2f;
                }
                
                .logout-item:hover {
                    background: #fff5f5;
                    color: #d32f2f;
                }
                
                .logout-item i {
                    color: #d32f2f;
                }
            `}</style>

            <a 
                className="profile-trigger dropdown-toggle" 
                href="#" 
                id="profileDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
            >
                <div className="user-icon">
                    <i className="fas fa-user"></i>
                </div>
                <span className="user-name">{userName}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-profile shadow" aria-labelledby="profileDropdown">
                <div className="menu-header">Your Account</div>
                
                <li>
                    <Link to={role === "customer" ? "/customer/profile" : "#"} state={{ activeTab: "profile" }} className="profile-item">
                        <i className="fas fa-user-circle"></i>
                        My Profile
                    </Link>
                </li>

                <li>
                    <Link to="/customer/profile" state={{ activeTab: "orders" }} className="profile-item">
                        <i className="fas fa-box"></i>
                        My Orders
                    </Link>
                </li>

                {role === "customer" && (
                    <li>
                        <Link to="/customer/profile" state={{ activeTab: "bids" }} className="profile-item">
                            <i className="fas fa-gavel"></i>
                            My Bids
                        </Link>
                    </li>
                )}

                <li>
                    <Link to="/customer/profile" state={{ activeTab: "wallet" }} className="profile-item">
                        <i className="fas fa-wallet"></i>
                        My Wallet
                    </Link>
                </li>

                <div className="item-divider"></div>

                <li>
                    <button onClick={handleLogout} className="profile-item logout-item">
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </li>
            </ul>
        </li>
    );
};

export default ProfileDropdown;
