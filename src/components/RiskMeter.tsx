import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RiskMeterProps {
  level: "low" | "medium" | "high";
}

const RiskMeter = ({ level }: RiskMeterProps) => {
  const configs = {
    low: {
      percentage: 30,
      color: "bg-success",
      icon: CheckCircle,
      label: "Low Risk",
      description: "Minimal interaction concerns"
    },
    medium: {
      percentage: 60,
      color: "bg-warning",
      icon: AlertTriangle,
      label: "Medium Risk",
      description: "Monitor for side effects"
    },
    high: {
      percentage: 90,
      color: "bg-destructive",
      icon: XCircle,
      label: "High Risk",
      description: "Clinical review recommended"
    }
  };

  const config = configs[level];
  const Icon = config.icon;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2 group">
          <span className="group-hover:text-primary transition-colors duration-300">Risk Assessment</span>
          <span className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
        </h3>
        <Badge 
          variant={level === "high" ? "destructive" : level === "medium" ? "default" : "secondary"}
          className="hover:scale-110 transition-transform duration-300 cursor-default"
        >
          {config.label}
        </Badge>
      </div>
      
      <div className="relative h-8 bg-muted rounded-full overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${config.color} group-hover:brightness-110`}
          style={{ width: `${config.percentage}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground drop-shadow-lg">{config.percentage}%</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">{config.description}</p>
    </div>
  );
};

export default RiskMeter;
