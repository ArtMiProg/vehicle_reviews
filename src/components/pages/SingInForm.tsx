import React, { useState } from "react";
import { User } from "../AuthContext"

interface SignInFormProps {
    onClose: (loggedInUser: User | null) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const user = users.find((user: User) => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));

            onClose(user);
        } else {
            setErrorMessage("No such username or password");
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn} >
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default SignInForm;