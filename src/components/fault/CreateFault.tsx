import { useState } from "react";
import { Fault } from "./FaultComponent";
import { v4 as uuidv4 } from 'uuid';
import { addFault } from "../../strapi/strapi";

function CreateFault(){
    
    const [idsOfFaults, setIdsOfFaults] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [newFault, setNewFault] = useState<Fault>({
        id: "",
        shortDescription: "",
        yearOfExploitation: 0,
        mileage: 0,
        detailedDescription: "",
    });    

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };   

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewFault((prevFault) => ({
            ...prevFault,
            [name]: value,
        }));
    };

    async function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        // const updatedFaults = [...faults, newFault];
        // setFaults(updatedFaults);

        // console.log("Updated Faults:", updatedFaults);
        // localStorage.setItem('faults', JSON.stringify(updatedFaults));
        const idOfFault = uuidv4();
        try {
            toggleForm();
            await addFault({
                faultId: idOfFault,
                shortDescription: newFault.shortDescription,
                mileage: newFault.mileage,
                yearOfExploitation: newFault.yearOfExploitation,
                detailedDescription: newFault.detailedDescription
            });
            const updatedFaultIds = [...idsOfFaults, idOfFault];
            setIdsOfFaults(updatedFaultIds);
        } catch (error) {
            console.error('Error creating fault:', error);
        }
    };
    
    return(
        <>
        {!isFormOpen ? <button onClick={toggleForm}>Add a Fault</button> : undefined}
            {isFormOpen && (
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Fault:
                        <input
                            type="text"
                            name="shortDescription"
                            value={newFault.shortDescription}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Year of Exploitation:
                        <input
                            type="number"
                            name="yearOfExploitation"
                            value={newFault.yearOfExploitation}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Mileage:
                        <input
                            type="number"
                            name="mileage"
                            value={newFault.mileage}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea
                            name="detailedDescription"
                            value={newFault.detailedDescription}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Add a Fault</button>
                </form>
            )}

        </>
    )
}
export default CreateFault;