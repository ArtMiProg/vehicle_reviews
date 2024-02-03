import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartPage from './pages/StartPage';
import { Content } from './Content';
import UserAccount from './pages/UserAccount';
import CreateReview from './review/CreateReview';
import SampleScenario from './SampleScenario';
import React, {useState} from 'react';
import { AuthProvider, User, UserRole } from './AuthContext';
import AdminPanel from "./admin/AdminPanel"; 
import CarReviews from './car/CarReviews';

function App() {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Content>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/addReview/:carId" element={<CreateReview />} />
              <Route path="/carReviews/:carId" element={<CarReviews/>} />
              <Route path="/account" element={<UserAccount />} />
              <Route path="/sample" element={<SampleScenario />} />
              <Route path="/admin" element={<AdminPanel />}
            />
            </Routes>
          </Content>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
function setUsers(arg0: (prevUsers: any) => any) {
  throw new Error('Function not implemented.');
}

