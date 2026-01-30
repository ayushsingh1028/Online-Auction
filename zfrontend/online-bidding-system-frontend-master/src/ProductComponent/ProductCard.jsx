import { Link } from "react-router-dom";
import CategoryNavigator from "../CategoryComponent/CategoryNavigator";

const ProductCard = (product) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  return (
    <div className="col">
      <style>{`
        .premium-product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .premium-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: #e0e0e0;
        }
        
        .product-image-wrapper {
          position: relative;
          overflow: hidden;
          background: #fafafa;
          padding: 20px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .product-image-wrapper img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }
        
        .premium-product-card:hover .product-image-wrapper img {
          transform: scale(1.05);
        }
        
        .category-badge {
          display: inline-block;
          padding: 6px 14px;
          background: #2c3e50;
          color: white;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        
        .product-body {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-title {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 12px;
          line-height: 1.3;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .product-description {
          font-size: 14px;
          color: #7f8c8d;
          line-height: 1.6;
          margin-bottom: 16px;
          flex-grow: 1;
        }
        
        .product-footer {
          padding: 20px 24px;
          background: #fafafa;
          border-top: 1px solid #f0f0f0;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        
        .price-section {
          display: flex;
          flex-direction: column;
        }
        
        .price-label {
          font-size: 12px;
          color: #7f8c8d;
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .price-amount {
          font-size: 26px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
        }
        
        .bid-button {
          padding: 12px 28px;
          background: #2c3e50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
          display: inline-block;
        }
        
        .bid-button:hover {
          background: #34495e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(44, 62, 80, 0.3);
          color: white;
        }
        
        .bid-button:active {
          transform: translateY(0);
        }
        
        @media (max-width: 768px) {
          .product-title {
            font-size: 18px;
          }
          
          .price-amount {
            font-size: 22px;
          }
          
          .footer-content {
            flex-direction: column-reverse;
            gap: 12px;
          }
          
          .bid-button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
      
      <div className="premium-product-card">
        <div className="product-image-wrapper">
          <img
            src={"http://localhost:9090/api/product/" + product.item.image1}
            alt={product.item.name}
          />
        </div>

        <div className="product-body">
          <div className="category-badge">
            <CategoryNavigator
              item={{
                id: product.item.category.id,
                name: product.item.category.name,
              }}
            />
          </div>
          
          <h5 className="product-title">
            {product.item.name}
          </h5>
          
          <p className="product-description">
            {descriptionToShow(product.item.description, 50)}
          </p>
        </div>
        
        <div className="product-footer">
          <div className="footer-content">
            <div className="price-section">
              <span className="price-label">Starting Price</span>
              <h4 className="price-amount">₹{product.item.price}</h4>
            </div>
            
            <Link
              to={`/product/${product.item.id}/category/${product.item.category.id}`}
              className="bid-button"
            >
              Start Bid
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;