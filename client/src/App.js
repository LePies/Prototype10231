import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SaddleDesigns from './components/SaddleDesigns';
import OrderForm from './components/OrderForm';
import OrderTracking from './components/OrderTracking';
import PressureMap from './components/PressureMap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/designs" element={<SaddleDesigns />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/tracking" element={<OrderTracking />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

