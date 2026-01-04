const SectionDivider = () => {
  return (
    <div className="w-full py-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Top line */}
        <div className="h-0.5 bg-foreground/50" />
        
        {/* Decorative pattern */}
        <div className="flex items-center justify-center gap-2 md:gap-4 py-3">
          {/* Triple chevrons right */}
          <svg viewBox="0 0 30 20" className="w-6 h-4 text-foreground/70">
            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 2L18 10L10 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M18 2L26 10L18 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Mountain */}
          <svg viewBox="0 0 30 24" className="w-6 h-5 text-foreground/60">
            <path d="M4 20L10 6L15 12L20 6L26 20" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Triple chevrons left */}
          <svg viewBox="0 0 30 20" className="w-6 h-4 text-foreground/70">
            <path d="M28 2L20 10L28 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 2L12 10L20 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L4 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Double chevrons right */}
          <svg viewBox="0 0 24 20" className="w-5 h-4 text-foreground/50">
            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L20 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Circle with star pattern */}
          <svg viewBox="0 0 36 36" className="w-8 h-8 text-foreground/70">
            <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="18" y1="4" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <line x1="7" y1="7" x2="29" y2="29" stroke="currentColor" strokeWidth="1" />
            <line x1="29" y1="7" x2="7" y2="29" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Double chevrons left */}
          <svg viewBox="0 0 24 20" className="w-5 h-4 text-foreground/50">
            <path d="M22 2L14 10L22 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L4 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Triple chevrons right */}
          <svg viewBox="0 0 30 20" className="w-6 h-4 text-foreground/70">
            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 2L18 10L10 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M18 2L26 10L18 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Mountain */}
          <svg viewBox="0 0 30 24" className="w-6 h-5 text-foreground/60">
            <path d="M4 20L10 6L15 12L20 6L26 20" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Triple chevrons left */}
          <svg viewBox="0 0 30 20" className="w-6 h-4 text-foreground/70">
            <path d="M28 2L20 10L28 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 2L12 10L20 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L4 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Double chevrons right */}
          <svg viewBox="0 0 24 20" className="w-5 h-4 text-foreground/50">
            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L20 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Circle with star pattern */}
          <svg viewBox="0 0 36 36" className="w-8 h-8 text-foreground/70">
            <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="18" y1="4" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <line x1="7" y1="7" x2="29" y2="29" stroke="currentColor" strokeWidth="1" />
            <line x1="29" y1="7" x2="7" y2="29" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Double chevrons left */}
          <svg viewBox="0 0 24 20" className="w-5 h-4 text-foreground/50">
            <path d="M22 2L14 10L22 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L4 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Triple chevrons right - hidden on mobile */}
          <svg viewBox="0 0 30 20" className="w-6 h-4 text-foreground/70 hidden md:block">
            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 2L18 10L10 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M18 2L26 10L18 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Mountain - hidden on mobile */}
          <svg viewBox="0 0 30 24" className="w-6 h-5 text-foreground/60 hidden md:block">
            <path d="M4 20L10 6L15 12L20 6L26 20" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Triple chevrons left - hidden on mobile */}
          <svg viewBox="0 0 30 20" className="w-6 h-4 text-foreground/70 hidden md:block">
            <path d="M28 2L20 10L28 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 2L12 10L20 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2L4 10L12 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        {/* Bottom line */}
        <div className="h-0.5 bg-foreground/50" />
      </div>
    </div>
  );
};

export default SectionDivider;
