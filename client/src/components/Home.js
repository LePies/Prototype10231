import React from 'react';
import { Link } from 'react-router-dom';
import { FaBicycle, FaTools, FaFileUpload, FaChartLine, FaUsers, FaAward } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaBicycle />,
      title: "Premium Saddle Designs",
      description: "Choose from our curated collection of high-quality bike saddle designs, each crafted for specific riding styles and comfort preferences."
    },
    {
      icon: <FaFileUpload />,
      title: "Custom Fitting Files",
      description: "Upload your bike fitting data, measurements, and preferences to ensure each saddle is perfectly tailored to your customers."
    },
    {
      icon: <FaChartLine />,
      title: "Real-time Tracking",
      description: "Monitor the progress of every order with our comprehensive tracking system, keeping you and your customers informed."
    },
    {
      icon: <FaUsers />,
      title: "Professional Support",
      description: "Get expert assistance from our team of bike fitting specialists throughout the entire customization process."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Bike Shops Partnered" },
    { number: "24/7", label: "Support Available" },
    { number: "14", label: "Days Average Delivery" }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Professional Custom Bike Saddle Fitting
            </h1>
            <p className="hero-subtitle">
              Transform your bike fitting business with our premium custom saddle service. 
              Perfect fit, every time, for every rider.
            </p>
            <div className="hero-actions">
              <Link to="/designs" className="btn btn-primary">
                View Saddle Designs
              </Link>
              <Link to="/order" className="btn btn-secondary">
                Start Your Order
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">
              <FaBicycle />
              <span>Premium Bike Saddles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Service?</h2>
            <p>Designed specifically for bike fitters and shop owners who demand the best for their customers</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Elevate Your Bike Fitting Service?</h2>
            <p>
              Join hundreds of professional bike fitters who trust us with their customers' comfort. 
              Start your first custom saddle order today.
            </p>
            <div className="cta-actions">
              <Link to="/order" className="btn btn-primary">
                Place Your First Order
              </Link>
              <Link to="/tracking" className="btn btn-secondary">
                Track Existing Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;



