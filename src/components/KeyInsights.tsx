import { AlertCircle, CheckCircle, Info, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyInsightsProps {
  severity: string;
}

const KeyInsights = ({ severity }: KeyInsightsProps) => {
  const insights = [
    {
      icon: AlertCircle,
      title: "Interaction Level",
      description: `${severity.charAt(0).toUpperCase() + severity.slice(1)} risk interactions detected`,
      color: severity === "high" ? "text-destructive" : severity === "medium" ? "text-warning" : "text-success",
      bgColor: severity === "high" ? "bg-destructive/10" : severity === "medium" ? "bg-warning/10" : "bg-success/10"
    },
    {
      icon: CheckCircle,
      title: "Clinical Review",
      description: severity === "high" ? "Immediate review recommended" : "Standard monitoring advised",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: TrendingUp,
      title: "Action Required",
      description: severity === "high" ? "Consult healthcare provider" : "Continue as prescribed",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Info,
      title: "AI Confidence",
      description: "Based on pharmacological data",
      color: "text-muted-foreground",
      bgColor: "bg-muted/50"
    }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Key Insights</CardTitle>
        <CardDescription>Quick overview of the analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={index} 
                className={`${insight.bgColor} rounded-lg p-4 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${insight.color} mb-1`}>{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyInsights;
