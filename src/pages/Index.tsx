import { useState, useEffect } from "react";
import { Shield, AlertCircle } from "lucide-react";
import Hero from "@/components/Hero";
import DrugSelector from "@/components/DrugSelector";
import PredictionResults from "@/components/PredictionResults";
import SearchHistory from "@/components/SearchHistory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<Array<{ drugs: string[]; timestamp: string; id: string }>>([]);
  const { toast } = useToast();

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('drugSearchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Save to history
  const saveToHistory = (drugs: string[]) => {
    const newEntry = {
      drugs,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    const updated = [newEntry, ...searchHistory].slice(0, 10);
    setSearchHistory(updated);
    localStorage.setItem('drugSearchHistory', JSON.stringify(updated));
  };

  const handleAnalyze = async () => {
    if (selectedDrugs.length < 2) {
      toast({
        title: "Insufficient drugs",
        description: "Please select at least 2 drugs for interaction analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPrediction(null);

    try {
      const { data, error } = await supabase.functions.invoke('predict-side-effects', {
        body: { drugs: selectedDrugs }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
      saveToHistory(selectedDrugs);
      
      toast({
        title: "Analysis complete",
        description: "Side effect prediction generated successfully.",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Unable to generate prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedDrugs([]);
    setPrediction(null);
  };

  const handleHistorySelect = (drugs: string[]) => {
    setSelectedDrugs(drugs);
    setPrediction(null);
    toast({
      title: "History loaded",
      description: `Selected ${drugs.length} drugs from history`,
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('drugSearchHistory');
    toast({
      title: "History cleared",
      description: "Search history has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-info/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
      
      {/* Header */}
      <header className="border-b border-border bg-card shadow-card sticky top-0 z-50 backdrop-blur-sm bg-card/80 relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-gradient-primary group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">PrismRX</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Polypharmacy Safety Analyzer</p>
              <p className="text-sm text-muted-foreground">Made by Harsh and Dhruvi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Info Banner */}
          <div className="bg-accent border border-accent-foreground/20 rounded-lg p-4 flex items-start gap-3 hover:border-accent-foreground/40 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <AlertCircle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h3 className="font-semibold text-accent-foreground">Clinical Decision Support Tool</h3>
              <p className="text-sm text-accent-foreground/80 mt-1">
                This tool uses advanced AI to analyze drug combinations and predict potential side effects. 
                Results should be reviewed by healthcare professionals and not used as the sole basis for clinical decisions.
              </p>
            </div>
          </div>

          {/* Search History */}
          <SearchHistory
            history={searchHistory}
            onSelect={handleHistorySelect}
            onClear={handleClearHistory}
          />

          {/* Drug Selection */}
          <DrugSelector 
            selectedDrugs={selectedDrugs}
            onDrugsChange={setSelectedDrugs}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center animate-fade-in">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || selectedDrugs.length < 2}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 shadow-medical hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoading ? "Analyzing..." : "Analyze Interactions"}</span>
              {isLoading && (
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
              )}
            </Button>
            {(selectedDrugs.length > 0 || prediction) && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                disabled={isLoading}
                className="hover:scale-110 transition-transform duration-300 hover:border-primary/50"
              >
                Reset
              </Button>
            )}
          </div>

          {/* Results */}
          {prediction && (
            <PredictionResults 
              prediction={prediction}
              drugs={selectedDrugs}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6 relative z-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 DrugGuardian. For educational and research purposes only.</p>
          <p className="mt-1">Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
