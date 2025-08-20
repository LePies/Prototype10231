import React, { useState, useEffect } from 'react';
import './PressureMap.css';

const PressureMap = () => {
  const [pressureData, setPressureData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the CSV data
    setTimeout(() => {
      const dummyData = [
        { x: 0, y: 0, pressure: 45.2 },
        { x: 1, y: 0, pressure: 52.8 },
        { x: 2, y: 0, pressure: 48.9 },
        { x: 3, y: 0, pressure: 51.3 },
        { x: 4, y: 0, pressure: 47.6 },
        { x: 0, y: 1, pressure: 53.1 },
        { x: 1, y: 1, pressure: 67.4 },
        { x: 2, y: 1, pressure: 72.8 },
        { x: 3, y: 1, pressure: 65.9 },
        { x: 4, y: 1, pressure: 54.2 },
        { x: 0, y: 2, pressure: 49.8 },
        { x: 1, y: 2, pressure: 71.2 },
        { x: 2, y: 2, pressure: 89.5 },
        { x: 3, y: 2, pressure: 73.6 },
        { x: 4, y: 2, pressure: 50.1 },
        { x: 0, y: 3, pressure: 52.3 },
        { x: 1, y: 3, pressure: 68.9 },
        { x: 2, y: 3, pressure: 74.2 },
        { x: 3, y: 3, pressure: 66.7 },
        { x: 4, y: 3, pressure: 51.8 },
        { x: 0, y: 4, pressure: 46.7 },
        { x: 1, y: 4, pressure: 53.4 },
        { x: 2, y: 4, pressure: 49.1 },
        { x: 3, y: 4, pressure: 52.9 },
        { x: 4, y: 4, pressure: 48.3 }
      ];
      setPressureData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const getPressureColor = (pressure) => {
    // Color scale from blue (low) to red (high)
    const minPressure = 45;
    const maxPressure = 90;
    const normalized = (pressure - minPressure) / (maxPressure - minPressure);
    
    if (normalized < 0.3) {
      return `rgba(59, 130, 246, ${0.3 + normalized * 0.7})`; // Blue
    } else if (normalized < 0.7) {
      return `rgba(245, 158, 11, ${0.3 + (normalized - 0.3) * 0.7})`; // Yellow
    } else {
      return `rgba(239, 68, 68, ${0.3 + (normalized - 0.7) * 0.7})`; // Red
    }
  };

  const getMaxPressure = () => {
    return Math.max(...pressureData.map(d => d.pressure));
  };

  const getMinPressure = () => {
    return Math.min(...pressureData.map(d => d.pressure));
  };

  if (loading) {
    return (
      <div className="pressure-map">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading pressure data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pressure-map">
      <div className="container">
        <div className="page-header">
          <h1>Foam Pressure Analysis</h1>
          <p>Pressure distribution across foam square grid (values in kPa)</p>
        </div>

        <div className="pressure-grid-container">
          <div className="pressure-grid">
            {Array.from({ length: 5 }, (_, y) => (
              <div key={y} className="pressure-row">
                {Array.from({ length: 5 }, (_, x) => {
                  const dataPoint = pressureData.find(d => d.x === x && d.y === y);
                  const pressure = dataPoint ? dataPoint.pressure : 0;
                  return (
                    <div
                      key={x}
                      className="pressure-cell"
                      style={{
                        backgroundColor: getPressureColor(pressure),
                        border: dataPoint ? '2px solid #1e293b' : '1px solid #e2e8f0'
                      }}
                      title={`Position (${x}, ${y}): ${pressure} kPa`}
                    >
                      <span className="pressure-value">{pressure}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="pressure-legend">
            <h3>Pressure Scale</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}></div>
                <span>Low: {getMinPressure().toFixed(1)} kPa</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'rgba(245, 158, 11, 0.8)' }}></div>
                <span>Medium: ~67 kPa</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'rgba(239, 68, 68, 0.8)' }}></div>
                <span>High: {getMaxPressure().toFixed(1)} kPa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pressure-stats">
          <div className="stat-card">
            <h3>Maximum Pressure</h3>
            <div className="stat-value">{getMaxPressure().toFixed(1)} kPa</div>
            <p>Highest pressure point on the foam</p>
          </div>
          <div className="stat-card">
            <h3>Average Pressure</h3>
            <div className="stat-value">
              {(pressureData.reduce((sum, d) => sum + d.pressure, 0) / pressureData.length).toFixed(1)} kPa
            </div>
            <p>Mean pressure across all points</p>
          </div>
          <div className="stat-card">
            <h3>Pressure Range</h3>
            <div className="stat-value">{(getMaxPressure() - getMinPressure()).toFixed(1)} kPa</div>
            <p>Difference between max and min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressureMap;


