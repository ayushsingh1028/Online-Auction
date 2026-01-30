import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Newsletter Section */}
      <div style={{ backgroundColor: '#e8e8e8' }} class="py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-3 col-md-12 mb-3 mb-lg-0">
              <h5 class="text-uppercase mb-0" style={{ fontSize: '1rem', fontWeight: '600' }}>SIGN UP FOR OUR</h5>
              <h2 class="text-uppercase mb-0" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#c0c0c0', letterSpacing: '3px' }}>NEWSLETTER</h2>
            </div>
            <div class="col-lg-9 col-md-12">
              <div class="row g-3">
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name"
                    style={{ padding: '12px 20px', borderRadius: '8px', border: 'none' }}
                  />
                </div>
                <div class="col-md-4">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Email ID"
                    style={{ padding: '12px 20px', borderRadius: '8px', border: 'none' }}
                  />
                </div>
                <div class="col-md-4">
                  <button class="btn w-100 bg-color custom-bg-text" style={{ padding: '12px 20px', borderRadius: '8px', fontWeight: '600' }}>
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div class="container my-5">
        <footer class="text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section>
              <div class="row">
                {/* Brand Section */}
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h2 class="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '600' }}>
                    BidOut
                  </h2>
                  <h6 class="text-uppercase mb-3" style={{ fontSize: '0.75rem', fontWeight: '600' }}>DOWNLOAD THE APP</h6>
                  <div class="mb-2">
                    <a href="#!">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Get it on Google Play"
                        style={{ height: '40px' }}
                      />
                    </a>
                  </div>
                  <div>
                    <a href="#!">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                        alt="Download on the App Store"
                        style={{ height: '40px' }}
                      />
                    </a>
                  </div>
                </div>

                {/* Know More */}
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase mb-3 text-color" style={{ fontWeight: '600' }}>KNOW MORE</h6>
                  <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                      <Link to="/products" class="text-secondary">Buy</Link>
                    </li>
                    <li class="mb-2">
                      <Link to="/user/login" class="text-secondary">Sell</Link>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Request an Estimate</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">FAQs</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Seller Terms</a>
                    </li>
                  </ul>
                </div>

                {/* Services */}
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase mb-3 text-color" style={{ fontWeight: '600' }}>SERVICES</h6>
                  <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Client Advisory</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Restoration</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Collection Services</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Auction Services</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Post Sale Services</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Private Sales</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Storage</a>
                    </li>
                  </ul>
                </div>

                {/* About */}
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase mb-3 text-color" style={{ fontWeight: '600' }}>ABOUT</h6>
                  <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Who we are</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Press</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Careers</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-secondary">Record Price Artwork</a>
                    </li>
                  </ul>
                </div>

                {/* Follow Us */}
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase mb-3 text-color" style={{ fontWeight: '600' }}>FOLLOW US ON</h6>
                  <div class="d-flex gap-3 mb-4">
                    <a href="#!" class="text-color fs-4">
                      <i class="fab fa-facebook">ⓕ</i>
                    </a>
                    <a href="#!" class="text-color fs-4">
                      <i class="fab fa-instagram">🅾</i>
                    </a>
                    <a href="#!" class="text-color fs-4">
                      <i class="fab fa-youtube">▶️</i>
                    </a>
                  
                  </div>
                  <div class="mt-4">
                    <h6 class="text-uppercase mb-3 text-color" style={{ fontWeight: '600' }}>CONTACT US</h6>
                    <p class="text-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                      <i class="fas fa-envelope me-2"></i>
                      support@bidout.com
                    </p>
                    <p class="text-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                      <i class="fas fa-phone me-2"></i>
                      +91 1800-123-4567
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr class="my-4" />
          </div>

          {/* Bottom Bar */}
          <div class="container-fluid px-4 pb-4">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div class="d-flex gap-4 mb-3 mb-md-0">
                <a href="#!" class="text-color text-decoration-none">Terms & Conditions</a>
                <a href="#!" class="text-color text-decoration-none">Privacy Policy</a>
                <a href="#!" class="text-color text-decoration-none">Cookie Policy</a>
              </div>
              <div class="text-color">
                Copyright 2025 BidOut. All Rights Reserved
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;