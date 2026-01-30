import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductOffers = () => {
  const [offers, setoffers] = useState([]);

  const admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const { productId } = useParams();

  const retrieveAllOffers = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/product/offer/fetch/product?productId=" +
        productId
    );
    return response.data;
  };

  useEffect(() => {
    const getAllOffers = async () => {
      const alloffers = await retrieveAllOffers();
      if (alloffers) {
        setoffers(alloffers.offers);
      }
    };

    getAllOffers();
  }, []);

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-offers-container {
          border: none;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
        }
        
        .premium-offers-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 1.5rem;
          text-align: center;
        }
        
        .offers-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #2c3e50 #f3f4f6;
        }
        
        .offers-scroll-container::-webkit-scrollbar {
          width: 8px;
        }
        
        .offers-scroll-container::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .offers-scroll-container::-webkit-scrollbar-thumb {
          background: #2c3e50;
          border-radius: 4px;
        }
        
        .offer-item-premium {
          background: white;
          border: none;
          border-bottom: 1px solid #e5e7eb;
          padding: 1.25rem 1.5rem;
          transition: all 0.3s ease;
        }
        
        .offer-item-premium:hover {
          background: #f8f9fa;
          transform: translateX(8px);
          border-left: 4px solid #2c3e50;
          padding-left: calc(1.5rem - 4px);
        }
        
        .offer-item-premium:last-child {
          border-bottom: none;
        }
        
        .offer-user-name {
          color: #2c3e50;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .offer-amount {
          color: #28a745;
          font-weight: 700;
          font-size: 1.5rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .won-badge {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          padding: 0.375rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .anonymous-user {
          color: #6c757d;
          font-style: italic;
          font-weight: 500;
        }
        
        .empty-offers-state {
          padding: 3rem 2rem;
          text-align: center;
          color: #6c757d;
        }
        
        .empty-offers-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .currency-symbol {
          font-size: 1.2rem;
          opacity: 0.8;
        }
        
        .trophy-icon {
          font-size: 1rem;
        }
      `}</style>

      <div className="premium-offers-container form-card border-color" style={{ height: "31rem" }}>
        <div className="premium-offers-header">
          <h4 className="heading-font text-white m-0">Product Bids</h4>
          <p className="text-white-50 m-0 mt-1" style={{ fontSize: '0.9rem' }}>
            {offers.length} {offers.length === 1 ? 'bid' : 'bids'} received
          </p>
        </div>
        
        <div className="offers-scroll-container" style={{ overflowY: "auto", height: "calc(31rem - 90px)" }}>
          {offers.length === 0 ? (
            <div className="empty-offers-state">
              <div className="empty-offers-icon">💰</div>
              <h5 className="heading-font">No Bids Yet</h5>
              <p>Be the first to place a bid on this product!</p>
            </div>
          ) : (
            offers.map((offer, index) => {
              return (
                <div key={index} className="offer-item-premium">
                  <div className="offer-user-name">
                    {(() => {
                      if (offer.product.status === "Sold") {
                        if (offer.status === "Won") {
                          return (
                            <>
                              <span>
                                {admin
                                  ? offer.user.firstName + " " + offer.user.lastName
                                  : "Anonymous User"}
                              </span>
                              <span className="won-badge">
                                <span className="trophy-icon">🏆</span> WON
                              </span>
                            </>
                          );
                        }
                      }
                      return <span className="anonymous-user">Anonymous User</span>;
                    })()}
                  </div>
                  <p className="offer-amount">
                    <span className="currency-symbol">₹</span>
                    {offer.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductOffers;