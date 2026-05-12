import React from 'react';

const FAQ: React.FC = () => {
  return (
    <section className="faq">
      <div className="container">
        <div className="row">
          <div className="faq__wrapper base-12 med-6">
            <div className="faq__word-wrap">
              <h1 className="faq__head">Frequently Asked Questions</h1>
              <p className="faq__question js-accordion">How soon after I place my order will I get my report?</p>
              <p className="faq__answer js-accordion-show">Inspections are typically completed within two business days, depending on the inspector's schedule, the seller's schedule, and the weather. Reports are usually uploaded the following morning that the inspection is done.</p>
              <p className="faq__question js-accordion">What happens if they sell the vehicle I ordered an inspection on?</p>
              <p className="faq__answer js-accordion-show">If the vehicle sells before we get there, we will put your order on hold while you look for another vehicle. When you find another vehicle you'd like us to inspect, we'll transfer the details and send our inspector right away!</p>
              <p className="faq__question js-accordion">Can I use an AI assistant to help place an order?</p>
              <p className="faq__answer js-accordion-show"><b>Yes</b>. You can provide your vehicle and contact details to an AI assistant, and it can generate a clickable link that pre-populates our order form.</p>
            </div>
          </div>
          <img className="faq__image base-12 med-6" src="https://lemonsquad.com/zetr_local/assets/images/mechanic.png" alt="mechanic" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
