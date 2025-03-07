import styles from './Testimonials.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';

const testimonials = [
  {
    title: "A game-changer for productivity!",
    review: "This tool is a game-changer! It streamlined our workflow and saved us countless hours.",
    name: "Sarah Johnson",
    position: "CEO, InnovateTech"
  },
  {
    title: "Intuitive and easy to use!",
    review: "Incredibly intuitive and easy to use. Highly recommend to boost productivity.",
    name: "Michael Lee",
    position: "CFO, BrightSolutions"
  },
  {
    title: "A must-have for any team!",
    review: "A must-have for any team. It helped us deliver projects faster and with better results.",
    name: "Emily Carter",
    position: "CTO, NextGen Apps"
  },
  {
    title: "Made our processes stress-free!",
    review: "Absolutely love it! It's made our processes so much more efficient and stress-free.",
    name: "David Martinez",
    position: "Founder, CodeCraft"
  }
];

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
   const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000); 
      }, []);
    

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.titleContainer}>
        <div>
          <h2 className={styles.title}>
            Here's what our <span className={styles.highlight}>customer</span> has to say
          </h2>
          {
            isLoading ? <div className={`${styles.skeletonButton} ${styles.skeleton}`}></div> :
                        <button className={styles.readMore}>Read customer stories</button>
          }
        </div>
        <div className={styles.descriptionContainer}>
          <img className={styles.descImg} src="/images/Testimonials/desc.png" alt="" />
          <p className={styles.description}>Step into a world where style meets substance,<br></br> and every detail is crafted to perfection.</p>
        </div>
      </div>

      {isLoading ? (
        // Shimmer effect for loading state
        isMobile ? (
          <div className={styles.sliderContainer}>
            <Slider {...sliderSettings}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className={`${styles.testimonialCard} ${styles.skeleton}`}>
                    <div className={`${styles.skeletonTitle} ${styles.skeleton}`}></div>
                    <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
                    <div className={styles.reviewer}>
                      <div className={styles.reviewerInfo}>
                        <div className={`${styles.skeletonCircle} ${styles.skeleton}`}></div>
                        <div className={`${styles.skeletonSignature} ${styles.skeleton}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className={styles.testimonialGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${styles.testimonialCard} ${styles.skeleton}`}>
                <div className={`${styles.skeletonTitle} ${styles.skeleton}`}></div>
                <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
                <div className={styles.reviewer}>
                  <div className={styles.reviewerInfo}>
                    <div className={`${styles.skeletonCircle} ${styles.skeleton}`}></div>
                    <div className={`${styles.skeletonSignature} ${styles.skeleton}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Actual content
        isMobile ? (
          <div className={styles.sliderContainer}>
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, i) => (
                <div key={i}>
                  <div className={i === 0 || i === 3 ? `${styles.testimonialCard} ${styles.odd}` : `${styles.testimonialCard} ${styles.even}`}>
                    <h3 className={styles.cardTitle}>{testimonial.title}</h3>
                    <p className={styles.cardText}>{testimonial.review}</p>
                    <div className={styles.reviewer}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.circle}></div>
                        <div className={styles.signature}>
                          <span className={styles.name}>{testimonial.name}</span>
                          <span className={styles.position}>{testimonial.position}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, i) => (
              <div key={i} className={i === 0 || i === 3 ? `${styles.testimonialCard} ${styles.odd}` : `${styles.testimonialCard} ${styles.even}`}>
                <h3 className={styles.cardTitle}>{testimonial.title}</h3>
                <p className={styles.cardText}>{testimonial.review}</p>
                <div className={styles.reviewer}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.circle}></div>
                    <div className={styles.signature}>
                      <span className={styles.name}>{testimonial.name}</span>
                      <span className={styles.position}>{testimonial.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
}

export default Testimonials