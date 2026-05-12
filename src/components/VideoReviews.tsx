import React from 'react';

const VideoReviews: React.FC = () => {
  return (
    <section className="video-reviews">
      <div className="container container--wide">
        <div className="row">
          <div className="base-12 med-4">
            <div style={{ position: 'relative', width: '100%', paddingBottom: '55.95%', marginTop: '20px' }}>
              <iframe 
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderWidth: 0 }}
                className="cta-video__vid" 
                src="https://www.youtube.com/embed/_C6O564UdVM?rel=0" 
                allowFullScreen 
                id="howwedo_vid"
                title="How we do it"
              ></iframe>
            </div>
          </div>
          <div className="reviews base-12 med-8">
            <div className="callout plates-box" id="reviews-callout">
              <h3 className="reviews__head">Customer Reviews</h3>
              <div className="orbit">
                <ul className="reviews__wrap">
                  <li className="section-text" style={{ paddingTop: '10px' }}>
                    <ul className="reviews__stars">
                      <li className="icon-star">★</li><li className="icon-star">★</li><li className="icon-star">★</li><li className="icon-star">★</li><li className="icon-star">★</li>
                    </ul>
                    Great service, extremely polite staff, and a detailed report with specific pictures of area of concerns. Just hired them again for another, and will do the same in the future.
                    <span className="section-text section-text--name" style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>Victor E.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoReviews;
