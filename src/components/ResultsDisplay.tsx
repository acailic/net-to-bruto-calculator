
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, Building2 } from "lucide-react";
import { formatCurrency } from "@/utils/taxCalculations";

interface ResultsDisplayProps {
  results: any;
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Net Salary */}
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-5 w-5" />
            Neto plata (na ruke)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(results.netSalary.rsd)} RSD
            </div>
            <div className="text-xl text-green-500">
              {formatCurrency(results.netSalary.eur)} EUR
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Iznos koji stiže na račun
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Gross Salary */}
      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Bruto plata
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(results.grossSalary.rsd)} RSD
            </div>
            <div className="text-xl text-blue-500">
              {formatCurrency(results.grossSalary.eur)} EUR
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Bruto 1 - osnova za doprinose
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Total Employer Cost */}
      <Card className="border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5" />
            Ukupan trošak firme
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="text-3xl font-bold text-purple-600">
              {formatCurrency(results.totalEmployerCost.rsd)} RSD
            </div>
            <div className="text-xl text-purple-500">
              {formatCurrency(results.totalEmployerCost.eur)} EUR
            </div>
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              Bruto 2 - ukupan trošak
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
