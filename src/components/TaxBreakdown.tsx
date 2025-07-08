
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Briefcase, Receipt } from "lucide-react";
import { formatCurrency } from "@/utils/taxCalculations";

interface TaxBreakdownProps {
  results: any;
}

export const TaxBreakdown = ({ results }: TaxBreakdownProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Employee Contributions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Doprinosi na teret zaposlenog
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>PIO (penzijsko)</span>
                <Badge variant="outline">14.00%</Badge>
              </div>
              <span className="font-semibold">
                {formatCurrency(results.employeeContributions.pension.rsd)} RSD
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-500" />
                <span>Zdravstveno osiguranje</span>
                <Badge variant="outline">5.15%</Badge>
              </div>
              <span className="font-semibold">
                {formatCurrency(results.employeeContributions.health.rsd)} RSD
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-500" />
                <span>Nezaposlenost</span>
                <Badge variant="outline">0.75%</Badge>
              </div>
              <span className="font-semibold">
                {formatCurrency(results.employeeContributions.unemployment.rsd)} RSD
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Ukupno doprinosi</span>
              <span className="text-orange-600">
                {formatCurrency(results.employeeContributions.total.rsd)} RSD
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Osnovica za porez</span>
                <span>{formatCurrency(results.taxCalculation.taxBase.rsd)} RSD</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Poresko oslobođenje</span>
                <span>{formatCurrency(results.taxCalculation.taxExemption.rsd)} RSD</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Oporeziva osnovica</span>
                <span>{formatCurrency(results.taxCalculation.taxableBase.rsd)} RSD</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-purple-500" />
                  <span>Porez na dohodak (10%)</span>
                </div>
                <span className="text-purple-600">
                  {formatCurrency(results.taxCalculation.incomeTax.rsd)} RSD
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employer Contributions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Doprinosi na teret poslodavca
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>PIO (penzijsko)</span>
                <Badge variant="outline">10.00%</Badge>
              </div>
              <span className="font-semibold">
                {formatCurrency(results.employerContributions.pension.rsd)} RSD
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-500" />
                <span>Zdravstveno osiguranje</span>
                <Badge variant="outline">5.15%</Badge>
              </div>
              <span className="font-semibold">
                {formatCurrency(results.employerContributions.health.rsd)} RSD
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-500" />
                <span>Nezaposlenost</span>
                <Badge variant="outline">0.00%</Badge>
              </div>
              <span className="font-semibold">
                {formatCurrency(results.employerContributions.unemployment.rsd)} RSD
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Ukupno doprinosi</span>
              <span className="text-indigo-600">
                {formatCurrency(results.employerContributions.total.rsd)} RSD
              </span>
            </div>

            <Separator />

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-sm text-gray-600">Konačan trošak firme (Bruto 2)</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(results.totalEmployerCost.rsd)} RSD
                </div>
                <div className="text-lg text-purple-500">
                  ≈ {formatCurrency(results.totalEmployerCost.eur)} EUR
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
