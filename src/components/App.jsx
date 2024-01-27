import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartPage from './pages/StartPage';
import CreateReview from './pages/CreateReview';
import { Content } from './Content';
import UserAccount from './pages/UserAccount';

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
