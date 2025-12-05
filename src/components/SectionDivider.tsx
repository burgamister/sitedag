const SectionDivider = () => {
  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Top line */}
        <div className="h-0.5 bg-foreground/40 rounded-full mb-4" />
        
        {/* Decorative pattern */}
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {/* Left chevrons */}
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 20 24" className="w-4 h-6 text-foreground/60">
              <path d="M2 2L18 12L2 22" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <svg viewBox="0 0 20 24" className="w-4 h-6 text-foreground/60">
              <path d="M2 2L18 12L2 22" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Mountain symbol */}
          <svg viewBox="0 0 40 30" className="w-8 h-6 text-foreground/70">
            <path d="M5 25L15 8L20 15L25 8L35 25" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 25L20 12L30 25" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>

          {/* Left arrows */}
          <div className="flex items-center gap-0.5">
            <svg viewBox="0 0 16 24" className="w-3 h-5 text-foreground/50">
              <path d="M2 4L14 12L2 20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <svg viewBox="0 0 16 24" className="w-3 h-5 text-foreground/50">
              <path d="M2 4L14 12L2 20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Circle with pattern */}
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-foreground/70">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
            <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="8" y1="8" x2="32" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <line x1="32" y1="8" x2="8" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>

          {/* Right arrows */}
          <div className="flex items-center gap-0.5">
            <svg viewBox="0 0 16 24" className="w-3 h-5 text-foreground/50">
              <path d="M14 4L2 12L14 20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <svg viewBox="0 0 16 24" className="w-3 h-5 text-foreground/50">
              <path d="M14 4L2 12L14 20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Mountain symbol */}
          <svg viewBox="0 0 40 30" className="w-8 h-6 text-foreground/70">
            <path d="M5 25L15 8L20 15L25 8L35 25" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 25L20 12L30 25" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>

          {/* Right chevrons */}
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 20 24" className="w-4 h-6 text-foreground/60">
              <path d="M18 2L2 12L18 22" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <svg viewBox="0 0 20 24" className="w-4 h-6 text-foreground/60">
              <path d="M18 2L2 12L18 22" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
        
        {/* Bottom line */}
        <div className="h-0.5 bg-foreground/40 rounded-full mt-4" />
      </div>
    </div>
  );
};

export default SectionDivider;
