
// Serbian tax calculation utilities

export interface TaxCalculation {
  netSalary: { rsd: number; eur: number };
  grossSalary: { rsd: number; eur: number };
  totalEmployerCost: { rsd: number; eur: number };
  employeeContributions: {
    pension: { rsd: number; eur: number };
    health: { rsd: number; eur: number };
    unemployment: { rsd: number; eur: number };
    total: { rsd: number; eur: number };
  };
  employerContributions: {
    pension: { rsd: number; eur: number };
    health: { rsd: number; eur: number };
    unemployment: { rsd: number; eur: number };
    total: { rsd: number; eur: number };
  };
  taxCalculation: {
    taxBase: { rsd: number; eur: number };
    taxExemption: { rsd: number; eur: number };
    taxableBase: { rsd: number; eur: number };
    incomeTax: { rsd: number; eur: number };
  };
}

// Tax rates and constants
const EMPLOYEE_PENSION_RATE = 0.14;
const EMPLOYEE_HEALTH_RATE = 0.0515;
const EMPLOYEE_UNEMPLOYMENT_RATE = 0.0075;

const EMPLOYER_PENSION_RATE = 0.10;
const EMPLOYER_HEALTH_RATE = 0.0515;
const EMPLOYER_UNEMPLOYMENT_RATE = 0.00;

const INCOME_TAX_RATE = 0.10;
const TAX_EXEMPTION_RSD = 28423; // Monthly tax exemption in RSD

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('sr-RS', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
};

const convertCurrency = (amount: number, fromCurrency: "RSD" | "EUR", toCurrency: "RSD" | "EUR", exchangeRate: number) => {
  if (fromCurrency === toCurrency) return amount;
  if (fromCurrency === "EUR" && toCurrency === "RSD") return amount * exchangeRate;
  if (fromCurrency === "RSD" && toCurrency === "EUR") return amount / exchangeRate;
  return amount;
};

export const calculateFromNet = (netAmount: number, currency: "RSD" | "EUR", exchangeRate: number): TaxCalculation => {
  // Convert net to RSD if needed
  const netRSD = convertCurrency(netAmount, currency, "RSD", exchangeRate);
  
  // Calculate gross salary from net using iterative approach
  let grossRSD = netRSD * 1.5; // Initial estimate
  let iterations = 0;
  const maxIterations = 10;
  
  while (iterations < maxIterations) {
    const employeePension = grossRSD * EMPLOYEE_PENSION_RATE;
    const employeeHealth = grossRSD * EMPLOYEE_HEALTH_RATE;
    const employeeUnemployment = grossRSD * EMPLOYEE_UNEMPLOYMENT_RATE;
    const totalEmployeeContributions = employeePension + employeeHealth + employeeUnemployment;
    
    const taxBase = grossRSD - totalEmployeeContributions;
    const taxableBase = Math.max(0, taxBase - TAX_EXEMPTION_RSD);
    const incomeTax = taxableBase * INCOME_TAX_RATE;
    
    const calculatedNet = grossRSD - totalEmployeeContributions - incomeTax;
    const difference = calculatedNet - netRSD;
    
    if (Math.abs(difference) < 1) break;
    
    grossRSD = grossRSD - difference;
    iterations++;
  }
  
  return buildTaxCalculation(grossRSD, exchangeRate);
};

export const calculateFromGross = (grossAmount: number, currency: "RSD" | "EUR", exchangeRate: number): TaxCalculation => {
  const grossRSD = convertCurrency(grossAmount, currency, "RSD", exchangeRate);
  return buildTaxCalculation(grossRSD, exchangeRate);
};

const buildTaxCalculation = (grossRSD: number, exchangeRate: number): TaxCalculation => {
  // Employee contributions
  const employeePensionRSD = grossRSD * EMPLOYEE_PENSION_RATE;
  const employeeHealthRSD = grossRSD * EMPLOYEE_HEALTH_RATE;
  const employeeUnemploymentRSD = grossRSD * EMPLOYEE_UNEMPLOYMENT_RATE;
  const totalEmployeeContributionsRSD = employeePensionRSD + employeeHealthRSD + employeeUnemploymentRSD;
  
  // Tax calculation
  const taxBaseRSD = grossRSD - totalEmployeeContributionsRSD;
  const taxableBaseRSD = Math.max(0, taxBaseRSD - TAX_EXEMPTION_RSD);
  const incomeTaxRSD = taxableBaseRSD * INCOME_TAX_RATE;
  
  // Net salary
  const netRSD = grossRSD - totalEmployeeContributionsRSD - incomeTaxRSD;
  
  // Employer contributions
  const employerPensionRSD = grossRSD * EMPLOYER_PENSION_RATE;
  const employerHealthRSD = grossRSD * EMPLOYER_HEALTH_RATE;
  const employerUnemploymentRSD = grossRSD * EMPLOYER_UNEMPLOYMENT_RATE;
  const totalEmployerContributionsRSD = employerPensionRSD + employerHealthRSD + employerUnemploymentRSD;
  
  // Total employer cost
  const totalEmployerCostRSD = grossRSD + totalEmployerContributionsRSD;
  
  // Convert all values to EUR
  const convertToEUR = (rsdAmount: number) => rsdAmount / exchangeRate;
  
  return {
    netSalary: {
      rsd: netRSD,
      eur: convertToEUR(netRSD)
    },
    grossSalary: {
      rsd: grossRSD,
      eur: convertToEUR(grossRSD)
    },
    totalEmployerCost: {
      rsd: totalEmployerCostRSD,
      eur: convertToEUR(totalEmployerCostRSD)
    },
    employeeContributions: {
      pension: { rsd: employeePensionRSD, eur: convertToEUR(employeePensionRSD) },
      health: { rsd: employeeHealthRSD, eur: convertToEUR(employeeHealthRSD) },
      unemployment: { rsd: employeeUnemploymentRSD, eur: convertToEUR(employeeUnemploymentRSD) },
      total: { rsd: totalEmployeeContributionsRSD, eur: convertToEUR(totalEmployeeContributionsRSD) }
    },
    employerContributions: {
      pension: { rsd: employerPensionRSD, eur: convertToEUR(employerPensionRSD) },
      health: { rsd: employerHealthRSD, eur: convertToEUR(employerHealthRSD) },
      unemployment: { rsd: employerUnemploymentRSD, eur: convertToEUR(employerUnemploymentRSD) },
      total: { rsd: totalEmployerContributionsRSD, eur: convertToEUR(totalEmployerContributionsRSD) }
    },
    taxCalculation: {
      taxBase: { rsd: taxBaseRSD, eur: convertToEUR(taxBaseRSD) },
      taxExemption: { rsd: TAX_EXEMPTION_RSD, eur: convertToEUR(TAX_EXEMPTION_RSD) },
      taxableBase: { rsd: taxableBaseRSD, eur: convertToEUR(taxableBaseRSD) },
      incomeTax: { rsd: incomeTaxRSD, eur: convertToEUR(incomeTaxRSD) }
    }
  };
};
