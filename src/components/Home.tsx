import React from 'react'
import Header from './Header'

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="banner">
        <img src="https://lemonsquad.com/zetr_local/assets/images/banner.v3.jpg" className="banner__image" alt="banner" />
        <div className="container banner__container">
          <div className="banner__row row">
            <div className="banner__form contact-form">
              <div className="contact-form__text-wrap">
                <p className="contact-form__head">Don't buy a lemon<span className="trade_mark">&trade;</span></p>
                <p className="contact-form__text">Get your pre-purchase used car inspection today with Carz Squad<span className="trade_mark_min">&trade;</span>.<br />We're here to prevent you from buying a lemon.</p>
              </div>
              <div id="E9898">
                <a className="btn" data-cy="order-inspection" style={{ width: '80%', margin: '10px auto', textAlign: 'center', display: 'block' }} href="/packages">Order Inspection</a>
                <a href="#process"> <img src="https://lemonsquad.com/zetr_local/assets/images/why-choose-us-z.jpg" style={{ maxWidth: '100%' }} alt="Why Choose Us" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <section className="coverage-cta">
        <a className="coverage-cta__wrapper base-12 med-4" href="/packages">
          <h2 className="section-sub-head">INSTANT INSPECTIONS, BUILT FOR THE MOMENT YOU NEED THEM.</h2>
          <p className="coverage-cta__text">Carz Squad Live is designed for that high-pressure moment at the dealership or curb. Launch a session in minutes and get real-time expert help.</p>
          <img alt="Cell Phone Showing Live call with car savvy trained inspector." src="https://lemonsquad.com/images/ls_live-phone-call-t.png" style={{ maxHeight: '7.7em', margin: '-1.1em 0px' }} />
        </a>
        <a className="coverage-cta__wrapper base-12 med-4" href="/faq">
          <h2 className="section-sub-head">We cover the entire USA</h2>
          <p className="coverage-cta__text">No matter where you live—or where your new car is—we have an inspector in your area ready to take a look! We even cover Alaska and Hawaii.</p>
          <div className="coverage-cta__map-icon">
            <img className="coverage-cta__image" alt="We cover the entire USA" src="https://lemonsquad.com/zetr_local/assets/images/usa-map.png" />
          </div>
        </a>
        <a className="coverage-cta__wrapper base-12 med-4" href="/packages">
          <h2 className="section-sub-head">EVS ARE DIFFERENT. INSPECT THEM DIFFERENTLY</h2>
          <p className="coverage-cta__text">We inspect EVs like Tesla, Rivian, Lucid, Mach-E, IONIQ 5, Kia EV6, and more - checking for system alerts, charging faults, and battery-related red flags a standard mechanic (and a standard test drive) will miss.</p>
          <img style={{ width: '7.7em', margin: '-0.3em 0px' }} className="fill-dark" src="https://lemonsquad.com/images/layout/lemon-squad-sprite.svg#sprite-path-ev" />
        </a>
      </section>

      {/* Process */}
      <section className="process" id="process">
        <div className="container">
          <div className="row">
            <h1 className="section-header section-header--white">What is the Inspection Process?</h1>
            <div className="process__step">
              <div className="process__number-wrap"><span className="process__number">1</span></div>
              <div className="section__text-wrap base-12 sml-6">
                <h2 className="section-sub-head section-sub-head--white">Order Inspection</h2>
                <p className="process__text process__text--one">Place an order for a vehicle inspection through the site or by phone.</p>
              </div>
              <div className="process__buttons base-12 sml-6">
                <a className="btn btn--order" data-cy="order-inspection2" href="/packages">Order Online</a>
                <a className="btn btn--call" data-cy="call-center" href="https://wa.me/18578228188">+18578228188</a>
              </div>
            </div>
            <div className="process__step">
              <div className="process__number-wrap"><span className="process__number">2</span></div>
              <h2 className="section-sub-head section-sub-head--white">Our Inspector Inspects</h2>
              <p className="process__text">Our expert inspector will contact your seller to verify the availability of the vehicle and set up an appointment to inspect your automobile. The inspector will go directly to the vehicle to perform the inspection.</p>
            </div>
            <div className="process__step">
              <div className="process__number-wrap"><span className="process__number">3</span></div>
              <h2 className="section-sub-head section-sub-head--white">Receive your report</h2>
              <p className="process__text">The inspector will upload the report to us, and after an intricate error checking and reviewal process, you'll receive notification when your report is ready to login and view. You'll be notified the instant the report is ready to login and view.</p>
            </div>
          </div>
        </div>
        <div className="process__image-wrap">
          <img className="process__image" src="https://lemonsquad.com/zetr_local/assets/images/red-car.png" alt="red car" />
        </div>
      </section>

      {/* Pricing */}
      <section className="vehicle-type" data-equalizer data-equalize-on="large" id="pricing_tables">
        <div className="vehicle-type__header-wrap">
          <h1 className="section-header">Mobile Pre-Purchase Used Car Inspections</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="vehicle-type__nav"></div>
            <div className="vehicle-type__owl owl-carousel">
              {/* Exotic */}
              <div className="vehicle-type__wrapper">
                <div className="vehicle-type__pricing" data-equalizer-watch>
                  <h2 className="vehicle-type__header">Exotic</h2>
                  <div className="vehicle-type__price">
                    <span className="money-sale-formatter sale-false" data-price="$285.99">$285.99</span>
                  </div>
                  <div className="vehicle-type__pricing-body">
                    <ul className="vehicle-type__list">
                      <li className="vehicle-type__item">For higher end vehicles (e.g. Porsche, Bugatti, Lamborghini, etc)</li>
                      <li className="vehicle-type__item">Computer diagnosis of engine, transmission, ABS, and air-bag</li>
                      <li className="vehicle-type__item">Comprehensive mechanical inspection of complete drive-train</li>
                      <li className="vehicle-type__item">Inspection of the steering, suspension, and brakes</li>
                      <li className="vehicle-type__item">Check for previous accident damage and flood damage</li>
                      <li className="vehicle-type__item">Road test</li>
                      <li className="vehicle-type__item">Fluid levels check</li>
                      <li className="vehicle-type__item">More than 25 pictures</li>
                      <li className="vehicle-type__item">More care, more detail, more attention</li>
                      <li className="vehicle-type__item">Type: Pre-purchase used car inspection</li>
                    </ul>
                  </div>
                  <div className="vehicle-type__cta">
                    <a className="vehicle-type__btn vehicle-type__btn--report" data-cy="sample-report1" href="/packages">Order Inspection</a>
                    <a className="vehicle-type__btn" data-cy="order-inspection3" href="/packages">Order Inspection</a>
                  </div>
                </div>
              </div>
              {/* Standard */}
              <div className="vehicle-type__wrapper">
                <div className="vehicle-type__pricing" data-equalizer-watch>
                  <h2 className="vehicle-type__header vehicle-type__header--expert">Standard</h2>
                  <div className="vehicle-type__price">
                    <span className="money-sale-formatter sale-false" data-price="$219.99">$219.99</span>
                  </div>
                  <div className="vehicle-type__pricing-body">
                    <ul className="vehicle-type__list">
                      <li className="vehicle-type__item">For cars newer than 20 years old</li>
                      <li className="vehicle-type__item">Our best-seller!</li>
                      <li className="vehicle-type__item">Perfect for most vehicles</li>
                      <li className="vehicle-type__item">Computer diagnosis of engine, transmission, ABS, and air-bag</li>
                      <li className="vehicle-type__item">Comprehensive mechanical inspection of complete drive-train</li>
                      <li className="vehicle-type__item">Inspection of the steering, suspension, and brakes</li>
                      <li className="vehicle-type__item">Check for previous accident damage and flood damage</li>
                      <li className="vehicle-type__item">Road test</li>
                      <li className="vehicle-type__item">Fluid levels check</li>
                      <li className="vehicle-type__item">More than 25 pictures</li>
                      <li className="vehicle-type__item">Type: Pre-purchase used car inspection</li>
                    </ul>
                  </div>
                  <div className="vehicle-type__cta">
                    <a className="vehicle-type__btn vehicle-type__btn--report" data-cy="sample-report2" href="/packages">Order Inspection</a>
                    <a className="vehicle-type__btn" data-cy="order-inspection4" href="/packages">Order Inspection</a>
                  </div>
                </div>
              </div>
              {/* Classic */}
              <div className="vehicle-type__wrapper">
                <div className="vehicle-type__pricing" data-equalizer-watch>
                  <h2 className="vehicle-type__header vehicle-type__header--vintage">Classic</h2>
                  <div className="vehicle-type__price">
                    <span className="money-sale-formatter sale-false" data-price="$329.99">$329.99</span>
                  </div>
                  <div className="vehicle-type__pricing-body">
                    <ul className="vehicle-type__list">
                      <li className="vehicle-type__item">For cars 20 years or older</li>
                      <li className="vehicle-type__item">Comprehensive mechanical inspection of the engine and transmission</li>
                      <li className="vehicle-type__item">Complete drive-line inspection</li>
                      <li className="vehicle-type__item">Inspection of the steering, suspension, and brakes</li>
                      <li className="vehicle-type__item">Check for previous accident damage and flood damage</li>
                      <li className="vehicle-type__item">Check for previous body repairs or prior hidden damage</li>
                      <li className="vehicle-type__item">Rust and bondo</li>
                      <li className="vehicle-type__item">Verify engine and transmission numbers</li>
                      <li className="vehicle-type__item">Road test</li>
                      <li className="vehicle-type__item">More than 40 pictures</li>
                      <li className="vehicle-type__item">Emphasis on age deterioration</li>
                      <li className="vehicle-type__item">Type: Pre-purchase used car inspection</li>
                    </ul>
                  </div>
                  <div className="vehicle-type__cta">
                    <a className="vehicle-type__btn vehicle-type__btn--report" data-cy="sample-report3" href="/packages">Order Inspection</a>
                    <a className="vehicle-type__btn" data-cy="order-inspection5" href="/packages">Order Inspection</a>
                  </div>
                </div>
              </div>
              {/* Commercial */}
              <div className="vehicle-type__wrapper">
                <div className="vehicle-type__pricing" data-equalizer-watch>
                  <h2 className="vehicle-type__header vehicle-type__header--commercial">Commercial</h2>
                  <div className="vehicle-type__price">
                    <span className="money-sale-formatter sale-false" data-price="$364.99">$364.99</span>
                  </div>
                  <div className="vehicle-type__pricing-body">
                    <ul className="vehicle-type__list">
                      <li className="vehicle-type__item">For all commercial vehicles</li>
                      <li className="vehicle-type__item">Comprehensive mechanical inspection of complete drive-train</li>
                      <li className="vehicle-type__item">Inspection of the steering, suspension, and brakes</li>
                      <li className="vehicle-type__item">Check for previous accident damage and flood damage</li>
                      <li className="vehicle-type__item">Examine all commercial components for condition and function</li>
                      <li className="vehicle-type__item">Road test to be performed by the seller or seller's representative with the inspector as a passenger</li>
                      <li className="vehicle-type__item">Fluid levels check</li>
                      <li className="vehicle-type__item">More than 25 pictures</li>
                      <li className="vehicle-type__item">Type: Pre-purchase used car inspection</li>
                    </ul>
                  </div>
                  <div className="vehicle-type__cta">
                    <a className="vehicle-type__btn vehicle-type__btn--report" data-cy="sample-report4" href="/packages">Order Inspection</a>
                    <a className="vehicle-type__btn" data-cy="order-inspection6" href="/packages">Order Inspection</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="add-ons">
        <h1 className="section-header section-header--add-ons">Enhance Your Inspection</h1>
        <div className="add-ons__text-wrap base-12 med-4">
          <h2 className="section-sub-head">Vehicle History Snapshot</h2>
          <p className="section-text">Add a trusted history check with key details like accidents, title events, ownership, recalls, and service highlights (VIN required, 1982+).</p>
          <p className="add-ons__price">
            <span className="money-sale-formatter sale-false" data-price="$34.99">$34.99</span>
          </p>
        </div>
        <div className="add-ons__text-wrap base-12 med-4">
          <h2 className="section-sub-head">Phone Report Walkthrough</h2>
          <p className="section-text">Get a quick call from our team when you receive your report. We summarize the key findings and answer your questions so you know exactly what matters.</p>
          <p className="add-ons__price">
            <span className="money-sale-formatter sale-false" data-price="$49.99">$49.99</span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="cta">
        <div className="cta__wrapper owl-carousel">
          <div className="cta__wrap">
            <div className="cta__circle"><span className="cta__icon cta__icon--support"></span></div>
            <p className="cta__text">Always get a person<br />on the phone</p>
          </div>
          <div className="cta__wrap">
            <div className="cta__circle"><span className="cta__icon cta__icon--dollar"></span></div>
            <p className="cta__text">No hidden<br />fees</p>
          </div>
          <div className="cta__wrap">
            <div className="cta__circle"><span className="cta__icon cta__icon--clock"></span></div>
            <p className="cta__text">Best turn around<br />time in the industry</p>
          </div>
          <div className="cta__wrap">
            <div className="cta__circle"><span className="cta__icon cta__icon--check"></span></div>
            <p className="cta__text">Easy to understand<br />reports</p>
          </div>
          <div className="cta__wrap">
            <div className="cta__circle"><span className="cta__icon cta__icon--expert"></span></div>
            <p className="cta__text">Qualified experienced<br />inspectors</p>
          </div>
          <div className="cta__wrap">
            <div className="cta__circle"><span className="cta__icon cta__icon--car"></span></div>
            <p className="cta__text">Largest company in<br />the industry</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
