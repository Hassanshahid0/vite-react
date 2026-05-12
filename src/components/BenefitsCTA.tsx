const BenefitsCTA = () => {
  const benefits = [
    { icon: 'support', text: 'Always get a person\non the phone' },
    { icon: 'dollar', text: 'No hidden\nfees' },
    { icon: 'clock', text: 'Best turn around\ntime in the industry' },
    { icon: 'check', text: 'Easy to understand\nreports' },
    { icon: 'expert', text: 'Qualified experienced\ninspectors' },
    { icon: 'car', text: 'Largest company in\nthe industry' },
  ];

  return (
    <div className="cta">
      <div className="container">
        <div className="cta__wrapper" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
          {benefits.map((benefit, index) => (
            <div className="cta__wrap" key={index} style={{ textAlign: 'center', flex: '1 1 150px' }}>
              <div className="cta__circle" style={{ margin: '0 auto' }}>
                <span className={`cta__icon cta__icon--${benefit.icon}`}></span>
              </div>
              <p className="cta__text" style={{ whiteSpace: 'pre-line' }}>{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsCTA;
