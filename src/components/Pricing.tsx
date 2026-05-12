import React from 'react';

const plans = [
  {
    name: 'Exotic',
    price: '$286',
    features: [
      'For higher end vehicles (e.g. Porsche, Bugatti, Lamborghini, etc)',
      'Computer diagnosis of engine, transmission, ABS, and air-bag',
      'Comprehensive mechanical inspection of complete drive-train',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Road test',
      'Fluid levels check',
      'More than 25 pictures',
      'More care, more detail, more attention',
      'Type: Pre-purchase used car inspection'
    ]
  },
  {
    name: 'Standard',
    price: '$220',
    expert: true,
    features: [
      'For cars newer than 20 years old',
      'Our best-seller!',
      'Perfect for most vehicles',
      'Computer diagnosis of engine, transmission, ABS, and air-bag',
      'Comprehensive mechanical inspection of complete drive-train',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Road test',
      'Fluid levels check',
      'More than 25 pictures',
      'Type: Pre-purchase used car inspection'
    ]
  },
  {
    name: 'Classic',
    price: '$330',
    vintage: true,
    features: [
      'For cars 20 years or older',
      'Comprehensive mechanical inspection of the engine and transmission',
      'Complete drive-line inspection',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Check for previous body repairs or prior hidden damage',
      'Rust and bondo',
      'Verify engine and transmission numbers',
      'Road test',
      'More than 40 pictures',
      'Emphasis on age deterioration',
      'Type: Pre-purchase used car inspection'
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="vehicle-type" id="pricing_tables">
      <div className="vehicle-type__header-wrap">
        <h1 className="section-header">Mobile Pre-Purchase Used Car Inspections</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="vehicle-type__nav"></div>
          <div className="vehicle-type__owl">
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {plans.map((plan) => (
                <div className="vehicle-type__wrapper" key={plan.name} style={{ flex: '1 1 300px', maxWidth: '350px' }}>
                  <div className="vehicle-type__pricing">
                    <h2 className={`vehicle-type__header ${plan.expert ? 'vehicle-type__header--expert' : ''} ${plan.vintage ? 'vehicle-type__header--vintage' : ''}`}>
                      {plan.name}
                    </h2>
                    <div className="vehicle-type__price">
                      <span className="money-sale-formatter sale-false" data-price={plan.price}>{plan.price}</span>
                    </div>
                    <div className="vehicle-type__pricing-body">
                      <ul className="vehicle-type__list">
                        {plan.features.map((feature, index) => (
                          <li className="vehicle-type__item" key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="vehicle-type__cta">
                      <a className="vehicle-type__btn vehicle-type__btn--report" href={`https://lemonsquad.com/sample/${plan.name.toLowerCase()}`}>Sample Report</a>
                      <a className="vehicle-type__btn" href="https://lemonsquad.com/order/inspection-request">Order Inspection</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
