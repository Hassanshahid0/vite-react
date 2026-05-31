import React from 'react'
import logo1 from '../assets/logo1.png'

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <nav className="mini-nav hide-for-small-only">
        <div className="container">
          <ul className="mini-nav__list">
            <li className="mini-nav__item">
              <a href="/" className="mini-nav__link">Home</a>
            </li>
            <li className="mini-nav__item">
              <a href="/how-it-work" className="mini-nav__link">How It Works</a>
            </li>
            <li className="mini-nav__item">
              <a href="/packages" className="mini-nav__link">Packages</a>
            </li>
            <li className="mini-nav__item">
              <a href="/order-now" className="mini-nav__link mini-nav__link--standout">Order an Inspection</a>
            </li>
            <li className="mini-nav__item">
              <a href="/faq" className="mini-nav__link">FAQ</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-header__content">
        <div className="container">
          <div className="row">
            <div className="site-logo base-12 med-6">
              <a data-cy="logo" href="/">
                <img src={logo1} className="site-logo__image" alt="Carz Squad - Pre Car Inspection" />
              </a>
            </div>
            <div className="main-header__details med-6">
              <a className="main-header__number" data-cy="contact-number" href="https://wa.me/18578228188" target="_blank" rel="noopener noreferrer">
                +18578228188
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-nav hide-for-medium">
        <div className="container">
          <div className="row">
            <button className="main-nav__close js-close-menu">
              <span className="hidden">Close</span>
            </button>
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a href="/" className="main-nav__link">Home</a>
              </li>
              <li className="main-nav__item">
                <a href="/how-it-work" className="main-nav__link">How It Works</a>
              </li>
              <li className="main-nav__item">
                <a href="/packages" className="main-nav__link">Packages</a>
              </li>
              <li className="main-nav__item">
                <a href="/order-now" className="main-nav__link">Order Now</a>
              </li>
              <li className="main-nav__item">
                <a href="/faq" className="main-nav__link">FAQ</a>
              </li>
              <li className="main-nav__item hide-for-medium">
                <button className="main-nav__link js-close-menu" style={{ width: '100%', marginTop: '10px', background: 'rgba(220,38,38,.1)', borderColor: 'rgba(220,38,38,.2)', color: '#dc2626 !important' }}>
                  Close Menu
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mobile-nav hide-for-medium">
        <div className="container">
          <div className="row">
            <div className="mobile-nav__menu-wrap base-4">
              <button className="mobile-nav__button mobile-nav__button--menu js-open-menu">
                <span className="mobile-nav__button-icon mobile-nav__button-icon--menu">
                  <span className="hidden">Open</span>
                </span>
                Menu
              </button>
            </div>
            <div className="mobile-nav__call-wrap base-8">
              <a href="https://wa.me/18578228188" className="mobile-nav__button mobile-nav__button--call" target="_blank" rel="noopener noreferrer">
                <span className="mobile-nav__button-icon mobile-nav__button-icon--call">+18578228188</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
