import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);

  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:9090/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);

  const [endDate, setEndDate] = useState("");
  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    sellerId: "",
    endDate: "",
  });

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    product.endDate = new Date(endDate).getTime();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("categoryId", product.categoryId);
    formData.append("sellerId", seller.id);
    formData.append("endDate", product.endDate);

    axios
      .post("http://localhost:9090/api/product/add", formData, {
        headers: {
          Authorization: "Bearer " + seller_jwtToken,
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
        }, 2000);
      });
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        .heading-font {
          font-family: 'Playfair Display', serif;
        }
        
        .premium-form-card {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border-radius: 1.5rem;
        }
        
        .premium-form-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 1.25rem;
          padding: 1.25rem;
          margin: 1rem 1rem 0 1rem;
        }
        
        .form-label-premium {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        
        .form-control-premium {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
          background: white;
        }
        
        .form-control-premium:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.1);
          outline: none;
          background: white;
        }
        
        .form-control-premium:hover {
          border-color: #cbd5e0;
        }
        
        textarea.form-control-premium {
          resize: vertical;
          min-height: 100px;
        }
        
        .file-input-premium {
          border: 2px dashed #cbd5e0;
          border-radius: 0.75rem;
          padding: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
          cursor: pointer;
        }
        
        .file-input-premium:hover {
          border-color: #2c3e50;
          background: white;
        }
        
        .file-input-premium:focus {
          border-color: #2c3e50;
          border-style: solid;
          box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.1);
          outline: none;
        }
        
        .btn-premium-submit {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border: none;
          padding: 1rem 3rem;
          border-radius: 0.75rem;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .btn-premium-submit:hover {
          background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(44, 62, 80, 0.3);
        }
        
        .btn-premium-submit:active {
          transform: translateY(-1px);
        }
        
        .form-section {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .input-icon {
          position: relative;
        }
        
        .input-icon input,
        .input-icon select,
        .input-icon textarea {
          padding-left: 1rem;
        }
        
        select.form-control-premium {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232c3e50' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
        
        .image-upload-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 1.5rem;
          border-radius: 1rem;
          border: 2px dashed #cbd5e0;
        }
        
        .image-upload-label {
          display: block;
          margin-bottom: 0.75rem;
          color: #2c3e50;
          font-weight: 600;
        }
      `}</style>

      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card premium-form-card custom-bg shadow-lg" style={{ width: "50rem" }}>
          <div className="container-fluid">
            <div className="premium-form-header text-center">
              <h2 className="heading-font text-white m-0">Add New Product</h2>
              <p className="text-white-50 m-0 mt-2" style={{ fontSize: '0.95rem' }}>
                Fill in the details to list your product
              </p>
            </div>
            
            <div className="card-body text-color p-4">
              <form className="row g-4">
                {/* Basic Information Section */}
                <div className="col-12">
                  <div className="form-section">
                    <h5 className="heading-font text-color mb-3">Basic Information</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="title" className="form-label form-label-premium">
                          Product Title
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-premium"
                          id="title"
                          name="name"
                          onChange={handleInput}
                          value={product.name}
                          placeholder="Enter product name"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="categoryId" className="form-label form-label-premium">
                          Category
                        </label>
                        <select
                          name="categoryId"
                          onChange={handleInput}
                          className="form-control form-control-premium"
                          id="categoryId"
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="col-12">
                        <label htmlFor="description" className="form-label form-label-premium">
                          Product Description
                        </label>
                        <textarea
                          className="form-control form-control-premium"
                          id="description"
                          name="description"
                          rows="4"
                          onChange={handleInput}
                          value={product.description}
                          placeholder="Describe your product in detail..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Stock Section */}
                <div className="col-12">
                  <div className="form-section">
                    <h5 className="heading-font text-color mb-3">Pricing & Stock</h5>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="price" className="form-label form-label-premium">
                          Product Price (₹)
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-premium"
                          id="price"
                          name="price"
                          onChange={handleInput}
                          value={product.price}
                          placeholder="0.00"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="quantity" className="form-label form-label-premium">
                          Quantity
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-premium"
                          id="quantity"
                          name="quantity"
                          onChange={handleInput}
                          value={product.quantity}
                          placeholder="0"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="endDate" className="form-label form-label-premium">
                          Expiry Time
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control form-control-premium"
                          id="endDate"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="col-12">
                  <div className="image-upload-section">
                    <h5 className="heading-font text-color mb-3">Product Images</h5>
                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                      Upload up to 3 images of your product
                    </p>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="image1" className="image-upload-label">
                          📷 Primary Image
                        </label>
                        <input
                          className="form-control file-input-premium"
                          type="file"
                          id="image1"
                          name="image1"
                          onChange={(e) => setSelectImage1(e.target.files[0])}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="image2" className="image-upload-label">
                          📷 Second Image
                        </label>
                        <input
                          className="form-control file-input-premium"
                          type="file"
                          id="image2"
                          name="image2"
                          onChange={(e) => setSelectImage2(e.target.files[0])}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="image3" className="image-upload-label">
                          📷 Third Image
                        </label>
                        <input
                          className="form-control file-input-premium"
                          type="file"
                          id="image3"
                          name="image3"
                          onChange={(e) => setSelectImage3(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 d-flex aligns-items-center justify-content-center mt-4 mb-2">
                  <button
                    type="submit"
                    className="btn btn-premium-submit"
                    onClick={saveProduct}
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductForm;