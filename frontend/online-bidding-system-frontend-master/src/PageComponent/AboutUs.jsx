const AboutUs = () => {
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .about-wrapper {
          min-height: 100vh;
          background: #ffffff;
          padding: 60px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .about-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .about-title {
          font-size: 56px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
          letter-spacing: -1px;
        }
        
        .about-subtitle {
          font-size: 20px;
          color: #7f8c8d;
          font-weight: 400;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .content-section {
          background: #fafafa;
          border-radius: 16px;
          padding: 50px;
          margin-bottom: 30px;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        
        .content-section:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        
        .section-heading {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .section-icon {
          width: 40px;
          height: 40px;
          background: #2c3e50;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
        }
        
        .section-text {
          font-size: 17px;
          line-height: 1.8;
          color: #555;
          font-weight: 400;
        }
        
        .highlight-box {
          background: white;
          border-left: 4px solid #2c3e50;
          padding: 30px;
          border-radius: 12px;
          margin: 40px 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .highlight-text {
          font-size: 18px;
          color: #2c3e50;
          font-weight: 500;
          line-height: 1.7;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin: 60px 0;
        }
        
        .stat-card {
          background: white;
          padding: 40px 30px;
          border-radius: 16px;
          text-align: center;
          border: 2px solid #f0f0f0;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          border-color: #2c3e50;
          transform: translateY(-4px);
        }
        
        .stat-number {
          font-size: 42px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .stat-label {
          font-size: 16px;
          color: #7f8c8d;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .about-title {
            font-size: 40px;
          }
          
          .content-section {
            padding: 30px 25px;
          }
          
          .section-heading {
            font-size: 24px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="about-wrapper">
        <div className="about-container">
          <div className="about-header">
            <h1 className="about-title">About BidOut</h1>
            <p className="about-subtitle">
              Revolutionizing online bidding with seamless experiences and unmatched convenience
            </p>
          </div>
          
          <div className="content-section">
            <h2 className="section-heading">
              <span className="section-icon">🎯</span>
              Our Vision
            </h2>
            <p className="section-text">
              BidOut is an innovative online bidding platform where users can participate in auctions for a wide range of products from anywhere, anytime. Our goal is to provide a secure, transparent, and exciting bidding experience for buyers and sellers alike, leveraging real-time technology to make auctions more accessible and fair.
            </p>
          </div>
          
          <div className="highlight-box">
            <p className="highlight-text">
              "BidOut empowers users to win their desired items at the best price while providing sellers a platform to reach a global audience efficiently and securely."
            </p>
          </div>
          
          <div className="content-section">
            <h2 className="section-heading">
              <span className="section-icon">💡</span>
              Evolution of Online Bidding
            </h2>
            <p className="section-text">
              Traditional auctions required physical presence, limited participation, and were often time-consuming. Online bidding platforms have revolutionized this by allowing users to join auctions remotely, track items in real-time, and place bids conveniently from their devices. This evolution has made auctions more inclusive, competitive, and efficient.
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Bidding Access</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Secure Payments</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Global Reach</div>
            </div>
          </div>
          
          <div className="content-section">
            <h2 className="section-heading">
              <span className="section-icon">🚀</span>
              The Future of Bidding
            </h2>
            <p className="section-text">
              The future of online bidding is digital, transparent, and interactive. Platforms like BidOut are leveraging advanced technologies to provide real-time notifications, analytics, and secure transactions, making online auctions safer and more engaging. By connecting buyers and sellers globally, BidOut is shaping the future of auction experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
