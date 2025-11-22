import Header from "@/components/Header";
import logoIcon from "@/assets/logo-icon.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={logoIcon} 
            alt="DagEnglish Icon" 
            className="w-64 h-64 md:w-80 md:h-80 opacity-20 pointer-events-none"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="font-alata text-5xl md:text-7xl font-bold text-foreground mb-6">
            DagEnglish
          </h1>
          <p className="font-montserrat text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            пространство диалога
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
