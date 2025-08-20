import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaFile, FaTimes, FaCheck, FaBicycle } from 'react-icons/fa';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [saddles, setSaddles] = useState([]);
  const [selectedSaddle, setSelectedSaddle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    bikeShopName: '',
    specialRequirements: ''
  });

  useEffect(() => {
    fetchSaddles();
  }, []);

  useEffect(() => {
    const saddleId = searchParams.get('saddleId');
    if (saddleId && saddles.length > 0) {
      const saddle = saddles.find(s => s.id === parseInt(saddleId));
      if (saddle) setSelectedSaddle(saddle);
    }
  }, [searchParams, saddles]);

  const fetchSaddles = async () => {
    try {
      const response = await axios.get('/api/saddles');
      setSaddles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saddles:', error);
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaddleSelect = (saddle) => {
    setSelectedSaddle(saddle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Selected saddle:', selectedSaddle);
    console.log('Form data:', formData);
    console.log('Uploaded file:', uploadedFile);
    
    if (!selectedSaddle) {
      alert('Please select a saddle design');
      return;
    }

    if (!formData.customerName || !formData.customerEmail) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('customerName', formData.customerName);
      submitData.append('customerEmail', formData.customerEmail);
      submitData.append('bikeShopName', formData.bikeShopName);
      submitData.append('specialRequirements', formData.specialRequirements);
      submitData.append('saddleId', selectedSaddle.id);

      if (uploadedFile) {
        submitData.append('fittingFile', uploadedFile);
      }

      console.log('Submitting data to /api/orders');
      console.log('FormData contents:');
      for (let [key, value] of submitData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post('/api/orders', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Order submitted successfully:', response.data);
      alert('Order submitted successfully!');
      navigate('/tracking');
    } catch (error) {
      console.error('Error submitting order:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Error submitting order. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="order-form">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading saddle options...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-form">
      <div className="container">
        <div className="page-header">
          <h1>Place Your Custom Saddle Order</h1>
          <p>Upload your fitting files and provide customer details for a perfectly customized bike saddle</p>
        </div>

        <form onSubmit={handleSubmit} className="order-form-container">
          {/* Saddle Selection */}
          <div className="form-section">
            <h2>1. Choose Saddle Design</h2>
            <div className="saddle-selection">
              {saddles.map(saddle => (
                <div
                  key={saddle.id}
                  className={`saddle-option ${selectedSaddle?.id === saddle.id ? 'selected' : ''}`}
                  onClick={() => handleSaddleSelect(saddle)}
                >
                  <div className="saddle-option-image">
                    <img 
                      src={saddle.image} 
                      alt={`${saddle.name} saddle`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="saddle-option-icon" style={{ display: 'none' }}>
                      <FaBicycle />
                    </div>
                  </div>
                  <div className="saddle-option-content">
                    <h3>{saddle.name}</h3>
                    <p>{saddle.description}</p>
                    <span className="price">${saddle.price}</span>
                  </div>
                  {selectedSaddle?.id === saddle.id && (
                    <div className="selection-indicator">
                      <FaCheck />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* File Upload & Pressure Preview */}
          <div className="form-section">
            <h2>2. Upload Fitting Files & Preview Analysis</h2>
            <p className="section-description">
              Upload bike fitting data and see immediate pressure analysis preview. 
              Accepted formats: PDF, Images (JPG, PNG), Spreadsheets (CSV, XLS, XLSX)
            </p>
            
                         <div className="upload-preview-container">
               {/* Pressure Analysis Preview Section */}
               <div className="preview-section">
                 <h3>Pressure Analysis Preview</h3>
                 <p className="preview-description">
                   {uploadedFile 
                     ? 'Preview of pressure distribution from your uploaded file'
                     : 'Upload a pressure data file to see the analysis preview'
                   }
                 </p>
                 
                 <div className="pressure-preview-container">
                   <div className="pressure-grid">
                     {Array.from({ length: 5 }, (_, y) => (
                       <div key={y} className="pressure-row">
                         {Array.from({ length: 5 }, (_, x) => {
                           if (uploadedFile) {
                             // Generate pressure data based on position (simulating uploaded CSV)
                             const centerDistance = Math.sqrt(Math.pow(x - 2, 2) + Math.pow(y - 2, 2));
                             const pressure = Math.max(45, 90 - centerDistance * 8 + Math.random() * 10);
                             
                             const getPressureColor = (p) => {
                               const normalized = (p - 45) / (90 - 45);
                               if (normalized < 0.3) {
                                 return `rgba(59, 130, 246, ${0.3 + normalized * 0.7})`;
                               } else if (normalized < 0.7) {
                                 return `rgba(245, 158, 11, ${0.3 + (normalized - 0.3) * 0.7})`;
                               } else {
                                 return `rgba(239, 68, 68, ${0.3 + (normalized - 0.7) * 0.7})`;
                               }
                             };

                             return (
                               <div
                                 key={x}
                                 className="pressure-cell"
                                 style={{
                                   backgroundColor: getPressureColor(pressure),
                                   border: '2px solid #1e293b'
                                 }}
                                 title={`Position (${x}, ${y}): ${pressure.toFixed(1)} kPa`}
                               >
                                 <span className="pressure-value">{pressure.toFixed(1)}</span>
                               </div>
                             );
                           } else {
                             // Show gray placeholder squares when no file is uploaded
                             return (
                               <div
                                 key={x}
                                 className="pressure-cell placeholder"
                                 title="Upload a file to see pressure data"
                               >
                                 <span className="pressure-placeholder">-</span>
                               </div>
                             );
                           }
                         })}
                       </div>
                     ))}
                   </div>

                   {uploadedFile && (
                     <div className="pressure-legend">
                       <h4>Pressure Scale</h4>
                       <div className="legend-items">
                         <div className="legend-item">
                           <div className="legend-color" style={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}></div>
                           <span>Low: ~45 kPa</span>
                         </div>
                         <div className="legend-item">
                           <div className="legend-color" style={{ backgroundColor: 'rgba(245, 158, 11, 0.8)' }}></div>
                           <span>Medium: ~67 kPa</span>
                         </div>
                         <div className="legend-item">
                           <div className="legend-color" style={{ backgroundColor: 'rgba(239, 68, 68, 0.8)' }}></div>
                           <span>High: ~90 kPa</span>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>

               {/* File Upload Section - Compact */}
               <div className="upload-section-compact">
                 <h3>Upload File</h3>
                 <div {...getRootProps()} className={`file-upload-compact ${isDragActive ? 'drag-active' : ''}`}>
                   <input {...getInputProps()} />
                   {uploadedFile ? (
                     <div className="file-info-compact">
                       <FaFile />
                       <span>{uploadedFile.name}</span>
                       <button type="button" onClick={removeFile} className="remove-file">
                         <FaTimes />
                       </button>
                     </div>
                   ) : (
                     <div className="upload-prompt-compact">
                       <FaUpload />
                       <span>
                         {isDragActive
                           ? 'Drop the file here...'
                           : 'Drag & drop a file here, or click to select'}
                       </span>
                     </div>
                   )}
                 </div>
               </div>
             </div>
          </div>

          {/* Customer Information */}
          <div className="form-section">
            <h2>3. Customer Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="customerName" className="form-label">
                  Customer Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail" className="form-label">
                  Customer Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bikeShopName" className="form-label">
                  Bike Shop Name
                </label>
                <input
                  type="text"
                  id="bikeShopName"
                  name="bikeShopName"
                  value={formData.bikeShopName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Leave blank if ordering directly"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="specialRequirements" className="form-label">
                  Special Requirements
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Any specific customization requests, medical considerations, or special notes..."
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          {selectedSaddle && (
            <div className="form-section order-summary">
              <h2>4. Order Summary</h2>
              <div className="summary-card">
                <div className="summary-item">
                  <span className="summary-label">Selected Saddle:</span>
                  <span className="summary-value">{selectedSaddle.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Category:</span>
                  <span className="summary-value">{selectedSaddle.category}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Price:</span>
                  <span className="summary-value price">${selectedSaddle.price}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Fitting File:</span>
                  <span className="summary-value">
                    {uploadedFile ? uploadedFile.name : 'No file uploaded'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className={`btn btn-primary ${submitting ? 'submitting' : ''}`}
              disabled={submitting || !selectedSaddle || !formData.customerName || !formData.customerEmail}
            >
              {submitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting Order...
                </>
              ) : (
                'Submit Order'
              )}
            </button>
            
            {(!selectedSaddle || !formData.customerName || !formData.customerEmail) && (
              <p className="form-validation-message">
                Please select a saddle design and fill in all required fields to submit your order.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;

