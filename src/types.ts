export interface DocumentInfo {
  name: string;
  description: string;
  importance: string;
  tips: string[];
  requiredFor: "both" | "individual" | "organization";
}

export interface AccountTypeDetails {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  obligations: string[];
  fees: string;
  duration: string;
  suitability: string;
}

export interface StepDetail {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  detailedSteps: string[];
  warning?: string;
  proTip?: string;
}

export interface CommonPitfall {
  title: string;
  reason: string;
  solution: string;
  severity: "high" | "medium";
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  documents: {
    individual: string[];
    organization: string[];
  };
  specialNotes?: string;
}
