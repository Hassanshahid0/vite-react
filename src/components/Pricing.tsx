import React, { useState } from 'react';

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
  },
  {
    name: 'Commercial',
    price: '$365',
    commercial: true,
    features: [
      'For all commercial vehicles',
      'Comprehensive mechanical inspection of complete drive-train',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Examine all commercial components for condition and function',
      'Road test to be performed by the seller or seller\'s representative',
      'Fluid levels check',
      'More than 25 pictures',
      'Type: Pre-purchase used car inspection'
    ]
  },
  {
    name: 'Motorcycle',
    price: '$210',
    motorcycle: true,
    features: [
      'For all motorcycles',
      'Comprehensive mechanical inspection of the engine and transmission',
      'Complete drive-line inspection',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Check for previous Body Repairs',
      'Rust and bondo',
      'Prior hidden damage',
      'Verify engine and transmission numbers',
      'Does not include road test',
      'More than 25 pictures',
      'Emphasis on age deterioration'
    ]
  }
];

const RVPlan: React.FC = () => {
  const [rvType, setRvType] = useState<'motorhomes' | 'towable'>('motorhomes');

  return (
    <div className="vehicle-type__wrapper" style={{ flex: '1 1 300px', maxWidth: '350px' }}>
      <div className="vehicle-type__pricing">
        <div className="rvcommon">
          <h2 className="vehicle-type__header vehicle-type__header--rv rv_icon" style={{ paddingBottom: '9px' }}>
            RV
            <div className="newrvtype">
              <a className={`rvtype motorhomes ${rvType === 'motorhomes' ? 'active' : ''}`} onClick={() => setRvType('motorhomes')}>Motorhomes</a>
              <a className={`rvtype towable ${rvType === 'towable' ? 'active' : ''}`} onClick={() => setRvType('towable')}>Towables</a>
            </div>
          </h2>
        </div>
        <div className="vehicle-type__price newrvprice">
          <span className="money-sale-formatter sale-false" data-price={rvType === 'motorhomes' ? '$449' : '$449'}>$449</span>
        </div>
        <div className={`vehicle-type__pricing-body newrvdesc ${rvType === 'motorhomes' ? 'show' : 'hide'}`}>
          <ul className="vehicle-type__list">
            <li className="vehicle-type__item">For all types of Motorhomes Recreational Vehicles (RVs)</li>
            <li className="vehicle-type__item">Comprehensive mechanical inspection of complete drive-train</li>
            <li className="vehicle-type__item">120 volt systems and appliances</li>
            <li className="vehicle-type__item">All appliances: stove, fridge, heater, A/C, water</li>
            <li className="vehicle-type__item">Fresh water and drainage check</li>
            <li className="vehicle-type__item">Audio and video component inspection</li>
            <li className="vehicle-type__item">Generator and LP gas systems check</li>
            <li className="vehicle-type__item">Leveling jacks</li>
            <li className="vehicle-type__item">Slide-outs</li>
            <li className="vehicle-type__item">More than 40 pictures</li>
            <li className="vehicle-type__item">Road test</li>
            <li className="vehicle-type__item">Recommended before any used Motorhomes purchase</li>
          </ul>
        </div>
        <div className={`vehicle-type__pricing-body newrvdesc ${rvType === 'towable' ? 'show' : 'hide'}`}>
          <ul className="vehicle-type__list">
            <li className="vehicle-type__item">For all types of Towables Recreational Vehicles (RVs)</li>
            <li className="vehicle-type__item">Comprehensive mechanical inspection of complete drive-train</li>
            <li className="vehicle-type__item">120 volt systems and appliances</li>
            <li className="vehicle-type__item">All appliances: stove, fridge, heater, A/C, water</li>
            <li className="vehicle-type__item">Generator and LP gas systems check</li>
            <li className="vehicle-type__item">Fresh water and drainage check</li>
            <li className="vehicle-type__item">Audio and video component inspection</li>
            <li className="vehicle-type__item">Leveling jacks</li>
            <li className="vehicle-type__item">Slide-outs</li>
            <li className="vehicle-type__item">More than 40 pictures</li>
            <li className="vehicle-type__item">Road test</li>
            <li className="vehicle-type__item">Recommended before any used Towables purchase</li>
          </ul>
        </div>
        <div className="vehicle-type__cta">
          <a className="vehicle-type__btn vehicle-type__btn--report newrvbtn" href="https://lemonsquad.com/sample/rv">Sample Report</a>
          <a className="vehicle-type__btn newrvbtn" href={`https://lemonsquad.com/order/inspection-request?source=${rvType}`}>Order Inspection</a>
        </div>
      </div>
    </div>
  );
};

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
                    <h2 className={`vehicle-type__header ${plan.expert ? 'vehicle-type__header--expert' : ''} ${plan.vintage ? 'vehicle-type__header--vintage' : ''} ${plan.commercial ? 'vehicle-type__header--commercial' : ''} ${plan.motorcycle ? 'vehicle-type__header--motorcycle' : ''}`}>
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
              <RVPlan />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
