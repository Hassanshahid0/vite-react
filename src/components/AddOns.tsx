import React from 'react';

const AddOns: React.FC = () => {
  return (
    <section className="add-ons">
      <h1 className="section-header section-header--add-ons">Add-ons to your Vehicle Inspection</h1>
      <div className="container">
        <div className="row">
          <div className="add-ons__text-wrap base-12 med-4">
            <h2 className="section-sub-head">CARFAX Vehicle History Report</h2>
            <p className="section-text">Millions of consumers rely on CARFAX Reports every day to help them decide whether or
              not to buy a used car. Each report contains information about whether the car in question has been in an
              accident, has any open recalls, previous owners, service history and much, much more. Available for all cars
              with a VIN (1982 and newer).</p>
            <p className="add-ons__price">
              <span className="money-sale-formatter sale-false" data-price="$34.99">$34.99</span>
            </p>
          </div>
          <div className="add-ons__text-wrap base-12 med-4">
            <h2 className="section-sub-head">Verbal Vehicle Assessment Report</h2>
            <p className="section-text">Receive a phone call when you receive your report from one of our in house professional
              staff members. To help you gain a greater understanding of your report, we will explain your report in
              detail to make sure you have a complete understanding of the vehicle.</p>
            <p className="add-ons__price">
              <span className="money-sale-formatter sale-false" data-price="$49.99">$49.99</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOns;
