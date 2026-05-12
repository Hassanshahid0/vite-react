import './App.css'

const plans = [
  {
    name: 'Exotic',
    price: '$286',
    accent: 'For higher end vehicles',
    features: [
      'Computer diagnosis of engine, transmission, ABS, and air-bag',
      'Comprehensive mechanical inspection of complete drive-train',
      'Inspection of steering, suspension, and brakes',
      'Check for accident damage and flood damage',
      'Road test and more than 25 pictures',
    ],
  },
  {
    name: 'Standard',
    price: '$220',
    accent: 'Our best-seller',
    featured: true,
    features: [
      'For cars newer than 20 years old',
      'Perfect for most everyday vehicles',
      'Computer diagnosis of major systems',
      'Road test, fluid levels, and photos',
      'Type: Pre-purchase used car inspection',
    ],
  },
  {
    name: 'Classic',
    price: '$330',
    accent: 'For cars 20 years or older',
    features: [
      'Engine and transmission inspection',
      'Complete drive-line inspection',
      'Rust, bondo, and prior hidden damage checks',
      'Verify engine and transmission numbers',
      'More than 40 pictures',
    ],
  },
  {
    name: 'Commercial',
    price: '$365',
    accent: 'For all commercial vehicles',
    features: [
      'Complete drive-train inspection',
      'Commercial components condition review',
      'Steering, suspension, and brake checks',
      'Accident and flood damage review',
      'Road test with seller representative',
    ],
  },
  {
    name: 'Motorcycle',
    price: '$210',
    accent: 'For all motorcycles',
    features: [
      'Engine and transmission inspection',
      'Complete drive-line inspection',
      'Body repair and hidden damage checks',
      'Verify identifying numbers',
      'More than 25 pictures',
    ],
  },
  {
    name: 'RV',
    price: '$449',
    accent: 'Motorhomes and towables',
    features: [
      '120 volt systems and appliances',
      'Generator and LP gas systems check',
      'Fresh water and drainage check',
      'Slide-outs and leveling jacks',
      'Road test and more than 40 pictures',
    ],
  },
]

const process = [
  {
    title: 'Order Inspection',
    text: 'Place an order for a vehicle inspection online or by phone. Lemon Squad starts working immediately to protect your purchase.',
  },
  {
    title: 'Our Inspector Inspects',
    text: 'A local expert contacts the seller, schedules the appointment, and goes directly to the vehicle for the inspection.',
  },
  {
    title: 'Receive your report',
    text: 'After review, you receive a detailed online report with photos, findings, and clear notes before you buy.',
  },
]

const benefits = [
  'Always get a person on the phone',
  'No hidden fees',
  'Best turn around time in the industry',
  'Easy to understand reports',
  'Qualified experienced inspectors',
  'Largest company in the industry',
]

const reviews = [
  {
    name: 'Farid A.',
    text: 'This is perfect. It is exactly what I needed. A detailed report like this is why I will be buying with confidence.',
  },
  {
    name: 'Farouk S.',
    text: 'Great service. They caught a major repair issue that I would never have known about. Very thorough and highly recommended.',
  },
  {
    name: 'Gary W.',
    text: 'Thank you for inspecting the car and noting your concerns. I appreciate the detail and will use this service again.',
  },
]

function App() {
  return (
    <main className="site-shell">
      <div className="top-strip">
        <a href="#inspector">Become an Inspector</a>
        <a href="#order">Order an Inspection</a>
        <a href="#login">Login</a>
      </div>

      <header className="header">
        <a className="brand" href="#home" aria-label="Lemon Squad home">
          <span className="lemon-icon">LS</span>
          <span>
            <strong>Lemon Squad</strong>
            <small>Nationwide Used Car Inspection</small>
          </span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#process">Inspections</a>
          <a href="#order">Order</a>
          <a href="#faq">FAQs</a>
          <a href="#areas">Areas</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="phone" href="tel:18882317965">(888) 231-7965</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Nationwide mobile inspections</p>
          <h1>Don&apos;t buy a lemon™</h1>
          <p>
            Get your pre-purchase used car inspection today with Lemon Squad™.
            We&apos;re here to prevent you from buying a lemon.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#order">Order Inspection</a>
            <a className="button secondary" href="#process">How it works</a>
          </div>
        </div>
        <div className="hero-card" aria-label="Inspection promise">
          <span>200+</span>
          <strong>Inspection points</strong>
          <p>Photos, road test, system checks, and a report you can understand.</p>
        </div>
      </section>

      <section className="promo-grid" id="areas" aria-label="Featured services">
        <article className="promo dark">
          <span>Live</span>
          <h2>Instant inspections, built for the moment you need them.</h2>
          <p>Launch a session in minutes and get real-time expert help.</p>
        </article>
        <article className="promo yellow">
          <span>USA coverage</span>
          <h2>We cover the entire USA</h2>
          <p>Inspectors are ready nationwide, including Alaska and Hawaii.</p>
        </article>
        <article className="promo dark car">
          <span>Electric</span>
          <h2>EVs are different. Inspect them differently.</h2>
          <p>We check alerts, charging faults, and battery-related red flags.</p>
        </article>
      </section>

      <section className="process" id="process">
        <div className="section-heading">
          <p className="eyebrow">Simple process</p>
          <h2>What is the Inspection Process?</h2>
        </div>
        <div className="process-grid">
          {process.map((item, index) => (
            <article className="process-card" key={item.title}>
              <span className="step">{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {index === 0 && <a href="#order">Order Online</a>}
            </article>
          ))}
        </div>
      </section>

      <section className="pricing" id="order">
        <div className="red-car" aria-hidden="true" />
        <div className="section-heading">
          <p className="eyebrow">Mobile pre-purchase used car inspections</p>
          <h2>Choose the right inspection</h2>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`plan ${plan.featured ? 'featured' : ''}`} key={plan.name}>
              {plan.featured && <span className="badge">Best Seller</span>}
              <h3>{plan.name}</h3>
              <p className="plan-accent">{plan.accent}</p>
              <strong className="price">{plan.price}</strong>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="plan-actions">
                <a href="#sample">Sample Report</a>
                <a className="order-link" href="#order">Order Inspection</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="addons">
        <div className="section-heading">
          <p className="eyebrow">Extra confidence</p>
          <h2>Add-ons to your Vehicle Inspection</h2>
        </div>
        <div className="addons-grid">
          <article>
            <h3>CARFAX Vehicle History Report</h3>
            <p>Accident history, recalls, owners, service history, and more for VIN-supported vehicles.</p>
            <strong>$34.99</strong>
          </article>
          <article>
            <h3>Verbal Vehicle Assessment Report</h3>
            <p>Receive a phone call from a professional staff member to walk you through the report in detail.</p>
            <strong>$49.99</strong>
          </article>
        </div>
      </section>

      <section className="benefits" aria-label="Company benefits">
        {benefits.map((benefit) => (
          <div key={benefit}>
            <span>✓</span>
            <p>{benefit}</p>
          </div>
        ))}
      </section>

      <section className="reviews">
        <div className="section-heading">
          <p className="eyebrow">Customer Reviews</p>
          <h2>Drivers trust Lemon Squad before they buy</h2>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.name}>
              <div className="stars">★★★★★</div>
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="faq" id="faq">
        <div>
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2>How soon after I place my order will I get my report?</h2>
        </div>
        <p>
          Inspections are typically completed within two business days depending on the inspector&apos;s schedule,
          the seller&apos;s schedule, and weather. Reports are reviewed and uploaded as soon as possible.
        </p>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">Protect your purchase</p>
          <h2>Don’t spend your hard-earned money on a lemon.</h2>
        </div>
        <a className="button primary" href="#order">Order Inspection</a>
      </section>

      <footer className="footer" id="contact">
        <a className="brand" href="#home">
          <span className="lemon-icon">LS</span>
          <span>
            <strong>Lemon Squad</strong>
            <small>Nationwide Used Car Inspection</small>
          </span>
        </a>
        <div>
          <h3>Contact</h3>
          <p>Phone: (888) 231-7965</p>
          <p>Orders may be placed online 24/7</p>
        </div>
        <p>2026 © ALL Rights Reserved. Privacy Policy | Terms of Service.</p>
      </footer>
    </main>
  )
}

export default App
