import { useEffect, useMemo, useState } from 'react'
import homeHtmlRaw from '../txt.01.txt?raw'
import howItWorkHtmlRaw from '../txt.02?raw'
import logo1 from './assets/logo1.png'
import logo from './assets/logo.png'
import './App.css'

type CartItem = {
  id: string
  name: string
  price: number
}

function App() {
  const [locationKey, setLocationKey] = useState(() => `${window.location.pathname}${window.location.hash}`)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = window.localStorage.getItem('cs_cart')
      if (!raw) return []
      const parsed = JSON.parse(raw) as unknown
      if (!Array.isArray(parsed)) return []
      return parsed.filter(Boolean) as CartItem[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    const onPopState = () => setLocationKey(`${window.location.pathname}${window.location.hash}`)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('cs_cart', JSON.stringify(cart))
    } catch {
      return
    }
  }, [cart])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as Element | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (!href) return

      const lower = href.toLowerCase()
      if (
        lower.startsWith('http:') ||
        lower.startsWith('https:') ||
        lower.startsWith('mailto:') ||
        lower.startsWith('tel:') ||
        lower.startsWith('javascript:')
      ) {
        return
      }

      if (href.startsWith('/')) {
        event.preventDefault()
        window.history.pushState({}, '', href)
        setLocationKey(`${window.location.pathname}${window.location.hash}`)
        return
      }

      if (href.startsWith('#')) {
        event.preventDefault()
        window.history.pushState({}, '', `${window.location.pathname}${href}`)
        setLocationKey(`${window.location.pathname}${window.location.hash}`)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const addToCart = (item: CartItem) => {
      setCart((prev) => {
        const next = [...prev, item]
        return next
      })
    }

    const removeFromCart = (id: string) => {
      setCart((prev) => prev.filter((i) => i.id !== id))
    }

    const clearCart = () => setCart([])

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return

      const addBtn = target.closest?.('[data-cs-add-to-cart]') as HTMLElement | null
      if (addBtn) {
        const key = (addBtn.getAttribute('data-cs-add-to-cart') ?? '').toLowerCase()
        const packageMap: Record<string, { name: string; price: number }> = {
          standard: { name: 'Standard', price: 270 },
          classical: { name: 'Classical', price: 380 },
          classic: { name: 'Classical', price: 380 },
          exotic: { name: 'Exotic', price: 340 },
          commercial: { name: 'Commercial', price: 15 },
        }
        const pkg = packageMap[key]
        if (!pkg) return

        e.preventDefault()
        addToCart({ id: `${key}-${Date.now()}`, name: pkg.name, price: pkg.price })
        window.history.pushState({}, '', '/cart')
        setLocationKey(`${window.location.pathname}${window.location.hash}`)
        return
      }

      const removeBtn = target.closest?.('[data-cs-remove-from-cart]') as HTMLElement | null
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-cs-remove-from-cart') ?? ''
        if (!id) return
        e.preventDefault()
        removeFromCart(id)
        return
      }

      const clearBtn = target.closest?.('[data-cs-clear-cart]') as HTMLElement | null
      if (clearBtn) {
        e.preventDefault()
        clearCart()
        return
      }

      const paidBtn = target.closest?.('[data-cs-confirm-payment]') as HTMLElement | null
      if (paidBtn) {
        e.preventDefault()
        clearCart()
        window.alert('Payment submitted. Admin will confirm your transaction. Thank you for choosing CARZ SQUAD.')
        window.history.pushState({}, '', '/')
        setLocationKey(`${window.location.pathname}${window.location.hash}`)
        return
      }

      const openMenuBtn = target.closest('.js-open-menu, .mobile-nav__button--menu')
      if (openMenuBtn) {
        const nav = document.querySelector('nav.main-nav')
        if (nav) {
          nav.classList.add('trae-nav-open')
        }
        return
      }

      const closeMenuBtn = target.closest('.js-close-menu, .main-nav__link.js-close-menu')
      if (closeMenuBtn) {
        const nav = document.querySelector('nav.main-nav')
        if (nav) {
          nav.classList.remove('trae-nav-open')
        }
        return
      }
    }

    const onDocSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null
      if (!form) return
      if (form.id !== 'cs-checkout-form') return
      e.preventDefault()

      const data = new FormData(form)
      const payload: Record<string, string> = {}
      data.forEach((v, k) => {
        payload[k] = String(v)
      })
      try {
        window.localStorage.setItem('cs_checkout', JSON.stringify(payload))
      } catch {
        return
      }

      window.history.pushState({}, '', '/payment')
      setLocationKey(`${window.location.pathname}${window.location.hash}`)
    }

    document.addEventListener('click', onDocClick)
    document.addEventListener('submit', onDocSubmit)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('submit', onDocSubmit)
    }
  }, [])

  const pathname = useMemo(() => {
    const [path] = locationKey.split('#')
    return path || '/'
  }, [locationKey])

  const normalizedPathname = useMemo(() => {
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
    return pathname
  }, [pathname])

  const appHowItWorkPath = '/how-it-work'
  const appPackagesPath = '/packages'
  const appOrderNowPath = '/order-now'
  const appCartPath = '/cart'
  const appPaymentPath = '/payment'
  const appInspectionsPath = '/inspections'
  const appFaqPath = '/faq'
  const isHowItWorkPage = normalizedPathname === appHowItWorkPath || normalizedPathname === '/how-it-works'
  const isPackagesPage = normalizedPathname === appPackagesPath
  const isOrderNowPage = normalizedPathname === appOrderNowPath
  const isCartPage = normalizedPathname === appCartPath
  const isPaymentPage = normalizedPathname === appPaymentPath
  const isInspectionsPage = normalizedPathname === appInspectionsPath
  const isFaqPage = normalizedPathname === appFaqPath || normalizedPathname === '/faqs'
  const packagesPageHtmlRaw = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Packages | CARZ SQUAD</title>
  </head>
  <body class="production">
    <main>
      <section style="background:#dc2626;padding:56px 0;color:#fff">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <h1 class="section-header section-header--white" style="margin:0 0 10px">Inspection Packages</h1>
              <p class="section-text" style="max-width:900px;margin:0;opacity:.95">
                Choose the package that fits your vehicle. Add to cart and checkout in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style="padding:42px 0">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <div class="cs-packages">
                <div class="cs-card">
                  <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=60" class="cs-card__image" alt="Standard Inspection">
                  <div class="cs-card__head">
                    <h3 class="cs-card__title">Standard</h3>
                    <div class="cs-card__price">$270</div>
                  </div>
                  <ul class="cs-card__list">
                    <li>For cars newer than 20 years old</li>
                    <li>Perfect for most vehicles</li>
                    <li>Computer diagnosis of engine, transmission, ABS, and air-bag</li>
                    <li>Comprehensive mechanical inspection of complete drive-train</li>
                    <li>Inspection of the steering, suspension, and brakes</li>
                    <li>Check for previous accident damage and flood damage</li>
                    <li>Road test</li>
                    <li>Fluid levels check</li>
                    <li>More than 25 pictures</li>
                    <li>Type: Pre-purchase used car inspection</li>
                  </ul>
                  <a href="/cart" class="cs-package__btn" data-cs-add-to-cart="standard">Order Now</a>
                </div>

                <div class="cs-card">
                  <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=60" class="cs-card__image" alt="Classical Inspection">
                  <div class="cs-card__head">
                    <h3 class="cs-card__title">Classical</h3>
                    <div class="cs-card__price">$380</div>
                  </div>
                  <ul class="cs-card__list">
                    <li>For cars 20 years or older</li>
                    <li>Comprehensive mechanical inspection of the engine and transmission</li>
                    <li>Complete drive-line inspection</li>
                    <li>Inspection of the steering, suspension, and brakes</li>
                    <li>Check for previous accident damage and flood damage</li>
                    <li>Check for previous body repairs or prior hidden damage</li>
                    <li>Rust and bondo</li>
                    <li>Verify engine and transmission numbers</li>
                    <li>Road test</li>
                    <li>More than 40 pictures</li>
                    <li>Emphasis on age deterioration</li>
                    <li>Type: Pre-purchase used car inspection</li>
                  </ul>
                  <a href="/cart" class="cs-package__btn" data-cs-add-to-cart="classical">Order Now</a>
                </div>

                <div class="cs-card cs-card--featured">
                  <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60" class="cs-card__image" alt="Exotic Inspection">
                  <div class="cs-card__head">
                    <h3 class="cs-card__title">Exotic</h3>
                    <div class="cs-card__price">$340</div>
                  </div>
                  <ul class="cs-card__list">
                    <li>For higher end vehicles (e.g. Porsche, Bugatti, Lamborghini, etc)</li>
                    <li>Computer diagnosis of engine, transmission, ABS, and air-bag</li>
                    <li>Comprehensive mechanical inspection of complete drive-train</li>
                    <li>Inspection of the steering, suspension, and brakes</li>
                    <li>Check for previous accident damage and flood damage</li>
                    <li>Road test</li>
                    <li>Fluid levels check</li>
                    <li>More than 25 pictures</li>
                    <li>More care, more detail, more attention</li>
                    <li>Type: Pre-purchase used car inspection</li>
                  </ul>
                  <a href="/cart" class="cs-package__btn cs-package__btn--primary" data-cs-add-to-cart="exotic">Order Now</a>
                </div>

                <div class="cs-card">
                  <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=60" class="cs-card__image" alt="Commercial Inspection">
                  <div class="cs-card__head">
                    <h3 class="cs-card__title">Commercial</h3>
                    <div class="cs-card__price">$15</div>
                  </div>
                  <ul class="cs-card__list">
                    <li>For work trucks, vans, and commercial vehicles</li>
                    <li>Computer diagnosis (where supported)</li>
                    <li>Comprehensive drive-train inspection</li>
                    <li>Steering, suspension, and brake inspection</li>
                    <li>Check for accident and flood damage indicators</li>
                    <li>Road test (when available)</li>
                    <li>Fluid leak and undercarriage inspection</li>
                    <li>Photo documentation + clear report</li>
                    <li>Type: Pre-purchase used car inspection</li>
                  </ul>
                  <a href="/cart" class="cs-package__btn" data-cs-add-to-cart="commercial">Order Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`

  const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + (Number.isFinite(i.price) ? i.price : 0), 0), [cart])
  const cartHtmlItems = cart.length
    ? cart
        .map(
          (i) => `
        <div class="cs-cart__item">
          <div class="cs-cart__meta">
            <div class="cs-cart__name">${i.name}</div>
            <div class="cs-cart__price">$${i.price}</div>
          </div>
          <button class="cs-cart__remove" type="button" data-cs-remove-from-cart="${i.id}">Remove</button>
        </div>
      `,
        )
        .join('')
    : ''

  const cartPageHtmlRaw = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cart | CARZ SQUAD</title>
  </head>
  <body class="production">
    <main>
      <section style="background:#111827;padding:42px 0;color:#fff">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <h1 class="section-header section-header--white" style="margin:0 0 10px">Your Cart</h1>
              <p class="section-text" style="margin:0;opacity:.9">Review your selected package(s) and continue to checkout.</p>
            </div>
          </div>
        </div>
      </section>

      <section style="padding:42px 0">
        <div class="container">
          <div class="row">
            <div class="base-12">
              ${
                cart.length
                  ? `
              <div class="cs-cart">
                ${cartHtmlItems}
                <div class="cs-cart__summary">
                  <div class="cs-cart__total">Total: <span>$${cartTotal}</span></div>
                  <div class="cs-cart__actions">
                    <a href="/order-now" class="cs-package__btn cs-package__btn--primary">Go to Order Now</a>
                    <button type="button" class="cs-package__btn" data-cs-clear-cart>Clear Cart</button>
                  </div>
                </div>
              </div>
              `
                  : `
              <div class="cs-empty">
                <h3 style="margin:0 0 10px">Your cart is empty</h3>
                <p style="margin:0 0 18px;opacity:.85">Choose a package to get started.</p>
                <a href="/packages" class="cs-package__btn cs-package__btn--primary">View Packages</a>
              </div>
              `
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`

  const orderNowPageHtmlRaw = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Order Now | CARZ SQUAD</title>
  </head>
  <body class="production">
    <main>
      <section style="background:#dc2626;padding:56px 0;color:#fff">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <h1 class="section-header section-header--white" style="margin:0 0 10px">Order Now</h1>
              <p class="section-text" style="max-width:900px;margin:0;opacity:.95">
                Fill the details and proceed to checkout. Your selected package is in the cart.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style="padding:42px 0">
        <div class="container">
          <div class="row">
            <div class="base-12 med-6">
              <div class="cs-panel">
                <h3 class="cs-panel__title">Order Details</h3>
                <form id="cs-checkout-form">
                  <div class="cs-field">
                    <label class="cs-label" for="full_name">Full Name</label>
                    <input class="cs-input" id="full_name" name="full_name" required />
                  </div>
                  <div class="cs-field">
                    <label class="cs-label" for="email">Email</label>
                    <input class="cs-input" id="email" name="email" type="email" required />
                  </div>
                  <div class="cs-field">
                    <label class="cs-label" for="phone">Phone</label>
                    <input class="cs-input" id="phone" name="phone" required />
                  </div>
                  <div class="cs-field">
                    <label class="cs-label" for="vehicle">Vehicle (Year / Make / Model)</label>
                    <input class="cs-input" id="vehicle" name="vehicle" required />
                  </div>
                  <div class="cs-field">
                    <label class="cs-label" for="vin">VIN (Optional)</label>
                    <input class="cs-input" id="vin" name="vin" />
                  </div>
                  <div class="cs-field">
                    <label class="cs-label" for="location">Vehicle Location (City, State)</label>
                    <input class="cs-input" id="location" name="location" required />
                  </div>
                  <div class="cs-field">
                    <label class="cs-label" for="notes">Notes</label>
                    <textarea class="cs-textarea" id="notes" name="notes"></textarea>
                  </div>

                  <input type="submit" data-type="button" name="add_to_cart" id="add_to_cart" value="Proceed to checkout" class="btn btn-secondary btn-xl" placeholder="" autocomplete="off" />
                </form>
              </div>
            </div>

            <div class="base-12 med-6">
              <div class="cs-panel">
                <h3 class="cs-panel__title">Cart Summary</h3>
                ${
                  cart.length
                    ? `
                <div class="cs-cart cs-cart--compact">
                  ${cartHtmlItems}
                  <div class="cs-cart__total" style="margin-top:14px">Total: <span>$${cartTotal}</span></div>
                  <div class="cs-cart__actions" style="margin-top:12px">
                    <a href="/cart" class="cs-package__btn">Edit Cart</a>
                  </div>
                </div>
                `
                    : `
                <div class="cs-empty">
                  <p style="margin:0 0 18px;opacity:.85">Your cart is empty.</p>
                  <a href="/packages" class="cs-package__btn cs-package__btn--primary">Choose a Package</a>
                </div>
                `
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`

  const paymentPageHtmlRaw = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Payment | CARZ SQUAD</title>
  </head>
  <body class="production">
    <main>
      <section style="background:#111827;padding:56px 0;color:#fff">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <h1 class="section-header section-header--white" style="margin:0 0 10px">Transaction Payment</h1>
              <p class="section-text" style="max-width:900px;margin:0;opacity:.95">
                Total payable: <strong>$${cartTotal}</strong>. Choose a payment method and submit your transaction details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style="padding:42px 0">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <div class="cs-panel" style="max-width:980px;margin:0 auto">
                <h3 class="cs-panel__title">Select Payment Method</h3>
                <div class="cs-pay">
                  <div class="cs-pay__item" data-pm="zelle">
                    <div class="cs-pay__title">Zelle / Bank Transfer</div>
                  </div>
                  <div class="cs-pay__item" data-pm="card">
                    <div class="cs-pay__title">Credit / Debit Card</div>
                  </div>
                  <div class="cs-pay__item" data-pm="wise">
                    <div class="cs-pay__title">Wise</div>
                  </div>
                  <div class="cs-pay__item" data-pm="jazzcash">
                    <div class="cs-pay__title">JazzCash</div>
                  </div>
                  <div class="cs-pay__item" data-pm="paypal">
                    <div class="cs-pay__title">PayPal</div>
                  </div>
                  <div class="cs-pay__item" data-pm="cashapp">
                    <div class="cs-pay__title">CashApp</div>
                  </div>
                  <div class="cs-pay__item" data-pm="payoneer">
                    <div class="cs-pay__title">Payoneer</div>
                  </div>
                </div>

                <div id="cs-pay-details" style="margin-top:24px">
                  <div class="cs-pay-placeholder">
                    Please select a payment method above to see the instructions.
                  </div>
                </div>

                <div class="cs-tx-card" style="margin-top:24px">
                  <div class="cs-tx-card__header">
                    <label class="cs-tx-card__label" for="txid">Transaction Verification</label>
                  </div>
                  <div class="cs-tx-card__body">
                    <input class="cs-tx-card__input" id="txid" name="txid" placeholder="Paste your transaction ID or reference here" />
                    <p class="cs-tx-card__help">Submit the ID after completing your payment to the details shown above.</p>
                  </div>
                </div>

                <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
                  <a href="/cart" class="cs-package__btn">Back to Cart</a>
                  <button type="button" class="cs-package__btn cs-package__btn--primary" data-cs-confirm-payment="1">Confirm Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`

  const faqHtmlRaw = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FAQ | CARZ SQUAD</title>
  </head>
  <body class="production">
    <main>
      <section style="background:#dc2626;padding:56px 0;color:#fff">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <h1 class="section-header section-header--white" style="margin:0 0 10px">Frequently Asked Questions</h1>
              <p class="section-text" style="max-width:900px;margin:0;opacity:.95">
                Everything you need to know about CARZ SQUAD inspections, reports, scheduling, and coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="faq" id="faqs" style="padding:42px 0">
        <div class="container">
          <div class="row">
            <div class="base-12">
              <div class="faq__word-wrap" style="max-width:980px;margin:0 auto">
                <p class="faq__question js-accordion">What is Carz Squad?</p>
                <p class="faq__answer js-accordion-show">
                  Carz Squad is a professional pre-purchase and pre-sale vehicle inspection service in the USA. We help buyers, sellers, and dealerships make informed decisions through detailed car inspections and transparent reports.
                </p>

                <p class="faq__question js-accordion">What is a pre-purchase vehicle inspection?</p>
                <p class="faq__answer">
                  A pre-purchase inspection is a complete evaluation of a vehicle before you buy it. Our inspectors check the car’s engine, transmission, suspension, brakes, tires, exterior, interior, accident history indicators, and overall condition.
                </p>

                <p class="faq__question js-accordion">Why should I get a vehicle inspection before buying a car?</p>
                <p class="faq__answer">
                  A professional inspection helps you avoid hidden mechanical problems, detect accident or flood damage, save money on future repairs, negotiate a better price, and buy with confidence.
                </p>

                <p class="faq__question js-accordion">Do you inspect used cars from dealerships and private sellers?</p>
                <p class="faq__answer">
                  Yes. We inspect vehicles from dealerships, private sellers, online marketplaces, auctions, and fleet sellers.
                </p>

                <p class="faq__question js-accordion">What does the inspection include?</p>
                <p class="faq__answer">
                  Our inspections may include engine and transmission check, brake and suspension inspection, tire and wheel condition, battery and electrical systems, interior and exterior condition, fluid leak inspection, road test (when available), photos, and a detailed inspection report.
                </p>

                <p class="faq__question js-accordion">How long does an inspection take?</p>
                <p class="faq__answer">
                  Most inspections take between 60–120 minutes, depending on the vehicle type and inspection package selected.
                </p>

                <p class="faq__question js-accordion">Do you provide a detailed report?</p>
                <p class="faq__answer">
                  Yes. After the inspection, you’ll receive a professional report with vehicle condition summary, photos, identified issues, recommended repairs, and overall assessment.
                </p>

                <p class="faq__question js-accordion">Can I book an inspection online?</p>
                <p class="faq__answer">
                  Yes. You can easily schedule your inspection through our website or contact our support team for assistance.
                </p>

                <p class="faq__question js-accordion">Do you provide services across the USA?</p>
                <p class="faq__answer">
                  Yes. Carz Squad provides vehicle inspection services across multiple cities and states in the USA.
                </p>

                <p class="faq__question js-accordion">How quickly can I get an inspection appointment?</p>
                <p class="faq__answer">
                  In many locations, same-day or next-day appointments may be available depending on inspector availability.
                </p>

                <p class="faq__question js-accordion">Do you inspect luxury and exotic vehicles?</p>
                <p class="faq__answer">
                  Yes. We inspect all types of vehicles including sedans, SUVs, trucks, luxury vehicles, sports cars, hybrid and electric vehicles.
                </p>

                <p class="faq__question js-accordion">Can your inspection guarantee the car will never have problems?</p>
                <p class="faq__answer">
                  No inspection can guarantee a vehicle will never develop future issues. However, our inspections significantly reduce the risk of buying a problematic vehicle.
                </p>

                <p class="faq__question js-accordion">Do I need to be present during the inspection?</p>
                <p class="faq__answer">
                  No. Many customers book inspections remotely. We can send you the full inspection report digitally after completion.
                </p>

                <p class="faq__question js-accordion">What if the inspection finds problems?</p>
                <p class="faq__answer">
                  That’s exactly why inspections matter. You can negotiate the price, ask the seller to repair issues, or avoid purchasing a risky vehicle.
                </p>

                <p class="faq__question js-accordion">How much does a vehicle inspection cost?</p>
                <p class="faq__answer">
                  Pricing depends on vehicle type, inspection package, location, and distance/travel requirements. Please contact Carz Squad for the latest pricing and packages.
                </p>

                <p class="faq__question js-accordion">Why choose Carz Squad?</p>
                <p class="faq__answer">
                  Experienced inspectors, honest and transparent reports, fast scheduling, nationwide USA coverage, buyer-focused service, detailed photo documentation, and reliable customer support.
                </p>

                <p class="faq__question js-accordion">How can I contact Carz Squad?</p>
                <p class="faq__answer">
                  You can contact us through website contact form, phone support, email support, or social media channels. Our team is ready to help you buy with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`

  const pageRaw = isFaqPage
    ? faqHtmlRaw
    : isCartPage
      ? cartPageHtmlRaw
      : isPaymentPage
        ? paymentPageHtmlRaw
        : isPackagesPage
          ? packagesPageHtmlRaw
          : isOrderNowPage
            ? orderNowPageHtmlRaw
            : isHowItWorkPage
              ? howItWorkHtmlRaw
              : homeHtmlRaw
  const pageBaseOrigin = isHowItWorkPage ? 'https://pomcar.com' : 'https://lemonsquad.com'

  const { bodyHtml, headCss, bodyClassName, headLinkHrefs } = useMemo(() => {
    const stripScripts = (html: string) =>
      html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

    const rewriteUrls = (html: string) => {
      const withAbsoluteAttrs = html.replace(
        /(\s(?:src|href)=["'])\/(?!\/)([^"']+)/gi,
        (_match, attrPrefix: string, path: string) => {
          const isHref = attrPrefix.toLowerCase().includes('href=')
          const normalizedPath = path.toLowerCase()

          if (
            normalizedPath.startsWith('carz-squad-logo') ||
            normalizedPath.startsWith('src/assets/logo') ||
            normalizedPath.startsWith('src/assets/logo1') ||
            normalizedPath.startsWith('assets/logo') ||
            normalizedPath.startsWith('assets/logo1')
          ) {
            return `${attrPrefix}/${path}`
          }

          if (isHref) {
            if (path.startsWith('#')) return `${attrPrefix}/${path}`
            const localRoutes = [
              'how-it-work',
              'how-it-works',
              'inspections',
              'packages',
              'order-now',
              'cart',
              'payment',
              'faq',
              'faqs',
            ]
            if (
              localRoutes.some(
                (route) =>
                  normalizedPath === route ||
                  normalizedPath.startsWith(`${route}#`) ||
                  normalizedPath.startsWith(`${route}/`),
              )
            ) {
              return `${attrPrefix}/${path}`
            }
            if (normalizedPath === 'how-it-work' || normalizedPath.startsWith('how-it-work#')) {
              return `${attrPrefix}/${path}`
            }
            if (
              normalizedPath === 'how-it-works' ||
              normalizedPath.startsWith('how-it-works#') ||
              normalizedPath.startsWith('how-it-works/')
            ) {
              return `${attrPrefix}/${path}`
            }
          }

          return `${attrPrefix}${pageBaseOrigin}/${path}`
        },
      )
      return withAbsoluteAttrs.replace(/url\(\s*\/(?!\/)/gi, `url(${pageBaseOrigin}/`)
    }

    const sanitized = stripScripts(pageRaw)
    const doc = new DOMParser().parseFromString(sanitized, 'text/html')

    const shouldApplyLemonSquadCustomizations = pageBaseOrigin === 'https://lemonsquad.com'
    const shouldApplyPomcarLocalLinks = pageBaseOrigin === 'https://pomcar.com'

    const isMainPage =
      !isHowItWorkPage && !isPackagesPage && !isOrderNowPage && !isInspectionsPage && !isFaqPage && !isCartPage && !isPaymentPage

    const standardizedHeaderHtml = `
      <header class="main-header">
        <nav class="mini-nav hide-for-small-only">
          <div class="container">
            <ul class="mini-nav__list">
              <li class="mini-nav__item"><a href="/" class="mini-nav__link">Home</a></li>
              <li class="mini-nav__item"><a href="${appHowItWorkPath}" class="mini-nav__link">How It Works</a></li>
              <li class="mini-nav__item"><a href="${appPackagesPath}" class="mini-nav__link">Packages</a></li>
              <li class="mini-nav__item">
                <a href="/order-now" class="mini-nav__link mini-nav__link--standout">Order an Inspection</a>
              </li>
              <li class="mini-nav__item">
                <a href="/faq" class="mini-nav__link">FAQ</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="main-header__content">
          <div class="container">
            <div class="row">
              <div class="site-logo base-12 med-6">
                <a data-cy="logo" href="/"><img src="${logo1}" class="site-logo__image" alt="Carz Squad - Pre Car Inspection"></a>
              </div>
              <div class="main-header__details med-6">
                <a class="main-header__number" data-cy="contact-number" href="https://wa.me/18578228188" target="_blank" rel="noopener noreferrer">+18578228188</a>
              </div>
            </div>
          </div>
        </div>
        <nav class="main-nav hide-for-medium">
          <div class="container">
            <ul class="main-nav__list">
              <li class="main-nav__item"><a href="/" class="main-nav__link">Home</a></li>
              <li class="main-nav__item"><a href="${appHowItWorkPath}" class="main-nav__link">How It Works</a></li>
              <li class="main-nav__item"><a href="${appPackagesPath}" class="main-nav__link">Packages</a></li>
              <li class="main-nav__item"><a href="${appOrderNowPath}" class="main-nav__link">Order Now</a></li>
              <li class="main-nav__item"><a href="/faq" class="main-nav__link">FAQ</a></li>
              <li class="main-nav__item hide-for-medium"><button class="main-nav__link js-close-menu" style="width:100%;margin-top:10px;background:rgba(220,38,38,.1);border-color:rgba(220,38,38,.2);color:#dc2626 !important">Close Menu</button></li>
            </ul>
          </div>
        </nav>
        <div class="mobile-nav hide-for-medium">
          <div class="container">
            <div class="row">
              <div class="mobile-nav__menu-wrap base-4">
                <button class="mobile-nav__button mobile-nav__button--menu js-open-menu">
                  <span class="mobile-nav__button-icon mobile-nav__button-icon--menu"><span class="hidden">Open</span></span> Menu
                </button>
              </div>
              <div class="mobile-nav__call-wrap base-8">
                <a href="https://wa.me/18578228188" class="mobile-nav__button mobile-nav__button--call" target="_blank" rel="noopener noreferrer">
                  <span class="mobile-nav__button-icon mobile-nav__button-icon--call">+18578228188</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    `

    const existingHeader = doc.querySelector('header.main-header') || doc.querySelector('header#wrapper-navbar') || doc.querySelector('nav.navbar')
    const headerWrapper = doc.createElement('div')
    headerWrapper.innerHTML = standardizedHeaderHtml
    const newHeader = headerWrapper.firstElementChild as HTMLElement

    if (existingHeader) {
      existingHeader.replaceWith(newHeader)
    } else {
      doc.body.prepend(newHeader)
    }

    const replaceBrandText = (value: string) => {
      return value
        .replace(/lemon\s*squad/gi, 'CARZ SQUAD')
        .replace(/pom\s*car/gi, 'CARZ SQUAD')
        .replace(/pomcar/gi, 'CARZ SQUAD')
        .replace(/pomcar\s+llc/gi, 'CARZ SQUAD')
    }

    const brandTextWalker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
    while (brandTextWalker.nextNode()) {
      const node = brandTextWalker.currentNode as Text
      const current = node.nodeValue ?? ''
      const replaced = replaceBrandText(current)
      if (replaced !== current) node.nodeValue = replaced
    }

    doc.querySelectorAll('[alt], [title], [aria-label], [placeholder]').forEach((el) => {
      ;(['alt', 'title', 'aria-label', 'placeholder'] as const).forEach((attr) => {
        const value = el.getAttribute(attr)
        if (!value) return
        const replaced = replaceBrandText(value)
        if (replaced !== value) el.setAttribute(attr, replaced)
      })
    })

    doc.querySelectorAll('header, nav.navbar, .sticky-top').forEach(el => {
      if (el !== newHeader && !newHeader.contains(el)) el.remove()
    })

    doc.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn--order, .btn--call, #menu_order_btn, .vehicle-type__btn, .nav-link, .nav-item, [data-cy*="order"], [data-cy*="contact"]').forEach(btn => {
      if (newHeader.contains(btn)) return
      
      const text = btn.textContent?.toLowerCase() ?? ''
      if (
        text.includes('order') || 
        text.includes('get started') || 
        text.includes('call') || 
        text.includes('login') || 
        text.includes('signup') || 
        text.includes('become an inspector') ||
        text.includes('join') ||
        text.includes('get a quote')
      ) {
        if (btn.closest('form')) return
        
        btn.remove()
      }
    })

    if (shouldApplyPomcarLocalLinks) {
      ;['nav.main-nav', 'ul.main-nav__list', '#wrapper-footer-full', '#wrapper-footer'].forEach((selector) => {
        doc.querySelectorAll(selector).forEach((el) => el.remove())
      })

      doc.querySelectorAll('a[href*="pomcar.com/customer-report"]').forEach((a) => {
        a.closest('div')?.remove()
      })

      doc.querySelectorAll('a[href*="pomcar.com/faq"]').forEach((a) => {
        a.closest('p')?.remove()
        a.remove()
      })
    }

    if (shouldApplyPomcarLocalLinks) {
      doc.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') ?? ''
        if (!href) return

        if (!/^https?:\/\//i.test(href) && !href.startsWith('//')) return

        try {
          const url = new URL(href.startsWith('//') ? `https:${href}` : href)
          if (url.origin.toLowerCase() !== pageBaseOrigin.toLowerCase()) return

          if (url.pathname === '/' || url.pathname === '') {
            a.setAttribute('href', `/${url.hash}`)
            return
          }

          if (url.pathname.toLowerCase().startsWith('/how-it-works')) {
            a.setAttribute('href', `${appHowItWorkPath}${url.hash}`)
          }
        } catch {
          return
        }
      })
    }

    if (shouldApplyLemonSquadCustomizations) {
      const localFooterLogoSrc = logo
      const localLogoAlt = 'Carz Squad - Pre Car Inspection'

      doc.querySelectorAll('img.footer__logo').forEach((img) => {
        img.setAttribute('src', localFooterLogoSrc)
        img.setAttribute('alt', localLogoAlt)
      })

      const newDisplay = '+18578228188'
      const newTel = 'tel:+18578228188'
      const shouldReplaceNumber = (value: string) => {
        const digits = value.replace(/\D/g, '')
        return digits === '8882317965' || digits === '18882317965'
      }

      doc.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') ?? ''
        if (/^tel:/i.test(href)) {
          a.setAttribute('href', 'https://wa.me/18578228188')
          a.setAttribute('target', '_blank')
          a.setAttribute('rel', 'noopener noreferrer')
          a.className = 'main-header__number'
        }
      })

      doc.querySelectorAll('a.btn--call, a[data-cy="call-center"]').forEach((a) => {
        a.setAttribute('href', 'https://wa.me/18578228188')
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
        a.className = 'main-header__number'
        if (a.textContent?.toLowerCase().includes('call')) {
          a.textContent = '+18578228188'
        }
      })

      const textWalker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
      while (textWalker.nextNode()) {
        const node = textWalker.currentNode as Text
        const current = node.nodeValue ?? ''
        const replaced = current.replace(
          /(?<!\d)\(?\s*1?\s*[-.]?\s*\(?\s*888\s*\)?[\s.-]*231[\s.-]*7965(?!\d)/g,
          newDisplay,
        )
        if (replaced !== current) node.nodeValue = replaced
      }

      const faqSection = doc.querySelector('section.faq')
      if (faqSection) faqSection.id = 'faqs'

      const contactSection = doc.querySelector('section.footer')
      if (contactSection) contactSection.id = 'contacts'

      const addOnsSection = doc.querySelector('section.add-ons')
      if (addOnsSection) addOnsSection.id = 'add-ons'

      const addOnsHeading = doc.querySelector('h1.section-header--add-ons')
      if (addOnsHeading) addOnsHeading.textContent = 'Enhance Your Inspection'

      const rewriteAddOn = (oldHeading: string, nextHeading: string, nextBody: string) => {
        const cardHeading = Array.from(doc.querySelectorAll('div.add-ons__text-wrap h2.section-sub-head')).find(
          (h) => (h.textContent ?? '').trim().toLowerCase() === oldHeading.trim().toLowerCase(),
        )
        if (!cardHeading) return
        cardHeading.textContent = nextHeading
        const card = cardHeading.closest('div.add-ons__text-wrap') ?? cardHeading.parentElement
        if (!card) return
        const body = card.querySelector('p.section-text')
        if (body) body.textContent = nextBody
      }

      rewriteAddOn(
        'CARFAX Vehicle History Report',
        'Vehicle History Snapshot',
        'Add a trusted history check with key details like accidents, title events, ownership, recalls, and service highlights (VIN required, 1982+).',
      )
      rewriteAddOn(
        'Verbal Vehicle Assessment Report',
        'Phone Report Walkthrough',
        'Get a quick call from our team after your report is ready. We summarize the key findings and answer your questions so you know exactly what matters.',
      )

      const videoIframe = doc.getElementById('howwedo_vid') as HTMLIFrameElement | null
      if (videoIframe) {
        const section = videoIframe.closest('section')
        if (section) section.remove()
        else videoIframe.closest('div')?.remove()
      }

      const faqWrap = doc.querySelector('.faq__word-wrap')
      if (faqWrap) {
        const faqHead = faqWrap.querySelector('h1.faq__head')
        if (faqHead) faqHead.textContent = 'Common Questions'

        const newFaqs = [
          {
            q: 'How fast will I get my inspection report?',
            a: 'Most inspections are completed within 1–2 business days (scheduling and seller availability can affect timing). Your report is typically delivered the next morning after the inspection.',
          },
          {
            q: 'What if the vehicle sells before the inspection?',
            a: 'No problem. We can pause your order and transfer it to a different vehicle once you find another listing.',
          },
          {
            q: 'Do you inspect vehicles nationwide?',
            a: 'Yes. We coordinate inspections across the U.S. and schedule an inspector near the vehicle location.',
          },
          {
            q: 'Can I request a faster inspection?',
            a: 'We’ll always try to schedule the earliest available appointment, but same-day service depends on location, inspector availability, and the seller’s schedule.',
          },
        ]

        const questions = Array.from(faqWrap.querySelectorAll('p.faq__question.js-accordion'))
        const answers = Array.from(faqWrap.querySelectorAll('p.faq__answer'))

        questions.forEach((q, i) => {
          if (!newFaqs[i]) return
          q.textContent = newFaqs[i].q
        })

        answers.forEach((a, i) => {
          if (!newFaqs[i]) return
          a.textContent = newFaqs[i].a
          a.classList.remove('js-accordion-show')
        })

        if (answers[0]) answers[0].classList.add('js-accordion-show')

        for (let i = newFaqs.length; i < questions.length; i++) {
          questions[i]?.remove()
          answers[i]?.remove()
        }
      }

      if (isInspectionsPage) {
        const header = newHeader
        const footer = doc.querySelector('footer')
        const pricingSection = doc.querySelector('section#pricing_tables')

        const inspectionsHeaderWrap =
          doc.querySelector('section#pricing_tables .vehicle-type__header-wrap') ??
          doc.querySelector('div.vehicle-type__header-wrap')

        const inspectionsSection = doc.createElement('section')
        inspectionsSection.className = 'vehicle-type'
        inspectionsSection.id = 'pricing_tables'

        if (inspectionsHeaderWrap) {
          inspectionsSection.append(inspectionsHeaderWrap)
        } else {
          inspectionsSection.innerHTML = `
            <div class="vehicle-type__header-wrap">
              <h1 class="section-header">Inspections</h1>
            </div>
          `
        }

        if (pricingSection) {
          const wanted = new Set(['exotic', 'standard', 'classic', 'commercial'])
          const wrappers: Element[] = []

          Array.from(pricingSection.querySelectorAll('div.vehicle-type__pricing')).forEach((pricing) => {
            const title = pricing.querySelector('h2')?.textContent?.trim().toLowerCase() ?? ''
            if (!wanted.has(title)) return
            const wrapper = pricing.closest('div.vehicle-type__wrapper') ?? pricing
            if (!wrappers.includes(wrapper)) wrappers.push(wrapper)
          })

          const container = doc.createElement('div')
          container.className = 'container'
          const row = doc.createElement('div')
          row.className = 'row'
          const sliderRoot = doc.createElement('div')
          sliderRoot.className = 'inspections-slider'
          sliderRoot.setAttribute('data-inspections-slider', 'root')

          const prevBtn = doc.createElement('button')
          prevBtn.className = 'inspections-slider__arrow inspections-slider__arrow--prev'
          prevBtn.setAttribute('type', 'button')
          prevBtn.setAttribute('aria-label', 'Previous')
          prevBtn.setAttribute('data-inspections-slider-btn', 'prev')
          prevBtn.textContent = '‹'

          const nextBtn = doc.createElement('button')
          nextBtn.className = 'inspections-slider__arrow inspections-slider__arrow--next'
          nextBtn.setAttribute('type', 'button')
          nextBtn.setAttribute('aria-label', 'Next')
          nextBtn.setAttribute('data-inspections-slider-btn', 'next')
          nextBtn.textContent = '›'

          const viewport = doc.createElement('div')
          viewport.className = 'inspections-slider__viewport'
          viewport.setAttribute('data-inspections-slider', 'viewport')

          const owl = doc.createElement('div')
          owl.className = 'vehicle-type__owl'

          if (wrappers.length > 0) owl.append(...wrappers)

          viewport.append(owl)
          sliderRoot.append(viewport, prevBtn, nextBtn)
          row.append(sliderRoot)
          container.append(row)
          inspectionsSection.append(container)
        }

        if (header && footer) {
          doc.body.replaceChildren(header, inspectionsSection, footer)
        } else {
          doc.body.replaceChildren(inspectionsSection)
        }
      }

      if (isHowItWorkPage) {
        const header = newHeader
        const process = doc.querySelector('#process')
        const footer = doc.querySelector('footer')

        const hero = doc.createElement('section')
        hero.setAttribute('style', 'background:#2e303a;padding:56px 0;color:#fff')
        hero.innerHTML = `
        <div class="container">
          <div class="row">
            <div class="base-12">
              <h1 class="section-header section-header--white" style="margin:0 0 12px">How it work</h1>
              <p class="section-text" style="max-width:780px;margin:0;opacity:.95">
                Order an inspection, we inspect the vehicle on-site, and you get a detailed report with photos.
              </p>
              <div style="margin-top:18px;display:flex;gap:12px;flex-wrap:wrap">
                <a class="btn btn--order" href="/#pricing_tables">See inspection packages</a>
                <a class="main-header__number" href="https://wa.me/18578228188" target="_blank" rel="noopener noreferrer">+18578228188</a>
              </div>
            </div>
          </div>
        </div>
      `

        if (header && process && footer) {
          doc.body.replaceChildren(header, hero, process, footer)
        }
      }
    }

    const headLinkHrefs = Array.from(doc.head.querySelectorAll('link[rel="stylesheet"][href]'))
      .map((l) => l.getAttribute('href') ?? '')
      .filter(Boolean)
      .map((href) => (href.startsWith('/') ? `${pageBaseOrigin}${href}` : href))

    const headCss = Array.from(doc.head.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n')

    return {
      bodyHtml: rewriteUrls(doc.body?.innerHTML ?? ''),
      headCss,
      bodyClassName: doc.body?.getAttribute('class') ?? '',
      headLinkHrefs,
    }
  }, [isHowItWorkPage, isPackagesPage, isOrderNowPage, isInspectionsPage, pageRaw, pageBaseOrigin])

  useEffect(() => {
    const onCardClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const card = target?.closest('.cs-card') as HTMLElement | null
      if (!card) return

      document.querySelectorAll('.cs-card').forEach((el) => el.classList.remove('cs-card--selected'))
      card.classList.add('cs-card--selected')
    }

    document.addEventListener('click', onCardClick)
    return () => document.removeEventListener('click', onCardClick)
  }, [bodyHtml])

  useEffect(() => {
    const onPayMethodClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const item = target?.closest('.cs-pay__item') as HTMLElement | null
      if (!item) return

      const method = item.getAttribute('data-pm')
      document.querySelectorAll('.cs-pay__item').forEach((el) => el.classList.remove('selected'))
      item.classList.add('selected')

      const detailsContainer = document.getElementById('cs-pay-details')
      if (!detailsContainer) return

      let html = ''
      switch (method) {
        case 'zelle':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 12px;color:#111827">Zelle / Bank Transfer Details</h4>
              <p style="margin:4px 0">Account Holder: <strong>Admin Carz Squad</strong></p>
              <p style="margin:4px 0">IBM / Account: <strong>US99 1234 5678 9012 3456</strong></p>
              <p style="margin:4px 0">Zelle Email: <strong>admin@carzsquad.com</strong></p>
              <p style="margin:12px 0 0;color:#6b7280;font-size:13px;border-top:1px solid #eee;padding-top:12px">
                Please transfer exactly <strong>$${cartTotal}</strong> and paste the ID below.
              </p>
            </div>
          `
          break
        case 'card':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 16px;color:#111827">Secure Card Payment (Stripe)</h4>
              <div class="cs-card-form">
                <div style="margin-bottom:12px">
                  <label class="cs-label">Cardholder Name</label>
                  <input class="cs-input" placeholder="Full Name on Card" />
                </div>
                <div style="margin-bottom:12px">
                  <label class="cs-label">Card Number</label>
                  <input class="cs-input" placeholder="0000 0000 0000 0000" />
                </div>
                <div class="cs-card-form-row" style="display:flex;gap:12px">
                  <div style="flex:1">
                    <label class="cs-label">Expiry Date</label>
                    <input class="cs-input" placeholder="MM / YY" />
                  </div>
                  <div style="flex:1">
                    <label class="cs-label">CVC</label>
                    <input class="cs-input" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          `
          break
        case 'wise':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 12px;color:#111827">Wise Transfer</h4>
              <p style="margin:4px 0">Recipient Email: <strong>wise@carzsquad.com</strong></p>
              <p style="margin:4px 0">Reference: <strong>CarzOrder-${Date.now()
                .toString()
                .slice(-6)}</strong></p>
            </div>
          `
          break
        case 'jazzcash':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 12px;color:#111827">JazzCash / Mobile Account</h4>
              <p style="margin:4px 0">Account Number: <strong>0300 1234567</strong></p>
              <p style="margin:4px 0">Account Name: <strong>CARZ SQUAD ADMIN</strong></p>
            </div>
          `
          break
        case 'paypal':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 12px;color:#111827">PayPal Payment</h4>
              <p style="margin:4px 0">PayPal Email: <strong>paypal@carzsquad.com</strong></p>
              <p style="margin:4px 0">Note: Use "Friends & Family" for faster processing.</p>
            </div>
          `
          break
        case 'cashapp':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 12px;color:#111827">CashApp</h4>
              <p style="margin:4px 0">Cashtag: <strong>$CarzSquad</strong></p>
            </div>
          `
          break
        case 'payoneer':
          html = `
            <div class="cs-pay-detail-card">
              <h4 style="margin:0 0 12px;color:#111827">Payoneer</h4>
              <p style="margin:4px 0">Payoneer Email: <strong>payoneer@carzsquad.com</strong></p>
            </div>
          `
          break
      }
      detailsContainer.innerHTML = html
    }

    document.addEventListener('click', onPayMethodClick)
    return () => document.removeEventListener('click', onPayMethodClick)
  }, [bodyHtml, cartTotal])

  const baseCss = [
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:400;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:700;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:800;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial') !important;}",
  ].join('\n')

  const pageExtraCss = useMemo(() => {
    return `
body[data-page="how-it-work"]{
  --bs-body-font-size: calc(1rem + 2px);
  font-size: var(--bs-body-font-size) !important;
}

.main-header__content{
  background-image:
    linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.86) 55%, rgba(255,255,255,.92) 100%),
    url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=60");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 22px 0 !important;
  border-bottom: 1px solid rgba(17, 24, 39, .10) !important;
}
.main-header__content .row{
  align-items:center;
}
.site-logo{
  display:flex;
  justify-content:center;
  align-items:center;
  min-height: 360px;
}
.site-logo__image{
  max-height: 400px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  background: transparent !important;
}
.main-header__details{
  display:flex;
  justify-content:flex-end;
  align-items:center;
  gap:12px;
}
.main-header__number{
  display:inline-flex;
  align-items:center;
  justify-content: center;
  gap:10px;
  padding:12px 24px;
  border-radius:999px;
  background: #25D366 !important;
  border: 1px solid #128C7E !important;
  color:#fff !important;
  text-decoration:none !important;
  font-weight:700;
  font-size: 16px;
  min-width: 200px;
  letter-spacing:.2px;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.main-header__number:hover{
  background: #128C7E !important;
  transform: translateY(-1px);
}
.main-header__number::before{
  content:'';
  width:20px;
  height:20px;
  background-repeat:no-repeat;
  background-size:contain;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%2325D366' d='M16 3C8.8 3 3 8.6 3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-1.8c1.9 1 4 1.5 6.1 1.5 7.2 0 13-5.6 13-12.6C29 8.6 23.2 3 16 3z'/%3E%3Cpath fill='%23fff' d='M23.4 19.4c-.3-.2-1.9-.9-2.2-1-.3-.1-.6-.2-.9.2s-1 1-1.2 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.9-2.2-1.2-3-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.3 3.3c.2.2 2.4 3.7 5.9 5.2.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.7 2.2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z'/%3E%3C/svg%3E");
  animation: none;
}
@keyframes traeBreath{
  0%,100%{ transform: scale(1); filter: drop-shadow(0 0 0 rgba(16,185,129,.0)); opacity:.9; }
  50%{ transform: scale(1.12); filter: drop-shadow(0 0 10px rgba(16,185,129,.55)); opacity:1; }
}
.mini-nav__list{
  display:flex;
  justify-content:flex-end;
  align-items:center;
  flex-wrap:wrap;
  gap:10px;
}
.mini-nav{
  background: #111827 !important;
}
header.main-header{
  display:block !important;
  position: relative;
  z-index: 9998;
}
.main-header__content{
  display:block !important;
}
.mini-nav__link{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:10px 14px;
  border-radius:999px;
  text-decoration:none !important;
  font-weight:800;
  letter-spacing:.2px;
  background: rgba(255, 255, 255, .12);
  border: 1px solid rgba(255, 255, 255, .18);
  color:#fff !important;
  transition: transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}
.mini-nav__link:hover{
  background: rgba(255, 255, 255, .18);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0,0,0,.12);
}
.mini-nav__link--accent{
  background: rgba(220, 38, 38, .22) !important;
  border-color: rgba(220, 38, 38, .55) !important;
}
.mini-nav__link--standout{
  background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%) !important;
  border-color: rgba(220, 38, 38, .75) !important;
  color:#fff !important;
  box-shadow: 0 12px 24px rgba(0,0,0,.18);
}

header.main-header nav.main-nav .main-nav__list{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin:0;
  padding:0;
  list-style:none;
}
header.main-header nav.main-nav .main-nav__link{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:10px 14px;
  border-radius:999px;
  text-decoration:none !important;
  font-weight:800;
  letter-spacing:.2px;
  background: rgba(17, 24, 39, .05);
  border: 1px solid rgba(17, 24, 39, .10);
  color:#111827 !important;
  transition: transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}
header.main-header nav.main-nav .main-nav__link:hover{
  background: rgba(17, 24, 39, .10);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0,0,0,.12);
}
header.main-header nav.main-nav .main-nav__link--standout{
  background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%) !important;
  border-color: rgba(220, 38, 38, .75) !important;
  color:#fff !important;
}

:root{
  --cs-primary: #dc2626;
  --cs-primary-700: #b91c1c;
}
.bg-primary{ background-color: var(--cs-primary) !important; }
.text-primary{ color: var(--cs-primary) !important; }
.border-primary{ border-color: var(--cs-primary) !important; }
.btn-primary{
  background-color: var(--cs-primary) !important;
  border-color: var(--cs-primary) !important;
  color:#fff !important;
}
.btn-primary:hover{
  background-color: var(--cs-primary-700) !important;
  border-color: var(--cs-primary-700) !important;
}
.bg-secondary{ background-color: var(--cs-primary) !important; }
.text-secondary{ color: var(--cs-primary) !important; }
.border-secondary{ border-color: var(--cs-primary) !important; }
.btn-secondary{
  background-color: var(--cs-primary) !important;
  border-color: var(--cs-primary) !important;
  color:#fff !important;
}
.btn-secondary:hover{
  background-color: var(--cs-primary-700) !important;
  border-color: var(--cs-primary-700) !important;
}

.cs-packages{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap:18px;
}
.cs-card{
  grid-column: span 12;
  background:#fff;
  border:2px solid #dc2626;
  border-radius:16px;
  padding:18px 18px 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.cs-card:hover {
  box-shadow: 0 12px 30px rgba(220, 38, 38, 0.1);
}
.cs-card.cs-card--selected {
  border-color: #25D366 !important;
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.2);
}
.cs-card__image{
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 14px;
}
.cs-card__head{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:14px;
  margin-bottom:12px;
}
.cs-card__title{
  margin:0;
  font-size:18px;
  color:#111827;
}
.cs-card__price{
  font-weight:900;
  font-size:18px;
  color: #dc2626;
}
.cs-card.cs-card--selected .cs-card__price {
  color: #25D366;
}
.cs-card__list{
  margin:0 0 16px;
  padding:0;
  color:#111827;
  line-height:1.55;
  list-style: none;
}
.cs-card__list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 6px;
}
.cs-card__list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #dc2626;
  font-weight: 900;
}
.cs-card.cs-card--selected .cs-card__list li::before {
  color: #10b981;
}
.cs-card--featured{
  transform: scale(1.02);
}
.cs-package__btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:12px 20px;
  border-radius:999px;
  font-weight:900;
  letter-spacing:.2px;
  text-decoration:none !important;
  background: #dc2626 !important;
  border: 1px solid #b91c1c !important;
  color:#fff !important;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
  transition: transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}
.cs-card.cs-card--selected .cs-package__btn {
  background: #25D366 !important;
  border-color: #128C7E !important;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
}
.cs-package__btn:hover{
  transform: translateY(-1px);
}
.cs-card.cs-card--selected .cs-package__btn:hover {
  background: #128C7E !important;
  box-shadow: 0 10px 22px rgba(37, 211, 102, .25);
}

.cs-cart{
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width: 980px;
  margin: 0 auto;
}
.cs-cart__item{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:14px 14px;
  border:1px solid rgba(17,24,39,.10);
  border-radius:14px;
  background:#fff;
}
.cs-cart__meta{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  gap:14px;
  width:100%;
}
.cs-cart__name{
  font-weight:900;
  color:#111827;
}
.cs-cart__price{
  font-weight:900;
  color: var(--cs-primary);
}
.cs-cart__remove{
  border:0;
  background: rgba(17,24,39,.06);
  border: 1px solid rgba(17,24,39,.12);
  color:#111827;
  padding:10px 12px;
  border-radius:999px;
  font-weight:800;
  cursor:pointer;
}
.cs-cart__summary{
  margin-top:6px;
  padding:14px 14px;
  border:1px solid rgba(17,24,39,.10);
  border-radius:14px;
  background: rgba(17,24,39,.03);
}
.cs-cart__total{
  font-weight:900;
  color:#111827;
}
.cs-cart__total span{
  color: var(--cs-primary);
}
.cs-cart__actions{
  margin-top:12px;
  display:flex;
  gap:12px;
  flex-wrap:wrap;
}
.cs-panel{
  background:#fff;
  border:1px solid rgba(17,24,39,.10);
  border-radius:16px;
  padding:18px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}
.cs-panel__title{
  margin:0 0 14px;
  color:#111827;
  font-weight:900;
}
.cs-field{
  margin-bottom:12px;
}
.cs-label{
  display:block;
  font-weight:800;
  margin:0 0 6px;
  color:#111827;
}
.cs-input,.cs-textarea{
  width:100%;
  padding:12px 12px;
  border-radius:12px;
  border:1px solid rgba(17,24,39,.18);
  outline:none;
}
.cs-textarea{
  min-height:110px;
}
.cs-empty{
  max-width: 720px;
  margin: 0 auto;
  padding:18px;
  border-radius:16px;
  border:1px solid rgba(17,24,39,.10);
  background: rgba(17,24,39,.03);
}
.cs-pay{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.cs-pay__item{
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}
.cs-pay__item:hover{
  border-color: #25D366;
  background: #f0fdf4;
}
.cs-pay__item.selected{
  border-color: #25D366;
  background: #f0fdf4;
  box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.2);
}
.cs-pay__title{
  font-weight: 700;
  font-size: 14px;
  color: #111827;
}
.cs-pay-placeholder{
  padding: 32px;
  text-align: center;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  color: #6b7280;
  font-style: italic;
}
.cs-pay-detail-card{
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  animation: pmSlideDown 0.3s ease;
}
@keyframes pmSlideDown{
  from{opacity:0;transform:translateY(-8px);}
  to{opacity:1;transform:translateY(0);}
}
.cs-tx-card{
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.cs-tx-card__label{
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.cs-tx-card__input{
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 14px 16px;
  color: #fff;
  font-family: monospace;
  font-size: 16px;
  transition: all 0.2s ease;
}
.cs-tx-card__input:focus{
  outline: none;
  border-color: #25D366;
  background: rgba(255,255,255,0.08);
}
.cs-tx-card__help{
  margin-top: 12px;
  font-size: 13px;
  color: #6b7280;
}

@media (min-width: 900px){
  .cs-card{ grid-column: span 6; }
  .cs-pay__item{ grid-column: span 4; }
}
@media (max-width: 900px){
  .hide-for-medium {
    display: block !important;
  }
  .hide-for-small-only {
    display: none !important;
  }
  .site-logo{ display:flex; justify-content:center; }
  .main-header__details{ justify-content:flex-end; }
  .site-logo{ min-height: 260px; }
  .site-logo__image{ max-height: 260px; }
  nav.main-nav{
      display:none !important;
      position:fixed !important;
    top: 100px !important;
    left: 20px !important;
    right: 20px !important;
    width: auto !important;
    max-width: 320px;
    max-height: calc(100vh - 120px);
    z-index: 100000 !important;
    background:#fff !important;
    overflow:auto;
    padding:16px;
    border-radius:14px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  nav.main-nav.trae-nav-open{
      display:block !important;
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
      visibility: visible !important;
    }
  .hide-for-medium.trae-nav-open {
    display: block !important;
  }
  nav.main-nav .main-nav__list{
    display:flex;
    flex-direction:column;
    gap:10px;
    margin:0;
    padding:0;
    list-style:none;
  }
  nav.main-nav .main-nav__link{
    display:block;
    padding:10px 10px;
    border-radius:12px;
    color:#111827;
    text-decoration:none;
    background: rgba(17, 24, 39, .04);
    font-size: 14px;
  }
  nav.main-nav .main-nav__link:hover{
    background: rgba(17, 24, 39, .08);
  }
  nav.main-nav .main-nav__link--standout {
    background: #2e303a !important;
    color: #fff !important;
    font-weight: 800;
  }
}

.footer__contact{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:22px 16px;
  border-radius:16px;
  background: rgba(17, 24, 39, .04);
}
img.footer__logo{
  max-height: 220px;
  width:auto;
  max-width:100%;
  object-fit:contain;
}
.faq__answer{ display:none; }
.faq__answer.js-accordion-show{ display:block; }

body[data-page="inspections"] .vehicle-type__owl{
  display:flex;
  gap:28px;
  scroll-snap-type:x mandatory;
}
body[data-page="inspections"] .vehicle-type__wrapper{
  flex:0 0 220px;
  scroll-snap-align:start;
}
body[data-page="inspections"] .inspections-slider{
  position:relative;
  width:100%;
}
body[data-page="inspections"] .inspections-slider__viewport{
  overflow-x:auto;
  overscroll-behavior-x:contain;
  -webkit-overflow-scrolling:touch;
  padding:14px 52px 22px;
}
body[data-page="inspections"] .inspections-slider__viewport::-webkit-scrollbar{
  height:0;
}
body[data-page="inspections"] .inspections-slider__arrow{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:44px;
  height:44px;
  border:0;
  border-radius:0;
  background:#2e303a;
  color:#fff;
  font-size:28px;
  line-height:44px;
  text-align:center;
  cursor:pointer;
  user-select:none;
}
body[data-page="inspections"] .inspections-slider__arrow--prev{ left:0; }
body[data-page="inspections"] .inspections-slider__arrow--next{ right:0; }
body[data-page="inspections"] .inspections-slider__arrow:disabled{
  opacity:.35;
  cursor:default;
}
`
  }, [])

  useEffect(() => {
    const previousClass = document.body.className
    const previousPage = document.body.getAttribute('data-page')
    document.body.className = bodyClassName
    document.body.setAttribute(
      'data-page',
      isHowItWorkPage
        ? 'how-it-work'
        : isPackagesPage
          ? 'packages'
          : isOrderNowPage
            ? 'order-now'
            : isCartPage
              ? 'cart'
              : isPaymentPage
                ? 'payment'
                : isFaqPage
                  ? 'faq'
                  : isInspectionsPage
                    ? 'inspections'
                    : '',
    )
    return () => {
      document.body.className = previousClass
      if (previousPage === null) document.body.removeAttribute('data-page')
      else document.body.setAttribute('data-page', previousPage)
    }
  }, [bodyClassName, isHowItWorkPage, isPackagesPage, isOrderNowPage, isCartPage, isPaymentPage, isFaqPage, isInspectionsPage])

  useEffect(() => {
    const head = document.head
    const old = Array.from(head.querySelectorAll('link[data-dynamic-style="1"]'))
    old.forEach((el) => el.remove())

    const existing = new Set(
      Array.from(head.querySelectorAll('link[rel="stylesheet"][href]')).map((l) => (l as HTMLLinkElement).href),
    )

    headLinkHrefs.forEach((href) => {
      const absoluteHref = new URL(href, window.location.href).href
      if (existing.has(absoluteHref)) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = absoluteHref
      link.setAttribute('data-dynamic-style', '1')
      head.appendChild(link)
    })

    return () => {
      const current = Array.from(head.querySelectorAll('link[data-dynamic-style="1"]'))
      current.forEach((el) => el.remove())
    }
  }, [headLinkHrefs])

  useEffect(() => {
    const hash = window.location.hash
    const id = hash.startsWith('#') ? hash.slice(1) : ''
    if (!id) return
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView()
    }, 0)
  }, [locationKey, bodyHtml])

  useEffect(() => {
    const nav = document.querySelector('nav.main-nav') as HTMLElement | null
    const openBtn = document.querySelector('button.js-open-menu') as HTMLButtonElement | null
    const closeBtn = document.querySelector('button.js-close-menu') as HTMLButtonElement | null
    if (!nav || !openBtn) return

    const positionNav = () => {
      const rect = openBtn.getBoundingClientRect()
      const margin = 8
      const minLeft = 10
      const maxWidth = 260
      const width = Math.min(maxWidth, Math.max(220, window.innerWidth - minLeft * 2))
      const top = rect.bottom + margin
      const maxTop = Math.max(56, window.innerHeight - 120)
      const clampedTop = Math.min(top, maxTop)
      const left = Math.min(Math.max(minLeft, rect.left), window.innerWidth - width - minLeft)
      const maxHeight = Math.max(220, window.innerHeight - clampedTop - minLeft)

      nav.style.width = `${width}px`
      nav.style.left = `${left}px`
      nav.style.right = 'auto'
      nav.style.top = `${clampedTop}px`
      nav.style.maxHeight = `${maxHeight}px`
    }

    const open = () => {
      positionNav()
      nav.classList.add('trae-nav-open')
      openBtn.setAttribute('aria-expanded', 'true')
    }
    const close = () => {
      nav.classList.remove('trae-nav-open')
      openBtn.setAttribute('aria-expanded', 'false')
    }

    const onOpen = (e: Event) => {
      e.preventDefault()
      open()
    }
    const onClose = (e: Event) => {
      e.preventDefault()
      close()
    }
    const onNavClick = (e: Event) => {
      const target = e.target as Element | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (href.startsWith('/') || href.startsWith('#')) close()
    }

    openBtn.addEventListener('click', onOpen)
    closeBtn?.addEventListener('click', onClose)
    nav.addEventListener('click', onNavClick)
    window.addEventListener('resize', positionNav)
    window.addEventListener('scroll', positionNav, { passive: true })

    return () => {
      openBtn.removeEventListener('click', onOpen)
      closeBtn?.removeEventListener('click', onClose)
      nav.removeEventListener('click', onNavClick)
      window.removeEventListener('resize', positionNav)
      window.removeEventListener('scroll', positionNav)
    }
  }, [bodyHtml])

  useEffect(() => {
    const onCollapseClick = (e: Event) => {
      const rawTarget = e.target as Element | null
      const toggleEl = rawTarget?.closest?.('[data-bs-toggle="collapse"]') as HTMLElement | null
      if (!toggleEl) return

      const dataTarget = toggleEl.getAttribute('data-bs-target') ?? ''
      const hrefTarget = toggleEl.getAttribute('href') ?? ''
      const selector = dataTarget || hrefTarget
      if (!selector || !selector.startsWith('#')) return

      const panel = document.querySelector(selector) as HTMLElement | null
      if (!panel) return

      e.preventDefault()

      const isShown = panel.classList.contains('show')
      if (isShown) {
        panel.classList.remove('show')
        toggleEl.setAttribute('aria-expanded', 'false')
      } else {
        panel.classList.add('show')
        toggleEl.setAttribute('aria-expanded', 'true')
      }
    }

    document.addEventListener('click', onCollapseClick)
    return () => document.removeEventListener('click', onCollapseClick)
  }, [bodyHtml])

  useEffect(() => {
    const onFaqClick = (e: Event) => {
      const target = e.target as Element | null
      const question = target?.closest?.('p.faq__question.js-accordion') as HTMLParagraphElement | null
      if (!question) return
      const answer = question.nextElementSibling as HTMLElement | null
      if (!answer || !answer.classList.contains('faq__answer')) return

      const isOpen = answer.classList.contains('js-accordion-show')
      document.querySelectorAll('p.faq__answer.js-accordion-show').forEach((el) => el.classList.remove('js-accordion-show'))
      if (!isOpen) answer.classList.add('js-accordion-show')
    }

    document.addEventListener('click', onFaqClick)
    return () => document.removeEventListener('click', onFaqClick)
  }, [bodyHtml])

  useEffect(() => {
    if (!isInspectionsPage) return

    const viewport = document.querySelector('[data-inspections-slider="viewport"]') as HTMLElement | null
    const prevBtn = document.querySelector('[data-inspections-slider-btn="prev"]') as HTMLButtonElement | null
    const nextBtn = document.querySelector('[data-inspections-slider-btn="next"]') as HTMLButtonElement | null
    if (!viewport || !prevBtn || !nextBtn) return

    const getStep = () => {
      const firstCard = viewport.querySelector('.vehicle-type__wrapper') as HTMLElement | null
      if (!firstCard) return Math.max(260, Math.floor(viewport.clientWidth * 0.85))
      const gap = 28
      return firstCard.getBoundingClientRect().width + gap
    }
    const updateDisabled = () => {
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
      prevBtn.disabled = viewport.scrollLeft <= 0
      nextBtn.disabled = viewport.scrollLeft >= maxScrollLeft - 1
    }

    const onPrev = () => viewport.scrollBy({ left: -getStep(), behavior: 'smooth' })
    const onNext = () => viewport.scrollBy({ left: getStep(), behavior: 'smooth' })

    prevBtn.addEventListener('click', onPrev)
    nextBtn.addEventListener('click', onNext)
    viewport.addEventListener('scroll', updateDisabled, { passive: true })

    updateDisabled()
    return () => {
      prevBtn.removeEventListener('click', onPrev)
      nextBtn.removeEventListener('click', onNext)
      viewport.removeEventListener('scroll', updateDisabled)
    }
  }, [isInspectionsPage, bodyHtml])

  return (
    <div className="page-shell">
      <style
        dangerouslySetInnerHTML={{
          __html: `${baseCss}\n${headCss}\n${pageExtraCss}`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  )
}

export default App
