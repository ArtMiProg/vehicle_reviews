import React, { useState } from "react";
import { User } from "../AuthContext"

interface SignInFormProps {
    onClose: (loggedInUser: User | null) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const identifier = username;
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await response.json();
            const user = data.user;
            const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;
            const responseRole = await fetch(`http://localhost:1337/api/users/${user.id}?populate=role`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                redirect: "follow"
            })
            
            const dataRole = await responseRole.json();
            
            const role = dataRole.role.name;
            user.role = role;
            
            console.log(user.role);
            if (!response.ok) {
                throw new Error('Authentication failed');
            }
            if (user) {
                console.log(user)
                localStorage.setItem("currentUser", JSON.stringify(user));
                onClose(user);
            }
        } catch (error) {
            setErrorMessage('Authentication failed. Please check your credentials.');
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