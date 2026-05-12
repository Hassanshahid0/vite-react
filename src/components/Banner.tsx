import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <img src="https://lemonsquad.com/zetr_local/assets/images/banner.v3.jpg" className="banner__image" alt="banner" />
      <div className="container banner__container">
        <div className="banner__row row">
          <div className="banner__form contact-form">
            <div className="contact-form__text-wrap">
              <p className="contact-form__head">Don't buy a lemon<span className="trade_mark">&trade;</span></p>
              <p className="contact-form__text">Get your pre-purchase used car inspection today
                with&nbsp;Lemon&nbsp;Squad<span className="trade_mark_min">&trade;</span>.<br />We're here to prevent
                you from buying a lemon. </p>
            </div>
            <div id="E9898">
              <a className="btn" data-cy="order-inspection"
                style={{ width: '80%', margin: '10px auto', textAlign: 'center', display: 'block' }}
                href="https://lemonsquad.com/order/inspection-request">Order Inspection</a>
              <a href="#process"> <img src="https://lemonsquad.com/zetr_local/assets/images/why-choose-us-z.jpg" style={{ maxWidth: '100%' }}
                alt="Why Choose Us" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
