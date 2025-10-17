import { Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchHistoryProps {
  history: Array<{ drugs: string[]; timestamp: string; id: string }>;
  onSelect: (drugs: string[]) => void;
  onClear: () => void;
}

const SearchHistory = ({ history, onSelect, onClear }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Searches
            </CardTitle>
            <CardDescription>Quick access to previous analyses</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.drugs)}
              className="w-full p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {item.drugs.map((drug) => (
                  <Badge key={drug} variant="secondary" className="text-xs">
                    {drug}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
              </p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchHistory;
