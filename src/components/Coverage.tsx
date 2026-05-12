const Coverage = () => {
  return (
    <section className="coverage-cta">
      <a className="coverage-cta__wrapper base-12 med-4" href="/remoteinspections">
        <h2 className="section-sub-head">INSTANT&nbsp;INSPECTIONS, BUILT&nbsp;FOR&nbsp;THE MOMENT&nbsp;YOU&nbsp;NEED&nbsp;THEM.</h2>
        <p className="coverage-cta__text">Lemon Squad Live is designed for that high-pressure moment at the dealership or curb. Launch a session in minutes and get real-time expert help.</p>
        <img alt="Cell Phone Showing Live call with car savvy trained inspector."
          src="https://lemonsquad.com/images/ls-live-phone-call-t.png" style={{ maxHeight: '7.7em', margin: '-1.1em 0px' }} />
      </a>
      <a className="coverage-cta__wrapper base-12 med-4" href="/local">
        <h2 className="section-sub-head">We cover the entire USA</h2>
        <p className="coverage-cta__text">No matter where you live—or where your new car is—we have an inspector in your
          area ready to take a look! We even cover Alaska and Hawaii.</p>
        <div className="coverage-cta__map-icon">
          <img className="coverage-cta__image" alt="We cover the entire USA"
            src="https://lemonsquad.com/zetr_local/assets/images/usa-map.png" />
        </div>
      </a>
      <a className="coverage-cta__wrapper base-12 med-4" href="/electric">
        <h2 className="section-sub-head">EVS ARE DIFFERENT. INSPECT THEM DIFFERENTLY</h2>
        <p className="coverage-cta__text">We inspect EVs like Tesla, Rivian, Lucid, Mach-E, IONIQ 5, Kia EV6, and 
          more - checking for system alerts, charging faults, and battery-related red flags a standard mechanic 
          (and a standard test drive) will miss.</p>
        <img style={{ width: '7.7em', margin: '-0.3em 0px' }} className="fill-dark" src="https://lemonsquad.com/images/layout/lemon-squad-sprite.svg#sprite-path-ev" alt="EV icon" />
      </a>
    </section>
  );
};

export default Coverage;
