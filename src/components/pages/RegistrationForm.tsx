import React, { useState } from 'react';
import { UserRole } from '../AuthContext';
import { createUser } from '../user/UserComponent';
import { v4 as uuidv4 } from 'uuid';

interface RegistrationFormProps {
    onClose: Function;
}

function RegistrationForm({ onClose }: RegistrationFormProps) {

    const [id, setId] = useState(uuidv4);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(UserRole.USER);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newUser = createUser(id, username, password, name, surname, role);
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        if (existingUsers.some((user: any) => user.username === username)) {
            setErrorMessage("Username already exists");
            return;
        }

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Surname:
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </label>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;