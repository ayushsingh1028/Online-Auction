const ContactUs = () => {
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .contact-wrapper {
          min-height: 100vh;
          background: #ffffff;
          padding: 60px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .contact-title {
          font-size: 56px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
          letter-spacing: -1px;
        }
        
        .contact-subtitle {
          font-size: 18px;
          color: #7f8c8d;
          font-weight: 400;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 60px;
        }
        
        .contact-info {
          background: #fafafa;
          border-radius: 16px;
          padding: 50px;
          border: 1px solid #f0f0f0;
        }
        
        .info-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 30px;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        
        .info-icon {
          width: 50px;
          height: 50px;
          background: #2c3e50;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          flex-shrink: 0;
        }
        
        .info-details h3 {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
        }
        
        .info-details p {
          font-size: 16px;
          color: #7f8c8d;
          line-height: 1.6;
        }
        
        .contact-form {
          background: #fafafa;
          border-radius: 16px;
          padding: 50px;
          border: 1px solid #f0f0f0;
        }
        
        .form-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 30px;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .form-control {
          width: 100%;
          padding: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
          color: #2c3e50;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #2c3e50;
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 150px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .btn-submit {
          width: 100%;
          padding: 16px;
          background: #2c3e50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-submit:hover {
          background: #34495e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(44, 62, 80, 0.3);
        }
        
        .btn-submit:active {
          transform: translateY(0);
        }
        
        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 40px;
          justify-content: center;
        }
        
        .social-icon {
          width: 50px;
          height: 50px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2c3e50;
          font-size: 22px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          background: #2c3e50;
          color: white;
          border-color: #2c3e50;
          transform: translateY(-3px);
        }
        
        @media (max-width: 968px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
          
          .contact-title {
            font-size: 40px;
          }
          
          .contact-info,
          .contact-form {
            padding: 30px;
          }
        }
      `}</style>
      
      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">
              We value your feedback, questions, and inquiries. Whether you need
              assistance with an order, have a suggestion, or simply want to connect,
              our team is here to help. Feel free to reach out through the provided
              contact form, email, or phone number, and we'll respond promptly to
              ensure your experience with us is nothing short of exceptional. Your
              satisfaction is our priority, and we look forward to hearing from you.
            </p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="info-title">Contact Information</h2>
              
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-details">
                  <h3>Email Us</h3>
                  <p>support@bidout.com<br/>info@bidout.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-details">
                  <h3>Call Us</h3>
                  <p>+91 123 456 7890<br/>Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <h3>Visit Us</h3>
                  <p>123 Commerce Street<br/>Vadodara, Gujarat, India</p>
                </div>
              </div>
              
              <div className="social-links">
                <div className="social-icon">📘</div>
                <div className="social-icon">🐦</div>
                <div className="social-icon">📷</div>
                <div className="social-icon">💼</div>
              </div>
            </div>
            
            <div className="contact-form">
              <h2 className="form-title">Send Us a Message</h2>
              
              <form>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;