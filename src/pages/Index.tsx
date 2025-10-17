import { useState } from "react";
import { Shield, AlertCircle } from "lucide-react";
import DrugSelector from "@/components/DrugSelector";
import PredictionResults from "@/components/PredictionResults";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">DrugGuardian</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Polypharmacy Safety Analyzer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Info Banner */}
          <div className="bg-accent border border-accent-foreground/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-accent-foreground">Clinical Decision Support Tool</h3>
              <p className="text-sm text-accent-foreground/80 mt-1">
                This tool uses advanced AI to analyze drug combinations and predict potential side effects. 
                Results should be reviewed by healthcare professionals and not used as the sole basis for clinical decisions.
              </p>
            </div>
          </div>

          {/* Drug Selection */}
          <DrugSelector 
            selectedDrugs={selectedDrugs}
            onDrugsChange={setSelectedDrugs}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || selectedDrugs.length < 2}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 shadow-medical"
            >
              {isLoading ? "Analyzing..." : "Analyze Interactions"}
            </Button>
            {(selectedDrugs.length > 0 || prediction) && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                disabled={isLoading}
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
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 DrugGuardian. For educational and research purposes only.</p>
          <p className="mt-1">Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
