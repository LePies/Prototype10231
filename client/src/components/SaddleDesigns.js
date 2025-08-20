import React, { useState, useEffect } from 'react';
import { FaBicycle, FaRoad, FaMountain, FaUsers, FaTree } from 'react-icons/fa';
import axios from 'axios';
import './SaddleDesigns.css';

const SaddleDesigns = () => {
  const [saddles, setSaddles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSaddles();
  }, []);

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

  const getBikeIcon = (category) => {
    switch (category) {
      case 'Racing':
        return <FaRoad />;
      case 'Mountain':
        return <FaMountain />;
      case 'Comfort':
        return <FaUsers />;
      case 'Gravel':
        return <FaTree />;
      default:
        return <FaBicycle />;
    }
  };



  if (loading) {
    return (
      <div className="saddle-designs">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading saddle designs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="saddle-designs">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Choose Your Saddle</h1>
          <p>Select from our range of premium saddle designs</p>
        </div>

                {/* Saddles Horizontal Layout */}
        <div className="saddles-horizontal">
          {saddles.map((saddle) => (
            <div 
              key={saddle.id} 
              className="saddle-card-compact"
            >
              <div className="saddle-image-compact">
                <img 
                  src={saddle.image} 
                  alt={`${saddle.name} saddle`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder-compact" style={{ display: 'none' }}>
                  <FaBicycle />
                </div>
              </div>
              
                             <div className="saddle-content-compact">
                 <h3 className="saddle-name">{saddle.name}</h3>
                 <div className="saddle-price">${saddle.price}</div>
                 
                 {/* Bike Silhouette Figure */}
                 <div className="bike-silhouette">
                   <div className="bike-icon">
                     {getBikeIcon(saddle.category)}
                   </div>
                   <div className="bike-shadow"></div>
                 </div>
               </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default SaddleDesigns;

