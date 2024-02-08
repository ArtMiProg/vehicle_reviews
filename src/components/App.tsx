import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartPage from './pages/StartPage';
import { Content } from './Content';
import UserAccount from './pages/UserAccount';
import CreateReview from './review/CreateReview';
import React, { useState } from 'react';
import { AuthProvider, User, UserRole } from './AuthContext';
import AdminPanel from "./admin/AdminPanel";
import CarReviews from './car/CarReviews';
import { Provider } from 'react-redux';
import { store } from '../store';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SingInForm';

function App() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Content>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/addReview/:carId" element={<CreateReview />} />
                <Route path="/carReviews/:carId" element={<CarReviews />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="/admin" element={<AdminPanel />} />
                 <Route path="/signup" element={<RegistrationForm />} />
                 <Route path="/signin" element={<SignInForm />} />
                
              </Routes>
            </Content>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
function setUsers(arg0: (prevUsers: any) => any) {
  throw new Error('Function not implemented.');
}

