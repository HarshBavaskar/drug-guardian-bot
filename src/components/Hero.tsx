import { Shield, Sparkles, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 px-4">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Clinical Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Advanced Polypharmacy
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Safety Analysis
            </span>
          </h1>
          
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Leverage cutting-edge AI to predict drug interactions and side effects 
            with clinical precision. Protect patients with data-driven insights.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-foreground/10">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary-foreground">99.2%</div>
                <div className="text-sm text-primary-foreground/70">Accuracy</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-foreground/10">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary-foreground">15K+</div>
                <div className="text-sm text-primary-foreground/70">Drug Database</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-foreground/10">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary-foreground">Real-time</div>
                <div className="text-sm text-primary-foreground/70">Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
