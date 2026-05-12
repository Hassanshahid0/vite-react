import React from 'react';

const Process: React.FC = () => {
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="row">
          <h1 className="section-header section-header--white">What is the Inspection Process?</h1>
          <div className="process__step">
            <div className="process__number-wrap"><span className="process__number">1</span></div>
            <div className="section__text-wrap base-12 sml-6">
              <h2 className="section-sub-head section-sub-head--white">Order Inspection</h2>
              <p className="process__text process__text--one">Place an order for a vehicle inspection through the site
                or by phone.</p>
            </div>
            <div className="process__buttons base-12 sml-6">
              <a className="btn btn--order" data-cy="order-inspection2"
                href="https://lemonsquad.com/order/inspection-request">Order Online</a>
              <a className="btn btn--call" data-cy="call-center"
                href="tel:8882317965">(888) 231-7965</a>
            </div>
          </div>
          <div className="process__step">
            <div className="process__number-wrap"><span className="process__number">2</span></div>
            <h2 className="section-sub-head section-sub-head--white">Our Inspector Inspects</h2>
            <p className="process__text">Our expert inspector will contact your seller to verify the availability of the
              vehicle and set up an appointment to inspect your automobile. The inspector will go directly to the
              vehicle to perform the inspection.</p>
          </div>
          <div className="process__step">
            <div className="process__number-wrap"><span className="process__number">3</span></div>
            <h2 className="section-sub-head section-sub-head--white">Receive your report</h2>
            <p className="process__text">The inspector will upload the report to us, and after an intricate error
              checking and reviewal process, you'll receive notification when your report is ready to login and
              view. You'll be notified the instant the report is ready to login and view.</p>
          </div>
        </div>
      </div>
      <div className="process__image-wrap">
        <img className="process__image" src="https://lemonsquad.com/zetr_local/assets/images/red-car.png" alt="red car" />
      </div>
    </section>
  );
};

export default Process;
