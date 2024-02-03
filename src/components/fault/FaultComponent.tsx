export interface Fault {
    id: string;
    shortDescription: string;
    mileage: number;
    yearOfExploitation: number;
    detailedDescription: string;
  }
  
  export function createFault(id: string, shortDescription: string, mileage: number, yearOfExploitation: number, detailedDescription: string): Fault {
    return {
      id,
      shortDescription,
      mileage,
      yearOfExploitation,
      detailedDescription,
    };
  }