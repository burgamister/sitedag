import logoIcon from "@/assets/logo-icon.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToLevelTestCta = () => {
    if (location.pathname.startsWith("/level-test")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (location.pathname === "/") {
      const element = document.getElementById("level-test-cta");
      if (!element) {
        return;
      }

      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    navigate({ pathname: "/", hash: "#level-test-cta" });
  };

  const navItems: NavItem[] = [
    {
      label: "О НАС",
      href: "/"
    },
    {
      label: "ОБУЧЕНИЕ",
      href: "/courses"
    },
    {
      label: "ТЕСТ УРОВНЯ",
      onClick: goToLevelTestCta
    },
    {
      label: "КОНТАКТЫ",
      href: "/contacts"
    }
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3.5 left-0 right-0 z-50 transition-colors duration-200 md:transition-all md:duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between h-20 rounded-full border border-border/0 bg-background/95 px-6 md:px-8 transition-colors duration-200 md:bg-background/80 md:backdrop-blur-md md:transition-all md:duration-300 ${
            isScrolled ? "shadow-none md:shadow-sm" : ""
          }`}
        >
          {/* Left Logo */}
          <div className="flex-shrink-0">
            <button type="button" onClick={() => navigate("/")} className="cursor-pointer">
              <img src={logoIcon} alt="DagEnglish" className="h-12 w-auto" />
            </button>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => {
              const isAnchor = Boolean(item.href && item.href.startsWith("#"));
              const onClick = () => {
                if (item.onClick) {
                  item.onClick();
                  return;
                }
                if (item.href) {
                  navigate(item.href);
                }
              };

              return isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-montserrat text-sm font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={onClick}
                  className="font-montserrat text-sm font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="font-montserrat text-sm font-medium uppercase hidden sm:flex">
              EN
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="p-0">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {navItems.map(item => {
                    const isAnchor = Boolean(item.href && item.href.startsWith("#"));
                    const onClick = () => {
                      handleNavClick();

                      if (item.onClick) {
                        window.setTimeout(() => {
                          item.onClick?.();
                        }, 0);
                        return;
                      }
                      if (item.href) {
                        window.setTimeout(() => {
                          navigate(item.href);
                        }, 0);
                      }
                    };

                    return isAnchor ? (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={handleNavClick}
                        className="font-montserrat text-base font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wide"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        key={item.label}
                        onClick={onClick}
                        className="font-montserrat text-base font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wide text-left"
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  <div className="border-t border-border pt-6">
                    <Button variant="ghost" className="font-montserrat text-sm font-medium uppercase w-full justify-start">
                      EN
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
