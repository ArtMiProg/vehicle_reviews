import { StrapiFault } from "../../strapi/strapi";

interface FaultProps {
  fault: StrapiFault,
}

export const OneFault: React.FC<FaultProps> = (props) => {
  const {
    id,
    attributes: {
      faultId,
      shortDescription,
      mileage,
      yearOfExploitation,
      detailedDescription,
    },
  } = props.fault;

  return <div>
    fault {faultId} <br />
    Fault type: {shortDescription}<br />
    It happened when my car passed {mileage} km<br />
    On the {yearOfExploitation} year of exploitation<br />
    The core of the fault was the next: {detailedDescription}<br />
  </div>
}
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