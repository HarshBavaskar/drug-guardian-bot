import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background rounded-2xl shadow-medical m-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-info/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
        <div className="space-y-6 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105 cursor-default">
            <span className="text-primary font-semibold text-sm">AI-Powered Drug Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight hover:text-primary transition-colors duration-300">
            DrugGuardian<span className="text-primary animate-pulse-glow inline-block">.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Advanced AI technology analyzing drug interactions in real-time. 
            Protect your health with evidence-based predictions powered by machine learning.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 cursor-default animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl font-bold text-primary">47.5M+</div>
              <div className="text-sm text-muted-foreground">Clinical Records</div>
            </div>
            <div className="bg-gradient-to-br from-success/20 to-success/5 p-4 rounded-lg border border-success/20 hover:border-success/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-success/20 cursor-default animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-success">94.2%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-info/20 to-info/5 p-4 rounded-lg border border-info/20 hover:border-info/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-info/20 cursor-default animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl font-bold text-info">Real-time</div>
              <div className="text-sm text-muted-foreground">Analysis</div>
            </div>
          </div>
        </div>
        <div className="relative animate-slide-left">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-info/20 rounded-xl blur-2xl animate-pulse-glow" />
          <img 
            src={heroImage} 
            alt="Medical AI Analysis" 
            className="relative rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
