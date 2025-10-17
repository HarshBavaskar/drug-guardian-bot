import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DrugSelectorProps {
  selectedDrugs: string[];
  onDrugsChange: (drugs: string[]) => void;
}

// Common drugs for suggestions
const COMMON_DRUGS = [
  "Aspirin", "Metformin", "Lisinopril", "Atorvastatin", "Amlodipine",
  "Omeprazole", "Levothyroxine", "Metoprolol", "Warfarin", "Simvastatin",
  "Losartan", "Gabapentin", "Hydrochlorothiazide", "Albuterol", "Sertraline"
];

const DrugSelector = ({ selectedDrugs, onDrugsChange }: DrugSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.length > 0) {
      const filtered = COMMON_DRUGS.filter(drug => 
        drug.toLowerCase().includes(value.toLowerCase()) &&
        !selectedDrugs.includes(drug)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const addDrug = (drug: string) => {
    const trimmedDrug = drug.trim();
    if (trimmedDrug && !selectedDrugs.includes(trimmedDrug)) {
      onDrugsChange([...selectedDrugs, trimmedDrug]);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const removeDrug = (drugToRemove: string) => {
    onDrugsChange(selectedDrugs.filter(drug => drug !== drugToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDrug(inputValue);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Drug Selection</CardTitle>
        <CardDescription>
          Enter or select drugs to analyze for potential interactions and side effects
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Section */}
        <div className="relative">
          <div className="flex gap-2">
            <Input
              placeholder="Enter drug name..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={() => addDrug(inputValue)}
              disabled={!inputValue.trim()}
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              {suggestions.map((drug) => (
                <button
                  key={drug}
                  className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
                  onClick={() => addDrug(drug)}
                >
                  {drug}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Drugs */}
        {selectedDrugs.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              Selected Drugs ({selectedDrugs.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedDrugs.map((drug) => (
                <Badge
                  key={drug}
                  variant="secondary"
                  className="pl-3 pr-1 py-1.5 text-sm flex items-center gap-1"
                >
                  {drug}
                  <button
                    onClick={() => removeDrug(drug)}
                    className="ml-1 p-0.5 hover:bg-secondary-foreground/20 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add Suggestions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Quick Add
          </p>
          <div className="flex flex-wrap gap-2">
            {COMMON_DRUGS.filter(drug => !selectedDrugs.includes(drug))
              .slice(0, 8)
              .map((drug) => (
                <Badge
                  key={drug}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => addDrug(drug)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {drug}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrugSelector;
