import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <section className="logo-carousel">
        <div className="container">
          <div className="row">
            <div className="logo-carousel__wrapper">
              <div className="logo-carousel__logo">
                <img 
                  className="logo-carousel__logo-image" 
                  src="https://lemonsquad.com/images/carfax_logo.svg" 
                  alt="CARFAX Vehicle History Report" 
                  style={{ maxWidth: '200px', margin: '20px auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-strip cta-strip--order">
        <div className="container">
          <div className="row">
            <div className="base-12" style={{ textAlign: 'center', padding: '40px 0' }}>
              <p className="cta-strip__text cta-strip__text--order" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                Don’t spend your hard-earned money on a lemon.
              </p>
              <a className="btn btn--cta-order" href="https://lemonsquad.com/order/inspection-request" style={{ background: '#f8cc37', color: '#333', padding: '15px 30px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
                Order Inspection
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="footer" style={{ background: '#f9f9f9', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div className="footer__contact base-12 med-5">
              <img src="https://lemonsquad.com/images/layout/logo_primary.svg" className="site-logo__image footer__logo" alt="Lemon Squad" style={{ maxWidth: '250px', marginBottom: '20px' }} />
              <p><a href="https://lemonsquad.com/inspector-signup" className="btn" style={{ background: '#2d303a', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Become an Inspector</a></p>
            </div>
            <div className="base-12 med-7">
              <div className="footer__text-wrap">
                <p className="section-sub-head" style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>Contact</p>
                <p className="footer__text footer__text--bold">Phone:<a className="footer__text footer__text--link" href="tel:8882317965"> (888) 231-7965</a></p>
                <p className="footer__text">Orders may be placed online 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-lower" style={{ background: '#2d303a', color: 'white', padding: '20px 0' }}>
        <div className="container">
          <div className="row">
            <p className="footer-lower__text base-12 med-6">2026 &copy; ALL Rights Reserved. <a href="https://lemonsquad.com/privacy" style={{ color: 'white' }}>Privacy Policy</a> | <a href="https://lemonsquad.com/terms" style={{ color: 'white' }}>Terms of Service.</a></p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
