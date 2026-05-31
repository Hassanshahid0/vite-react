import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Home from './components/Home'

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
        // Handled by dedicated menu useEffect
        return
      }

      const closeMenuBtn = target.closest('.js-close-menu, .main-nav__link.js-close-menu')
      if (closeMenuBtn) {
        // Handled by dedicated menu useEffect
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

  const baseCss = [
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:400;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:700;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial') !important;}",
  ].join('\n')

  const pageExtraCss = useMemo(() => {
    return `
body[data-page="home"]{
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
  margin:0;
  padding:0;
  list-style:none;
}
.mini-nav{
  display: block !important;
  background: #111827 !important;
}
.hide-for-medium {
  display: none !important;
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
.cs-card.cs-card--selected .cs-card__price{
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
    top: 100px;
    left: 20px;
    right: 20px;
    width: auto;
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
  .mobile-nav__button {
    cursor: pointer !important;
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

body[data-page="packages"] .vehicle-type__owl{
  display:flex;
  gap:28px;
  scroll-snap-type:x mandatory;
}
body[data-page="packages"] .vehicle-type__wrapper{
  flex:0 0 220px;
  scroll-snap-align:start;
}
body[data-page="packages"] .inspections-slider{
  position:relative;
  width:100%;
}
body[data-page="packages"] .inspections-slider__viewport{
  overflow-x:auto;
  overscroll-behavior-x:contain;
  -webkit-overflow-scrolling:touch;
  padding:14px 52px 22px;
}
body[data-page="packages"] .inspections-slider__viewport::-webkit-scrollbar{
  height:0;
}
body[data-page="packages"] .inspections-slider__arrow{
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
body[data-page="packages"] .inspections-slider__arrow--prev{ left:0; }
body[data-page="packages"] .inspections-slider__arrow--next{ right:0; }
body[data-page="packages"] .inspections-slider__arrow:disabled{
  opacity:.35;
  cursor:default;
}
`
  }, [])

  useEffect(() => {
    const previousClass = document.body.className
    const previousPage = document.body.getAttribute('data-page')
    document.body.className = 'production'
    document.body.setAttribute(
      'data-page',
      'home',
    )
    return () => {
      document.body.className = previousClass
      if (previousPage === null) document.body.removeAttribute('data-page')
      else document.body.setAttribute('data-page', previousPage)
    }
  }, [])

  useEffect(() => {
    const onCollapseClick = (e: MouseEvent) => {
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
  }, [])

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

      nav.style.setProperty('width', `${width}px`, 'important')
      nav.style.setProperty('left', `${left}px`, 'important')
      nav.style.setProperty('right', 'auto', 'important')
      nav.style.setProperty('top', `${clampedTop}px`, 'important')
      nav.style.setProperty('max-height', `${maxHeight}px`, 'important')
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

    const onToggle = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      if (nav.classList.contains('trae-nav-open')) {
        close()
      } else {
        open()
      }
    }

    const onClose = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      close()
    }

    const onDocClick = (e: Event) => {
      if (!nav.classList.contains('trae-nav-open')) return
      const target = e.target as Element | null
      if (!target) return
      if (nav.contains(target) || openBtn.contains(target)) return
      close()
    }

    const onNavClick = (e: Event) => {
      const target = e.target as Element | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (href.startsWith('/') || href.startsWith('#')) close()
    }

    openBtn.addEventListener('click', onToggle)
    openBtn.addEventListener('touchstart', onToggle, { passive: false })
    closeBtn?.addEventListener('click', onClose)
    nav.addEventListener('click', onNavClick)
    document.addEventListener('click', onDocClick)
    window.addEventListener('resize', positionNav)
    window.addEventListener('scroll', positionNav, { passive: true })

    return () => {
      openBtn.removeEventListener('click', onToggle)
      openBtn.removeEventListener('touchstart', onToggle)
      closeBtn?.removeEventListener('click', onClose)
      nav.removeEventListener('click', onNavClick)
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('resize', positionNav)
      window.removeEventListener('scroll', positionNav)
    }
  }, [])

  return (
    <div className="page-shell">
      <style
        dangerouslySetInnerHTML={{
          __html: `${baseCss}\n${pageExtraCss}`,
        }}
      />
      <Home />
    </div>
  )
}

export default App
