
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText, TrendingUp } from "lucide-react";
import { calculateFromNet, calculateFromGross, formatCurrency } from "@/utils/taxCalculations";
import { TaxBreakdown } from "./TaxBreakdown";
import { ResultsDisplay } from "./ResultsDisplay";

export const TaxCalculator = () => {
  const [inputType, setInputType] = useState<"net" | "gross">("net");
  const [currency, setCurrency] = useState<"RSD" | "EUR">("EUR");
  const [amount, setAmount] = useState<string>("4150");
  const [exchangeRate, setExchangeRate] = useState<string>("117.5");
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    const rate = parseFloat(exchangeRate);
    
    if (isNaN(numAmount) || isNaN(rate) || numAmount <= 0 || rate <= 0) {
      return;
    }

    let calculation;
    if (inputType === "net") {
      calculation = calculateFromNet(numAmount, currency, rate);
    } else {
      calculation = calculateFromGross(numAmount, currency, rate);
    }
    
    setResults(calculation);
  };

  useEffect(() => {
    if (amount && exchangeRate) {
      handleCalculate();
    }
  }, [amount, exchangeRate, inputType, currency]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Input Form */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Parametri za računanje
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="inputType">Tip unosa</Label>
              <Select value={inputType} onValueChange={(value: "net" | "gross") => setInputType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net">Neto plata</SelectItem>
                  <SelectItem value="gross">Bruto plata</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Valuta</Label>
              <Select value={currency} onValueChange={(value: "RSD" | "EUR") => setCurrency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="RSD">RSD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">
                {inputType === "net" ? "Neto plata" : "Bruto plata"} ({currency})
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Unesite iznos"
                className="text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exchangeRate">Kurs EUR/RSD</Label>
              <Input
                id="exchangeRate"
                type="number"
                step="0.01"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="117.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          <ResultsDisplay results={results} />
          <TaxBreakdown results={results} />
        </>
      )}
    </div>
  );
};
