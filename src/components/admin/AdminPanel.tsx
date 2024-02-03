import React, { useState } from "react";
import { User } from "../AuthContext";
import { Link } from "react-router-dom";



function AdminPanel() {
  const [users, setUsers] = useState<User[]>(JSON.parse(localStorage.getItem("users") || "[]"));
  const onDeleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    const updatedUsers = JSON.parse(localStorage.getItem("users") || "[]").filter(
      (user : User) => user.id !== userId
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}. {user.username} - {user.role}
            {<button onClick={() => onDeleteUser(user.id)}>Delete User</button>
            }
          </li>
        ))}
      </ul>
      <Link to="/account">Return to Account</Link><br></br>
      <Link to="/">Return to Start Page</Link>
    </div>
  );
}

export default AdminPanel;