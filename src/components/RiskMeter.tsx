import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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
    <div className="space-y-3 animate-scale-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.color.replace('bg-', 'text-')}`} />
          <span className="font-semibold text-foreground">{config.label}</span>
        </div>
        <span className="text-sm text-muted-foreground">{config.percentage}%</span>
      </div>
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 ${config.color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${config.percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground">{config.description}</p>
    </div>
  );
};

export default RiskMeter;
