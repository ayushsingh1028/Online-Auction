import { useNavigate } from "react-router-dom";
import carousel1 from "../images/carousel_1.png";
import carousel2 from "../images/carousel_2.png";
import carousel3 from "../images/carousel_3.png";

const Carousel = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/products"); 
  };

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2800"
    >
      <style>{`
        .carousel-item img {
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .carousel-item img:hover {
          transform: scale(1.02);
        }
        
        .carousel-indicators {
          z-index: 10;
        }
        
        .carousel-indicators button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        
        .carousel-indicators button.active {
          background-color: #2c3e50;
          transform: scale(1.2);
        }
        
        .carousel-control-prev,
        .carousel-control-next {
          width: 5%;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          opacity: 1;
        }
        
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(44, 62, 80, 0.5);
          border-radius: 50%;
          padding: 20px;
        }
      `}</style>

      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active" onClick={handleBannerClick}>
          <img src={carousel1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item" onClick={handleBannerClick}>
          <img src={carousel2} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item" onClick={handleBannerClick}>
          <img src={carousel3} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;