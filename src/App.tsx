import { useEffect, useMemo, useState } from 'react'
import homeHtmlRaw from '../txt.01.txt?raw'
import howItWorkHtmlRaw from '../txt.02?raw'
import './App.css'

function App() {
  const [locationKey, setLocationKey] = useState(() => `${window.location.pathname}${window.location.hash}`)

  useEffect(() => {
    const onPopState = () => setLocationKey(`${window.location.pathname}${window.location.hash}`)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

  const pathname = useMemo(() => {
    const [path] = locationKey.split('#')
    return path || '/'
  }, [locationKey])

  const normalizedPathname = useMemo(() => {
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
    return pathname
  }, [pathname])

  const appHowItWorkPath = '/how-it-work'
  const appInspectionsPath = '/inspections'
  const isHowItWorkPage = normalizedPathname === appHowItWorkPath || normalizedPathname === '/how-it-works'
  const isInspectionsPage = normalizedPathname === appInspectionsPath
  const pageRaw = isHowItWorkPage ? howItWorkHtmlRaw : homeHtmlRaw
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

          if (isHref) {
            if (path.startsWith('#')) return `${attrPrefix}/${path}`
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
      const newDisplay = '+18578228188'
      const newTel = 'tel:+18578228188'
      const shouldReplaceNumber = (value: string) => {
        const digits = value.replace(/\D/g, '')
        return digits === '8882317965' || digits === '18882317965'
      }

      doc.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') ?? ''
        if (/^tel:/i.test(href) && shouldReplaceNumber(href)) a.setAttribute('href', newTel)
      })

      doc.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') ?? ''
        if (/^tel:/i.test(href)) a.setAttribute('href', newTel)
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

      const menuItems = [
        { label: 'How it work', href: appHowItWorkPath },
        { label: 'Home', href: '/' },
        { label: 'Inspections', href: appInspectionsPath },
        { label: 'FAQS', href: '/#faqs' },
        { label: 'Contacts', href: '/#contacts' },
      ]

      const mainNavList = doc.querySelector('nav.main-nav ul.main-nav__list')
      if (mainNavList) {
        mainNavList.replaceChildren(
          ...menuItems.map(({ label, href }) => {
            const li = doc.createElement('li')
            li.className = 'main-nav__item'
            const a = doc.createElement('a')
            a.className = 'main-nav__link'
            a.setAttribute('href', href)
            a.textContent = label
            li.append(a)
            return li
          }),
        )
      }

      if (isInspectionsPage) {
        const header = doc.querySelector('header.main-header')
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
        const header = doc.querySelector('header.main-header')
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
                <a class="btn btn--call" href="tel:+18578228188">Call +18578228188</a>
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
  }, [isHowItWorkPage, isInspectionsPage, pageRaw, pageBaseOrigin])

  const baseCss = [
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:400;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:700;font-style:normal;font-display:swap;}",
    "@font-face{font-family:'lemon-squad';src:local('Montserrat'),local('Arial');font-weight:800;font-style:normal;font-display:swap;}",
  ].join('\n')

  const pageExtraCss = useMemo(() => {
    return `
body[data-page="how-it-work"]{
  --bs-body-font-size: calc(1rem + 2px);
  font-size: var(--bs-body-font-size) !important;
}

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
    document.body.setAttribute('data-page', isHowItWorkPage ? 'how-it-work' : isInspectionsPage ? 'inspections' : '')
    return () => {
      document.body.className = previousClass
      if (previousPage === null) document.body.removeAttribute('data-page')
      else document.body.setAttribute('data-page', previousPage)
    }
  }, [bodyClassName, isHowItWorkPage, isInspectionsPage])

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
