const Header = () => {
  return (
    <header className="main-header">
      <nav className="mini-nav hide-for-small-only">
        <div className="container">
          <ul className="mini-nav__list">
            <li id="nav-645" className="mini-nav__item">
              <a href="https://lemonsquad.com/inspector-signup" className="mini-nav__link">Become an Inspector</a>
            </li>
            <li id="nav-646" className="mini-nav__item">
              <a href="https://lemonsquad.com/order/inspection-request"
                className="mini-nav__link mini-nav__link--standout">Order an Inspection</a>
            </li>
            <li id="nav-649" className="mini-nav__item">
              <a href="https://lemonsquad.com/login" className="mini-nav__link">Login</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-header__content">
        <div className="container">
          <div className="row">
            <div className="site-logo base-12 med-6">
              <a data-cy="logo" href="https://lemonsquad.com/">
                <img src="https://lemonsquad.com/images/layout/logo_primary.svg"
                  className="site-logo__image"
                  alt="Lemon Squad - Nationwide Used Car Inspection" />
              </a>
            </div>
            <div className="main-header__details med-6">
              <p className="main-header__times"></p>
              <a className="main-header__number" data-cy="contact-number"
                href="tel:8882317965">
                (888) 231-7965</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-nav">
        <div className="container">
          <div className="row">
            <div className="mobile-nav__menu-wrap base-4">
              <button className="mobile-nav__button mobile-nav__button--menu js-open-menu">
                <span className="mobile-nav__button-icon mobile-nav__button-icon--menu"><span
                  className="hidden">Open</span></span> Menu
              </button>
            </div>
            <div className="mobile-nav__call-wrap base-8">
              <a href="tel:8882317965"
                className="mobile-nav__button mobile-nav__button--call">
                <span
                  className="mobile-nav__button-icon mobile-nav__button-icon--call">(888) 231-7965</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-nav" itemScope itemType="https://schema.org/SiteNavigationElement">
        <div className="container">
          <div className="row">
            <button className="main-nav__close js-close-menu"><span className="hidden">Close</span></button>
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="main-nav__link" data-cy="home"
                href="https://lemonsquad.com/">Home</a></li>
              <li className="main-nav__item main-nav__item--has-children">
                <a className="main-nav__link" data-cy="inspections" style={{ cursor: 'pointer' }}>Inspections</a>
                <span className="main-nav__expander"><span>Expand</span></span>
                <ul className="main-nav__list main-nav__list--child ">
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="compare"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/compare">Compare</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="standard"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/standard">Standard</a>
                  </li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="electric"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/electric">Electric</a>
                  </li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a itemProp="url"
                    data-cy="vintage-classic" className="main-nav__link main-nav__link--child"
                    href="https://lemonsquad.com/used-car-inspections/classic">Vintage &amp;
                    Classic</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="exotic"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/exotic">Exotic</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="remoteinspections"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/remoteinspections">Live</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="rv"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/rv">RV</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="commercial"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/commercial-vehicle">Commercial</a>
                  </li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a data-cy="motorcycle"
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    href="https://lemonsquad.com/used-car-inspections/motorcycle">Motorcycle</a>
                  </li>
                  <li className="main-nav__item main-nav__item--child">
                    <a className="main-nav__link main-nav__link--child" data-cy="popular-inspection">Popular
                      Inspections</a>
                    <ul className="main-nav__list main-nav__list--grandchild" data-cy="inspection-dropdown">
                      <li className="main-nav__item main-nav__item--grandchild" itemProp="name"><a
                        className="main-nav__link main-nav__link--grandchild" itemProp="url"
                        data-cy="bmw"
                        href="https://lemonsquad.com/used-car-inspections/bmw">BMW</a></li>
                      <li className="main-nav__item main-nav__item--grandchild" itemProp="name"><a
                        className="main-nav__link main-nav__link--grandchild" itemProp="url"
                        data-cy="mercedes"
                        href="https://lemonsquad.com/used-car-inspections/mercedes-benz">Mercedes</a>
                      </li>
                      <li className="main-nav__item main-nav__item--grandchild" itemProp="name"><a
                        className="main-nav__link main-nav__link--grandchild" itemProp="url"
                        data-cy="porsche"
                        href="https://lemonsquad.com/used-car-inspections/porsche">Porsche</a>
                      </li>
                    </ul>
                  </li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url" data-cy="car-value"
                    href="https://lemonsquad.com/car-value">Determining Car Value</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url" data-cy="add-ons"
                    href="https://lemonsquad.com/used-car-inspections/add-ons">Add-Ons</a></li>
                </ul>
              </li>
              <li className="main-nav__item" itemProp="name"><a className="main-nav__link" itemProp="url"
                id="menu_order_btn" data-cy="orders"
                href="https://lemonsquad.com/order/inspection-request">Order</a></li>
              <li className="main-nav__item" itemProp="name"><a className="main-nav__link" itemProp="url"
                data-cy="faqs" href="https://lemonsquad.com/faqs">FAQs</a></li>
              <li className="main-nav__item main-nav__item--has-children">
                <a className="main-nav__link" data-cy="corporate" style={{ cursor: 'pointer' }}>Corporate</a>
                <span className="main-nav__expander"><span>Expand</span></span>
                <ul className="main-nav__list main-nav__list--child " data-cy="corporate-dropdown">
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    data-cy="auction-inspection"
                    href="https://lemonsquad.com/used-car-inspections/auction">Auction
                    Inspection</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    data-cy="marketplace-inspection"
                    href="https://lemonsquad.com/used-car-inspections/marketplace">Marketplace
                    Inspection</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    data-cy="mechanical-inspection"
                    href="https://lemonsquad.com/used-car-inspections/mechanical">Mechanical
                    Inspection</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    data-cy="pre-warranty-inspection"
                    href="https://lemonsquad.com/used-car-inspections/prewarranty">Pre-Warranty
                    Inspection</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    data-cy="prepaid-maintenance" target="wrenchtotalcare"
                    href="https://www.wrenchtotalcare.com/">Prepaid Maintenance &amp;<br />
                    Warranty Solutions</a></li>
                </ul>
              </li>
              <li className="main-nav__item" itemProp="name"><a className="main-nav__link" itemProp="url"
                data-cy="areas" href="https://lemonsquad.com/local">Areas</a></li>
              <li className="main-nav__item" itemProp="name"><a className="main-nav__link" data-cy="blog"
                href="https://lemonsquad.com/blog/">Blog</a></li>
              <li className="main-nav__item hide-for-large" itemProp="name"><a className="main-nav__link"
                data-cy="login" href="https://lemonsquad.com/login">Login</a></li>
              <li className="main-nav__item main-nav__item--has-children">
                <a className="main-nav__link" style={{ cursor: 'pointer' }}>Contact</a>
                <span className="main-nav__expander"><span>Expand</span></span>
                <ul className="main-nav__list main-nav__list--child">
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url"
                    data-cy="become-an-inspector"
                    href="https://lemonsquad.com/inspector-signup">Become an Inspector</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url" data-cy="corporate"
                    href="https://lemonsquad.com/corporate">Corporate</a></li>
                  <li className="main-nav__item main-nav__item--child" itemProp="name"><a
                    className="main-nav__link main-nav__link--child" itemProp="url" data-cy="contact"
                    href="https://lemonsquad.com/contact">Contact</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
