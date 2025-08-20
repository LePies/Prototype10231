import React, { useState, useEffect } from 'react';
import { FaBicycle, FaClock, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaEye, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import './OrderTracking.css';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({
    status: '',
    progress: '',
    notes: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
    setEditingOrder(null);
    setEditForm({ status: '', progress: '', notes: '' });
  };

  const startEditing = (order) => {
    setEditingOrder(order);
    setEditForm({
      status: order.status,
      progress: order.progress,
      notes: ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveOrderUpdate = async () => {
    if (!editingOrder) return;

    try {
      const response = await axios.put(`/api/orders/${editingOrder.id}/status`, editForm);
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === editingOrder.id ? response.data.order : order
      ));
      
      if (selectedOrder && selectedOrder.id === editingOrder.id) {
        setSelectedOrder(response.data.order);
      }
      
      setEditingOrder(null);
      setEditForm({ status: '', progress: '', notes: '' });
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please try again.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'In Progress':
        return <FaSpinner className="status-icon in-progress" />;
      case 'Processing':
        return <FaClock className="status-icon processing" />;
      case 'On Hold':
        return <FaExclamationTriangle className="status-icon on-hold" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'In Progress':
        return '#3b82f6';
      case 'Processing':
        return '#f59e0b';
      case 'On Hold':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="order-tracking">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-tracking">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Track Your Orders</h1>
          <p>Monitor the progress of all your custom saddle orders in real-time</p>
        </div>

        {/* Orders List */}
        <div className="orders-container">
          {orders.length === 0 ? (
            <div className="empty-state">
              <FaBicycle />
              <h3>No orders yet</h3>
              <p>Start by placing your first custom saddle order</p>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-number">{order.orderNumber}</div>
                    <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  <div className="order-content">
                    <div className="customer-info">
                      <h3>{order.customerName}</h3>
                      <p>{order.customerEmail}</p>
                      {order.bikeShopName && (
                        <span className="shop-name">{order.bikeShopName}</span>
                      )}
                    </div>

                    <div className="saddle-info">
                      <div className="saddle-image-small">
                        <img 
                          src={order.saddle.image} 
                          alt={`${order.saddle.name} saddle`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="saddle-icon-small" style={{ display: 'none' }}>
                          <FaBicycle />
                        </div>
                      </div>
                      <div className="saddle-details">
                        <h4>{order.saddle.name}</h4>
                        <p>{order.saddle.category} • ${order.saddle.price}</p>
                      </div>
                    </div>

                    <div className="order-dates">
                      <div className="date-item">
                        <span className="date-label">Order Date:</span>
                        <span className="date-value">{formatDate(order.orderDate)}</span>
                      </div>
                      <div className="date-item">
                        <span className="date-label">Est. Completion:</span>
                        <span className="date-value">{formatDate(order.estimatedCompletion)}</span>
                      </div>
                    </div>

                    <div className="progress-bar">
                      <div className="progress-label">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="progress-track">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${order.progress}%`, backgroundColor: getStatusColor(order.status) }}
                        ></div>
                      </div>
                    </div>

                    <div className="order-actions">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleOrderClick(order)}
                      >
                        <FaEye />
                        View Details
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => startEditing(order)}
                      >
                        <FaEdit />
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="modal-overlay" onClick={closeOrderDetails}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details - {selectedOrder.orderNumber}</h2>
                <button className="modal-close" onClick={closeOrderDetails}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                {/* Order Information */}
                <div className="detail-section">
                  <h3>Order Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value" style={{ color: getStatusColor(selectedOrder.status) }}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Progress:</span>
                      <span className="detail-value">{selectedOrder.progress}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Order Date:</span>
                      <span className="detail-value">{formatDate(selectedOrder.orderDate)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Est. Completion:</span>
                      <span className="detail-value">{formatDate(selectedOrder.estimatedCompletion)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="detail-section">
                  <h3>Customer Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{selectedOrder.customerName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{selectedOrder.customerEmail}</span>
                    </div>
                    {selectedOrder.bikeShopName && (
                      <div className="detail-item">
                        <span className="detail-label">Bike Shop:</span>
                        <span className="detail-value">{selectedOrder.bikeShopName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Saddle Information */}
                <div className="detail-section">
                  <h3>Saddle Details</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Model:</span>
                      <span className="detail-value">{selectedOrder.saddle.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{selectedOrder.saddle.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value price">${selectedOrder.saddle.price}</span>
                    </div>
                  </div>
                  <p className="saddle-description">{selectedOrder.saddle.description}</p>
                </div>

                {/* Fitting File */}
                {selectedOrder.fittingFile && (
                  <div className="detail-section">
                    <h3>Fitting File</h3>
                    <div className="file-info">
                      <FaBicycle />
                      <span>{selectedOrder.fittingFile}</span>
                    </div>
                  </div>
                )}

                {/* Pressure Analysis */}
                <div className="detail-section">
                  <h3>Pressure Analysis</h3>
                  <p>Pressure distribution from the uploaded fitting data</p>
                  
                  <div className="pressure-grid-container">
                    <div className="pressure-grid">
                      {Array.from({ length: 5 }, (_, y) => (
                        <div key={y} className="pressure-row">
                          {Array.from({ length: 5 }, (_, x) => {
                            // Generate dummy pressure data based on position
                            // In a real app, this would come from the uploaded CSV
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
                          })}
                        </div>
                      ))}
                    </div>

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
                  </div>
                </div>

                {/* Special Requirements */}
                {selectedOrder.specialRequirements && (
                  <div className="detail-section">
                    <h3>Special Requirements</h3>
                    <p>{selectedOrder.specialRequirements}</p>
                  </div>
                )}

                {/* Progress Notes */}
                <div className="detail-section">
                  <h3>Progress Notes</h3>
                  {selectedOrder.notes.length > 0 ? (
                    <div className="notes-list">
                      {selectedOrder.notes.map(note => (
                        <div key={note.id} className="note-item">
                          <div className="note-header">
                            <span className="note-date">{formatDate(note.timestamp)}</span>
                          </div>
                          <p className="note-text">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-notes">No progress notes yet</p>
                  )}
                </div>

                {/* Update Order Section */}
                {editingOrder && editingOrder.id === selectedOrder.id && (
                  <div className="detail-section">
                    <h3>Update Order</h3>
                    <div className="update-form">
                      <div className="form-group">
                        <label className="form-label">Status:</label>
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                          className="form-input"
                        >
                          <option value="Processing">Processing</option>
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Progress (%):</label>
                        <input
                          type="number"
                          name="progress"
                          value={editForm.progress}
                          onChange={handleEditChange}
                          min="0"
                          max="100"
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Add Note:</label>
                        <textarea
                          name="notes"
                          value={editForm.notes}
                          onChange={handleEditChange}
                          className="form-input form-textarea"
                          placeholder="Add a progress note..."
                          rows="3"
                        />
                      </div>
                      
                      <div className="update-actions">
                        <button className="btn btn-primary" onClick={saveOrderUpdate}>
                          Save Updates
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditingOrder(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;

