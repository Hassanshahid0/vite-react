import './App.css'

const baseUrl = 'https://lemonsquad.com'

const inspectionPlans = [
  {
    name: 'Exotic',
    price: '$286',
    report: '/sample/exotic',
    orderCy: 'order-inspection3',
    sampleCy: 'sample-report1',
    headerClass: '',
    items: [
      'For higher end vehicles (e.g. Porsche, Bugatti, Lamborghini, etc)',
      'Computer diagnosis of engine, transmission, ABS, and air-bag',
      'Comprehensive mechanical inspection of complete drive-train',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Road test',
      'Fluid levels check',
      'More than 25 pictures',
      'More care, more detail, more attention',
      'Type: Pre-purchase used car inspection',
    ],
  },
  {
    name: 'Standard',
    price: '$220',
    report: '/sample/expert',
    orderCy: 'order-inspection4',
    sampleCy: 'sample-report2',
    headerClass: 'vehicle-type__header--expert',
    items: [
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
      'Type: Pre-purchase used car inspection',
    ],
  },
  {
    name: 'Classic',
    price: '$330',
    report: '/sample/classic',
    orderCy: 'order-inspection5',
    sampleCy: 'sample-report3',
    headerClass: 'vehicle-type__header--vintage',
    items: [
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
      'Type: Pre-purchase used car inspection',
    ],
  },
  {
    name: 'Commercial',
    price: '$365',
    report: '/sample/commercial',
    orderCy: 'order-inspection6',
    sampleCy: 'sample-report4',
    headerClass: 'vehicle-type__header--commercial',
    items: [
      'For all commercial vehicles',
      'Comprehensive mechanical inspection of complete drive-train',
      'Inspection of the steering, suspension, and brakes',
      'Check for previous accident damage and flood damage',
      'Examine all commercial components for condition and function',
      "Road test to be performed by the seller or seller's representative with the inspector as a passenger",
      'Fluid levels check',
      'More than 25 pictures',
      'Type: Pre-purchase used car inspection',
    ],
  },
  {
    name: 'Motorcycle',
    price: '$210',
    report: '/sample/motorcycle',
    orderCy: 'order-inspection7',
    sampleCy: 'sample-report5',
    headerClass: 'vehicle-type__header--motorcycle',
    items: [
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
      'Emphasis on age deterioration',
    ],
  },
]


const inspectionNavItems = [
  { label: 'Compare', href: '/used-car-inspections/compare' },
  { label: 'Standard', href: '/used-car-inspections/standard' },
  { label: 'Electric', href: '/used-car-inspections/electric' },
  { label: 'Vintage & Classic', href: '/used-car-inspections/classic' },
  { label: 'Exotic', href: '/used-car-inspections/exotic' },
  { label: 'Live', href: '/remoteinspections' },
  { label: 'RV', href: '/used-car-inspections/rv' },
  { label: 'Commercial', href: '/used-car-inspections/commercial-vehicle' },
  { label: 'Motorcycle', href: '/used-car-inspections/motorcycle' },
  { label: 'Determining Car Value', href: '/car-value' },
  { label: 'Add-Ons', href: '/used-car-inspections/add-ons' },
]

const corporateNavItems = [
  { label: 'Auction Inspection', href: '/used-car-inspections/auction' },
  { label: 'Marketplace Inspection', href: '/used-car-inspections/marketplace' },
  { label: 'Mechanical Inspection', href: '/used-car-inspections/mechanical' },
  { label: 'Pre-Warranty Inspection', href: '/used-car-inspections/prewarranty' },
  { label: 'Prepaid Maintenance & Warranty Solutions', href: 'https://www.wrenchtotalcare.com/', external: true },
]

const rvItems = [
  'For all types of Motorhomes Recreational Vehicles (RVs)',
  'Comprehensive mechanical inspection of complete drive-train',
  '120 volt systems and appliances',
  'All appliances: stove, fridge, heater, A/C, water',
  'Fresh water and drainage check',
  'Audio and video component inspection',
  'Generator and LP gas systems check',
  'Leveling jacks',
  'Slide-outs',
  'More than 40 pictures',
  'Road test',
  'Recommended before any used Motorhomes purchase',
]

const benefits = [
  ['support', 'Always get a person', 'on the phone'],
  ['dollar', 'No hidden', 'fees'],
  ['clock', 'Best turn around', 'time in the industry'],
  ['check', 'Easy to understand', 'reports'],
  ['expert', 'Qualified experienced', 'inspectors'],
  ['car', 'Largest company in', 'the industry'],
]

const reviews = [
  ['Victor E.', 'Great service, extremely polite staff,and a detailed report with specific pictures of area of concerns. Just hired them again for another, and will do the same in the future.'],
  ['Gary W.', 'Thank you so much for doing such a great job inspecting the car. The price was very low compared to comparable cars and it seemed too good to be true. I appreciate you noting your concerns with the car and I will be using this service in the future.'],
  ['William W.', 'Inspection was extremely helpful. Items that could be seen in the photos on the listing but were overlooked were identified as potential issues during the inspection.'],
]

function url(path: string) {
  return `${baseUrl}${path}`
}

function App() {
  return (
    <>
      <header className="main-header">
        <nav className="mini-nav hide-for-small-only">
          <div className="container">
            <ul className="mini-nav__list">
              <li className="mini-nav__item"><a href={url('/inspector-signup')} className="mini-nav__link">Become an Inspector</a></li>
              <li className="mini-nav__item"><a href={url('/order/inspection-request')} className="mini-nav__link mini-nav__link--standout">Order an Inspection</a></li>
              <li className="mini-nav__item"><a href={url('/login')} className="mini-nav__link">Login</a></li>
            </ul>
          </div>
        </nav>

        <div className="main-header__content">
          <div className="container">
            <div className="row">
              <div className="site-logo base-12 med-6">
                <a data-cy="logo" href={baseUrl}>
                  <img src={url('/images/layout/logo_primary.svg')} className="site-logo__image" alt="Lemon Squad - Nationwide Used Car Inspection" />
                </a>
              </div>
              <div className="main-header__details med-6">
                <p className="main-header__times" />
                <a className="main-header__number" data-cy="contact-number" href="tel:8882317965">(888) 231-7965</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-nav">
          <div className="container">
            <div className="row">
              <div className="mobile-nav__menu-wrap base-4">
                <button className="mobile-nav__button mobile-nav__button--menu"><span className="mobile-nav__button-icon mobile-nav__button-icon--menu" /> Menu</button>
              </div>
              <div className="mobile-nav__call-wrap base-8">
                <a href="tel:8882317965" className="mobile-nav__button mobile-nav__button--call"><span className="mobile-nav__button-icon mobile-nav__button-icon--call">(888) 231-7965</span></a>
              </div>
            </div>
          </div>
        </div>

        <nav className="main-nav" itemScope itemType="https://schema.org/SiteNavigationElement">
          <div className="container">
            <div className="row">
              <ul className="main-nav__list">
                <li className="main-nav__item"><a className="main-nav__link" data-cy="home" href={baseUrl}>Home</a></li>
                <li className="main-nav__item main-nav__item--has-children">
                  <a className="main-nav__link" data-cy="inspections">Inspections</a>
                  <span className="main-nav__expander"><span>Expand</span></span>
                  <ul className="main-nav__list main-nav__list--child">
                    {inspectionNavItems.map((item) => (
                      <li className="main-nav__item main-nav__item--child" itemProp="name" key={item.label}><a className="main-nav__link main-nav__link--child" itemProp="url" href={url(item.href)}>{item.label}</a></li>
                    ))}
                  </ul>
                </li>
                <li className="main-nav__item" itemProp="name"><a className="main-nav__link" itemProp="url" id="menu_order_btn" data-cy="orders" href={url('/order/inspection-request')}>Order</a></li>
                <li className="main-nav__item" itemProp="name"><a className="main-nav__link" itemProp="url" data-cy="faqs" href={url('/faqs')}>FAQs</a></li>
                <li className="main-nav__item main-nav__item--has-children">
                  <a className="main-nav__link" data-cy="corporate">Corporate</a>
                  <span className="main-nav__expander"><span>Expand</span></span>
                  <ul className="main-nav__list main-nav__list--child">
                    {corporateNavItems.map((item) => (
                      <li className="main-nav__item main-nav__item--child" itemProp="name" key={item.label}><a className="main-nav__link main-nav__link--child" itemProp="url" href={item.external ? item.href : url(item.href)}>{item.label}</a></li>
                    ))}
                  </ul>
                </li>
                <li className="main-nav__item" itemProp="name"><a className="main-nav__link" itemProp="url" data-cy="areas" href={url('/local')}>Areas</a></li>
                <li className="main-nav__item" itemProp="name"><a className="main-nav__link" data-cy="blog" href={url('/blog/')}>Blog</a></li>
                <li className="main-nav__item main-nav__item--has-children">
                  <a className="main-nav__link">Contact</a>
                  <span className="main-nav__expander"><span>Expand</span></span>
                  <ul className="main-nav__list main-nav__list--child">
                    <li className="main-nav__item main-nav__item--child"><a className="main-nav__link main-nav__link--child" href={url('/inspector-signup')}>Become an Inspector</a></li>
                    <li className="main-nav__item main-nav__item--child"><a className="main-nav__link main-nav__link--child" href={url('/corporate')}>Corporate</a></li>
                    <li className="main-nav__item main-nav__item--child"><a className="main-nav__link main-nav__link--child" href={url('/contact')}>Contact</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div id="sideload-middle">
        <div className="banner">
          <img src={url('/zetr_local/assets/images/banner.v3.jpg')} className="banner__image" alt="banner" />
          <div className="container banner__container">
            <div className="banner__row row">
              <div className="banner__form contact-form">
                <div className="contact-form__text-wrap">
                  <p className="contact-form__head">Don&apos;t buy a lemon<span className="trade_mark">™</span></p>
                  <p className="contact-form__text">Get your pre-purchase used car inspection today with&nbsp;Lemon&nbsp;Squad<span className="trade_mark_min">™</span>.<br />We&apos;re here to prevent you from buying a lemon.</p>
                </div>
                <div id="E9898">
                  <a className="btn" data-cy="order-inspection" href={url('/order/inspection-request')}>Order Inspection</a>
                  <a href="#process"><img src={url('/zetr_local/assets/images/why-choose-us-z.jpg')} alt="Why Choose Us" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="coverage-cta">
          <a className="coverage-cta__wrapper base-12 med-4" href={url('/remoteinspections')}>
            <h2 className="section-sub-head">INSTANT&nbsp;INSPECTIONS, BUILT&nbsp;FOR&nbsp;THE MOMENT&nbsp;YOU&nbsp;NEED&nbsp;THEM.</h2>
            <p className="coverage-cta__text">Lemon Squad Live is designed for that high-pressure moment at the dealership or curb. Launch a session in minutes and get real-time expert help.</p>
            <img alt="Cell Phone Showing Live call with car savvy trained inspector." src={url('/images/ls-live-phone-call-t.png')} className="coverage-cta__phone" />
          </a>
          <a className="coverage-cta__wrapper base-12 med-4" href={url('/local')}>
            <h2 className="section-sub-head">We cover the entire USA</h2>
            <p className="coverage-cta__text">No matter where you live—or where your new car is—we have an inspector in your area ready to take a look! We even cover Alaska and Hawaii.</p>
            <div className="coverage-cta__map-icon"><img className="coverage-cta__image" alt="We cover the entire USA" src={url('/zetr_local/assets/images/usa-map.png')} /></div>
          </a>
          <a className="coverage-cta__wrapper base-12 med-4" href={url('/electric')}>
            <h2 className="section-sub-head">EVS ARE DIFFERENT. INSPECT THEM DIFFERENTLY</h2>
            <p className="coverage-cta__text">We inspect EVs like Tesla, Rivian, Lucid, Mach-E, IONIQ 5, Kia EV6, and more - checking for system alerts, charging faults, and battery-related red flags a standard mechanic (and a standard test drive) will miss.</p>
            <span className="coverage-cta__ev">EV</span>
          </a>
        </section>

        <section className="process" id="process">
          <div className="container">
            <div className="row">
              <h1 className="section-header section-header--white">What is the Inspection Process?</h1>
              <div className="process__step process__step--first">
                <div className="process__number-wrap"><span className="process__number">1</span></div>
                <div className="section__text-wrap base-12 sml-6">
                  <h2 className="section-sub-head section-sub-head--white">Order Inspection</h2>
                  <p className="process__text process__text--one">Place an order for a vehicle inspection through the site or by phone.</p>
                </div>
                <div className="process__buttons base-12 sml-6">
                  <a className="btn btn--order" data-cy="order-inspection2" href={url('/order/inspection-request')}>Order Online</a>
                  <a className="btn btn--call" data-cy="call-center" href="tel:8882317965">(888) 231-7965</a>
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
                <p className="process__text">The inspector will upload the report to us, and after an intricate error checking and reviewal process, you&apos;ll receive notification when your report is ready to login and view. You&apos;ll be notified the instant the report is ready to login and view.</p>
              </div>
            </div>
          </div>
          <div className="process__image-wrap"><img className="process__image" src={url('/zetr_local/assets/images/red-car.png')} alt="red car" /></div>
        </section>

        <section className="vehicle-type" id="pricing_tables">
          <div className="vehicle-type__header-wrap"><h1 className="section-header">Mobile Pre-Purchase Used Car Inspections</h1></div>
          <div className="container"><div className="row"><div className="vehicle-type__nav" />
            <div className="vehicle-type__owl owl-carousel">
              {inspectionPlans.map((plan) => (
                <div className="vehicle-type__wrapper" key={plan.name}>
                  <div className="vehicle-type__pricing">
                    <h2 className={`vehicle-type__header ${plan.headerClass}`}>{plan.name}</h2>
                    <div className="vehicle-type__price"><span className="money-sale-formatter sale-false" data-price={plan.price}>{plan.price}</span></div>
                    <div className="vehicle-type__pricing-body">
                      <ul className="vehicle-type__list">{plan.items.map((item) => <li className="vehicle-type__item" key={item}>{item}</li>)}</ul>
                    </div>
                    <div className="vehicle-type__cta">
                      <a className="vehicle-type__btn vehicle-type__btn--report" data-cy={plan.sampleCy} href={url(plan.report)}>Sample Report</a>
                      <a className="vehicle-type__btn" data-cy={plan.orderCy} href={url('/order/inspection-request')}>Order Inspection</a>
                    </div>
                  </div>
                </div>
              ))}
              <div className="vehicle-type__wrapper">
                <div className="vehicle-type__pricing">
                  <div className="rvcommon">
                    <h2 className="vehicle-type__header vehicle-type__header--rv rv_icon">RV<span className="newrvtype"><a className="rvtype motorhomes active">Motorhomes</a><a className="rvtype towable">Towables</a></span></h2>
                  </div>
                  <div className="vehicle-type__price newrvprice"><span className="money-sale-formatter sale-false" data-price="$449">$449</span></div>
                  <div className="vehicle-type__pricing-body newrvdesc" id="div_motorhomes"><ul className="vehicle-type__list">{rvItems.map((item) => <li className="vehicle-type__item" key={item}>{item}</li>)}</ul></div>
                  <div className="vehicle-type__cta"><a className="vehicle-type__btn vehicle-type__btn--report newrvbtn" data-cy="sample-report6" href={url('/sample/rv')}>Sample Report</a><a className="vehicle-type__btn newrvbtn" data-cy="order-inspection8" href={url('/order/inspection-request?source=motorhomes')}>Order Inspection</a></div>
                </div>
              </div>
            </div>
          </div></div>
        </section>

        <section className="add-ons">
          <h1 className="section-header section-header--add-ons">Add-ons to your Vehicle Inspection</h1>
          <div className="add-ons__text-wrap base-12 med-4">
            <h2 className="section-sub-head">CARFAX Vehicle History Report</h2>
            <p className="section-text">Millions of consumers rely on CARFAX Reports every day to help them decide whether or not to buy a used car. Each report contains information about whether the car in question has been in an accident, has any open recalls, previous owners, service history and much, much more. Available for all cars with a VIN (1982 and newer).</p>
            <p className="add-ons__price"><span className="money-sale-formatter sale-false" data-price="$34.99">$34.99</span></p>
          </div>
          <div className="add-ons__text-wrap base-12 med-4">
            <h2 className="section-sub-head">Verbal Vehicle Assessment Report</h2>
            <p className="section-text">Receive a phone call when you receive your report from one of our in house professional staff members. To help you gain a greater understanding of your report, we will explain your report in detail to make sure you have a complete understanding of the vehicle.</p>
            <p className="add-ons__price"><span className="money-sale-formatter sale-false" data-price="$49.99">$49.99</span></p>
          </div>
        </section>

        <div className="cta">
          <div className="cta__wrapper owl-carousel">
            {benefits.map(([icon, firstLine, secondLine]) => (
              <div className="cta__wrap" key={icon}>
                <div className="cta__circle"><span className={`cta__icon cta__icon--${icon}`} /></div>
                <p className="cta__text">{firstLine}<br />{secondLine}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="video-reviews">
          <div className="container container--wide"><div className="row">
            <div className="base-12 med-4">
              <div className="video-frame"><iframe className="cta-video__vid" src="https://www.youtube.com/embed/_C6O564UdVM?rel=0" allowFullScreen title="How Lemon Squad inspections work" /></div>
            </div>
            <div className="reviews base-12 med-8">
              <div className="callout plates-box" id="reviews-callout">
                <h3 className="reviews__head">Customer Reviews<span className="reviews__nav" /></h3>
                <div className="orbit" role="region" aria-label="Customer Reviews">
                  <ul className="reviews__wrap reviews__owl owl-carousel">
                    {reviews.map(([name, text]) => (
                      <li className="section-text" key={name}>
                        <ul className="reviews__stars"><li className="icon-star" /><li className="icon-star" /><li className="icon-star" /><li className="icon-star" /><li className="icon-star" /></ul>
                        {text} <a href={url('/customer-reviews')}>(Read More)</a>
                        <span className="section-text section-text--name">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div></div>
        </section>

        <section className="faq">
          <div className="faq__wrapper base-12 med-6">
            <div className="faq__word-wrap">
              <h1 className="faq__head">Frequently Asked Questions</h1>
              <p className="faq__question js-accordion">How soon after I place my order will I get my report?</p>
              <p className="faq__answer js-accordion-show">Inspections are typically completed within two business days, depending on the inspector&apos;s schedule, the seller&apos;s schedule, and the weather. Reports are usually uploaded the following morning that the inspection is done. Inspections that are completed on Friday will have the report reviewed on Saturday morning. We do our best to complete inspections by the next business day as long as the seller makes the car available for review and the inspection is ordered early enough the day before. Occasionally, the seller&apos;s schedule, the inspector&apos;s schedule or the weather may cause a delay. Please note we cannot guarantee a date of an inspection due to factors outside our control.</p>
              <p className="faq__question js-accordion">What happens if they sell the vehicle I ordered an inspection on?</p>
              <p className="faq__answer js-accordion-show">If the vehicle sells before we get there, we will put your order on hold while you look for another vehicle. When you find another vehicle you&apos;d like us to inspect, we&apos;ll transfer the details and send our inspector right away!</p>
              <p className="faq__question js-accordion">Can I use an AI assistant to help place an order?</p>
              <p className="faq__answer js-accordion-show"><b>Yes</b>. You can provide your vehicle and contact details to an AI assistant, and it can generate a clickable link that pre-populates our order form.</p>
              <p className="faq__question js-accordion">I bought a plane ticket/arranged for transportation. How quickly can you do the inspection?</p>
              <p className="faq__answer js-accordion-show">Please don&apos;t purchase a plane ticket or arrange for transportation until you have your report in your hand. Things can change unexpectedly due to circumstances outside of our control.</p>
            </div>
          </div>
          <img className="faq__image base-12 med-6" src={url('/zetr_local/assets/images/mechanic.png')} alt="mechanic" />
        </section>
      </div>

      <footer>
        <section className="logo-carousel"><div className="container"><div className="row"><div className="logo-carousel__wrapper owl-carousel"><div className="logo-carousel__logo"><img className="logo-carousel__logo-image" src={url('/images/carfax_logo.svg')} alt="CARFAX Vehicle History Report" /></div></div></div></div></section>
        <section className="cta-strip cta-strip--order"><div className="container"><div className="row"><div className="base-12"><p className="cta-strip__text cta-strip__text--order">Don’t spend your hard-earned money on a lemon.</p><a className="btn btn--cta-order" href={url('/order/inspection-request')}>Order Inspection</a></div></div></div></section>
        <section className="footer">
          <div className="footer__contact base-12 med-5"><img src={url('/images/layout/logo_primary.svg')} className="site-logo__image footer__logo" alt="Lemon Squad - Nationwide Used Car Inspection" /><p><a href={url('/inspector-signup')} className="btn">Become an Inspector</a></p></div>
          <div className="base-12 med-7"><div className="footer__text-wrap"><p className="section-sub-head">Contact</p><p className="footer__text footer__text--bold">Phone:<a className="footer__text footer__text--link" data-cy="footer-contact-number" href="tel:8882317965"> (888) 231-7965</a></p><p className="footer__text">Orders may be placed online 24/7</p></div></div>
        </section>
        <section className="footer-lower"><div className="container"><div className="row"><p className="footer-lower__text base-12 med-6">2026 © ALL Rights Reserved. <a className="footer-lower__text footer-lower__text--link-left" href={url('/privacy')}>Privacy Policy</a> | <a className="footer-lower__text footer-lower__text--linkleft" href={url('/terms')}>Terms of Service.</a></p></div></div></section>
      </footer>
    </>
  )
}

export default App
