import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartPage from './pages/StartPage';
import { Content } from './Content';
import UserAccount from './pages/UserAccount';
import CreateReview from './pages/CreateReview';
import React from 'react';

function App() {

  return (
    <>
        <BrowserRouter>
          <Content>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/newReview" element={<CreateReview />} />
              <Route path="/account" element={<UserAccount />} />
            </Routes>
          </Content>
        </BrowserRouter>
    </>
  );
}

export default App;
