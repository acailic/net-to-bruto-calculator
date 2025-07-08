
import { TaxCalculator } from "@/components/TaxCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kalkulator Neto/Bruto Plate
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Izračunajte neto platu, bruto platu i ukupan trošak poslodavca prema važećim propisima u Srbiji
          </p>
        </div>
        <TaxCalculator />
      </div>
    </div>
  );
};

export default Index;
