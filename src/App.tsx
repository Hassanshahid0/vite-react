import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Coverage from './components/Coverage';
import Process from './components/Process';
import Pricing from './components/Pricing';
import AddOns from './components/AddOns';
import BenefitsCTA from './components/BenefitsCTA';
import VideoReviews from './components/VideoReviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
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
        <AddOns />
        <BenefitsCTA />
        <VideoReviews />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}

export default App;
