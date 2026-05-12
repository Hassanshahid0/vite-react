import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Coverage from './components/Coverage';
import Process from './components/Process';
import Pricing from './components/Pricing';
import './App.css';

function App() {
  return (
    <div className="production">
      <Header />
      <div id="sideload-middle">
        <Banner />
        <Coverage />
        <Process />
        <Pricing />
      </div>
      <footer style={{ padding: '40px 20px', textAlign: 'center', background: '#2d303a', color: 'white' }}>
        <div className="container">
          <p>&copy; 2026 Lemon Squad Auto Inspections. All rights reserved.</p>
          <div style={{ marginTop: '20px' }}>
            <a href="https://lemonsquad.com/contact" style={{ color: 'white', margin: '0 10px' }}>Contact</a>
            <a href="https://lemonsquad.com/faqs" style={{ color: 'white', margin: '0 10px' }}>FAQs</a>
            <a href="https://lemonsquad.com/login" style={{ color: 'white', margin: '0 10px' }}>Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
