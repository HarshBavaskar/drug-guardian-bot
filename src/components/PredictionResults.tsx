import { AlertCircle, AlertTriangle, CheckCircle, Download, Info, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RiskMeter from "./RiskMeter";
import InteractionTimeline from "./InteractionTimeline";
import KeyInsights from "./KeyInsights";
import EvaluationMetrics from "./EvaluationMetrics";

interface PredictionResultsProps {
  prediction: string;
  drugs: string[];
}

const PredictionResults = ({ prediction, drugs }: PredictionResultsProps) => {
  const handleExport = () => {
    const exportData = {
      drugs,
      prediction,
      timestamp: new Date().toISOString(),
      analysis: "DrugGuardian AI Analysis"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drug-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Parse the prediction to extract severity if mentioned
  const getSeverityInfo = () => {
    const lowerPrediction = prediction.toLowerCase();
    
    if (lowerPrediction.includes("high risk") || lowerPrediction.includes("severe")) {
      return {
        level: "high",
        icon: XCircle,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        label: "High Risk"
      };
    } else if (lowerPrediction.includes("medium risk") || lowerPrediction.includes("moderate")) {
      return {
        level: "medium",
        icon: AlertTriangle,
        color: "text-warning",
        bgColor: "bg-warning/10",
        label: "Medium Risk"
      };
    } else if (lowerPrediction.includes("low risk") || lowerPrediction.includes("minimal")) {
      return {
        level: "low",
        icon: Info,
        color: "text-success",
        bgColor: "bg-success/10",
        label: "Low Risk"
      };
    }
    
    return {
      level: "unknown",
      icon: CheckCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
      label: "Analysis Complete"
    };
  };

  const severityInfo = getSeverityInfo();
  const SeverityIcon = severityInfo.icon;

  // Generate timeline items based on drugs
  const timelineItems = drugs.map((drug, index) => ({
    drug,
    effect: `Analyzing ${drug} interactions...`,
    severity: severityInfo.level as "low" | "medium" | "high",
    time: `T+${index * 2}min`
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Interaction analysis for {drugs.length} drugs
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${severityInfo.bgColor}`}>
                <SeverityIcon className={`w-4 h-4 ${severityInfo.color}`} />
                <span className={`text-sm font-semibold ${severityInfo.color}`}>
                  {severityInfo.label}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drug List - Enhanced Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-6">
            {drugs.map((drug, index) => (
              <div 
                key={drug} 
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{drug}</p>
                    <p className="text-xs text-muted-foreground">Drug {index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Meter */}
          <RiskMeter level={severityInfo.level as "low" | "medium" | "high"} />

          {/* Prediction Content - Enhanced Formatting */}
          <div className="space-y-4">
            {prediction.split('\n').filter(line => line.trim()).map((line, index) => {
              // Remove markdown formatting
              const cleanLine = line
                .replace(/^#{1,6}\s+/, '') // Remove heading markers
                .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold markers
                .replace(/\*(.+?)\*/g, '$1') // Remove italic markers
                .replace(/^[-•*]\s+/, '') // Remove bullet markers
                .trim();
              
              if (!cleanLine) return null;
              
              // Detect if line is a heading (ends with : or starts with capitalized words)
              const isHeading = (cleanLine.includes(':') && cleanLine.split(':')[0].length < 60 && cleanLine.split(':')[0].length > 3) || 
                                (line.match(/^#{1,6}\s+/) !== null);
              
              // Detect bullet points
              const isBulletPoint = line.trim().match(/^[-•*]\s+/);
              
              if (isHeading) {
                const [heading, ...content] = cleanLine.split(':');
                const headingText = heading.trim();
                const contentText = content.join(':').trim();
                
                return (
                  <div key={index} className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-4 border-l-4 border-primary animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {headingText}
                    </h3>
                    {contentText && (
                      <p className="text-foreground leading-relaxed">{contentText}</p>
                    )}
                  </div>
                );
              }
              
              if (isBulletPoint) {
                return (
                  <div key={index} className="bg-card rounded-lg p-3 border border-border flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-foreground leading-relaxed">{cleanLine}</p>
                  </div>
                );
              }
              
              // Regular paragraph
              if (cleanLine.length > 20) {
                return (
                  <div key={index} className="bg-muted/30 rounded-lg p-4 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <p className="text-foreground leading-relaxed">{cleanLine}</p>
                  </div>
                );
              }
              
              return null;
            }).filter(Boolean)}
          </div>

          {/* Disclaimer */}
          <div className="bg-accent/50 border border-accent-foreground/20 rounded-lg p-3 mt-4">
            <p className="text-xs text-accent-foreground/80">
              <strong>Important:</strong> This analysis is generated by AI and should be used as a supplementary 
              tool only. Always consult with a qualified healthcare professional before making any medical decisions. 
              The predictions are based on general pharmacological knowledge and may not account for individual 
              patient factors.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <KeyInsights severity={severityInfo.level} />

      {/* Evaluation Metrics */}
      <EvaluationMetrics severity={severityInfo.level} drugsCount={drugs.length} />

      {/* Interaction Timeline */}
      <InteractionTimeline items={timelineItems} />
    </div>
  );
};

export default PredictionResults;
