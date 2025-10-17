import { Activity, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  drug: string;
  effect: string;
  severity: "low" | "medium" | "high";
  time: string;
}

interface InteractionTimelineProps {
  items: TimelineItem[];
}

const InteractionTimeline = ({ items }: InteractionTimelineProps) => {
  const severityConfig = {
    low: { color: "bg-success", icon: Info },
    medium: { color: "bg-warning", icon: AlertCircle },
    high: { color: "bg-destructive", icon: AlertCircle }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Interaction Timeline
        </CardTitle>
        <CardDescription>
          Sequential analysis of drug interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => {
            const config = severityConfig[item.severity];
            const Icon = config.icon;
            
            return (
              <div key={index} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {index < items.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="font-semibold text-foreground">{item.drug}</div>
                  <p className="text-sm text-muted-foreground mt-1">{item.effect}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractionTimeline;
