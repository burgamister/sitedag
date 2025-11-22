import logoFull from "@/assets/logo-full.png";
import logoIcon from "@/assets/logo-icon.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navItems = [
    { label: "ПРОЕКТЫ", href: "#projects" },
    { label: "ПРО БЮРО", href: "#about" },
    { label: "НОВОСТИ", href: "#news" },
    { label: "КОНТАКТЫ", href: "#contacts" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left Logo */}
          <div className="flex-shrink-0">
            <img src={logoFull} alt="DagEnglish" className="h-12 w-auto" />
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-montserrat text-sm font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Language Switcher */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="font-montserrat text-sm font-medium uppercase"
            >
              EN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
