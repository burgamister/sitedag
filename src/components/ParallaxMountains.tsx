import { useState, useEffect } from 'react';

const ParallaxMountains = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [footerOffset, setFooterOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      
      // Get footer position
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerTop = window.scrollY + footerRect.top;
        const distanceToFooter = Math.max(0, footerTop - window.scrollY - window.innerHeight);
        setFooterOffset(distanceToFooter);
      }
      
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mountain 1 - appears at start, disappears around 25%
  const mountain1Opacity = Math.max(0, 1 - scrollProgress / 25);
  const mountain1Y = Math.max(0, scrollProgress * 0.5 - footerOffset * 0.5);

  // Mountain 2 - appears around 20%, peaks at 40%, disappears around 60%
  const mountain2Opacity = Math.max(
    0,
    Math.min(1, (scrollProgress - 15) / 20, (80 - scrollProgress) / 20)
  );
  const mountain2Y = Math.max(0, scrollProgress * 0.3 - 5 - footerOffset * 0.3);

  // Mountain 3 - appears around 45%, peaks at 65%, disappears around 85%
  const mountain3Opacity = Math.max(
    0,
    Math.min(1, (scrollProgress - 40) / 20, (90 - scrollProgress) / 20)
  );
  const mountain3Y = Math.max(0, scrollProgress * 0.2 - 10 - footerOffset * 0.2);

  // Mountain 4 - appears around 70%, stays to the end
  const mountain4Opacity = Math.max(0, (scrollProgress - 65) / 15);
  const mountain4Y = Math.max(0, scrollProgress * 0.1 - 15 - footerOffset * 0.1);

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10 min-h-screen">
      {/* Mountain 1 */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-300"
        style={{
          opacity: mountain1Opacity,
          transform: `translateY(${mountain1Y}px)`,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/30" preserveAspectRatio="none" style={{ minHeight: '300px' }}>
          <path fill="currentColor" d="M0,320L240,280L360,160L480,200L600,120L720,180L840,100L960,140L1080,80L1200,160L1320,120L1440,180L1440,320L0,320Z" />
        </svg>
      </div>

      {/* Mountain 2 */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-300"
        style={{
          opacity: mountain2Opacity,
          transform: `translateY(${mountain2Y}px)`,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/40" preserveAspectRatio="none" style={{ minHeight: '300px' }}>
          <path fill="currentColor" d="M0,320L200,260L320,140L480,220L640,100L800,160L960,80L1120,180L1280,120L1440,200L1440,320L0,320Z" />
        </svg>
      </div>

      {/* Mountain 3 */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-300"
        style={{
          opacity: mountain3Opacity,
          transform: `translateY(${mountain3Y}px)`,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/50" preserveAspectRatio="none" style={{ minHeight: '300px' }}>
          <path fill="currentColor" d="M0,300L180,250L360,150L540,200L720,120L900,170L1080,90L1260,160L1440,140L1440,320L0,320Z" />
        </svg>
      </div>

      {/* Mountain 4 */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-300"
        style={{
          opacity: mountain4Opacity,
          transform: `translateY(${mountain4Y}px)`,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/60" preserveAspectRatio="none" style={{ minHeight: '300px' }}>
          <path fill="currentColor" d="M0,280L240,260L480,180L720,160L960,140L1200,200L1440,160L1440,320L0,320Z" />
        </svg>
      </div>
    </div>
  );
};

export default ParallaxMountains;
